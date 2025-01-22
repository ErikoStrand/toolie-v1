import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime

def scrape_github_activity(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    activity_data = []
    visited_urls = set()
    
    while url and url not in visited_urls:
        visited_urls.add(url)
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        scripts = soup.find_all('script', {'type': 'application/json'})
        for script in scripts:
            if 'activityList' in script.text:
                data = json.loads(script.text)
                items = data['payload']['activityList']['items']
                
                for item in items:
                    if 'commit' in item:
                        # Convert ISO timestamp to Unix timestamp
                        unix_time = int(datetime.strptime(
                            item['pushedAt'], 
                            '%Y-%m-%dT%H:%M:%S.%fZ'
                        ).timestamp())
                        
                        commit_data = {
                            'author': item['pusher']['login'],
                            'message': item['commit']['message'],
                            'time': unix_time
                        }
                        activity_data.append(commit_data)
                
                # Get next page cursor
                if data['payload']['activityList'].get('hasNextPage'):
                    next_cursor = data['payload']['activityList']['endCursor']
                    url = f"{url.split('?')[0]}?after={next_cursor}"
                else:
                    break
        
        time.sleep(1)
    
    # Save to JSON file
    with open('resources/data/commit_history.json', 'w', encoding='utf-8') as f:
        json.dump(activity_data, f, indent=2, ensure_ascii=False)
    
    return activity_data

if __name__ == "__main__":
    initial_url = "https://github.com/ErikoStrand/toolie-v1/activity"
    activity_data = scrape_github_activity(initial_url)
    print(json.dumps(activity_data, indent=2, ensure_ascii=False))
