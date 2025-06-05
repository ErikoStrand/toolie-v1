![Namnlöst-1](https://github.com/user-attachments/assets/8b030d1b-2964-4b38-93ed-8a5ace0a30ea) 

Credits: <br/>
Erik - Programmer, responsible for helping, created namnSlumpare, and helped with the logic behind klassskapare. <br/>
Leonard - Programmer, responsible for startblock where he made everything about it. <br/>
Alexander - Programmer, worked on the clock, gruppskapare. <br/>
Oliwier - Programmer, worked a little on the timer. <br/>
Matti - Programmer, made gruppslumpare. <br/>
Magd - Programmer, Made the start of namnSlumpare. <br/>

check the commits if you want to know in more detail on what everyone did. <br/>


överview av project med hjälp av aistudio och grok (vi är lata för vi glömde)
Detta projekt, "Desktop Toolie," är en skrivbordsapplikation byggd med Electron. Den fungerar som en samling praktiska verktyg primärt utformade för att hjälpa lärare i deras dagliga uppgifter, såsom att hantera klasser och grupper.

Viktiga funktioner inkluderar:

Klass- och elevhantering (KlassSkapare): Gör det möjligt för användare att skapa, redigera, importera och ta bort listor med elevnamn, organiserade per klass. Denna data sparas lokalt.
Namnslumpare (NamnSlumpare): Väljer ett slumpmässigt elevnamn från en vald klasslista. Inkluderar alternativ för att hantera vilka namn som är tillgängliga för val (t.ex. utesluta tidigare valda namn eller välja från en markerad delmängd).
Gruppsorterare (groupie): Möjliggör sortering av elever från en vald klass i slumpmässiga grupper. Erbjuder funktioner som att generera slumpmässiga gruppnamn och utse slumpmässiga gruppledare. Grupper kan också sparas och laddas.
Timer (timer): En anpassningsbar nedräkningstimer för olika klassrumsaktiviteter.
Klocka (Klocka): En enkel digital klockvisning.
Anteckningar (startblock): En grundläggande anteckningsapplikation för att snabbt skriva ner tankar eller påminnelser, med justerbara teckenstorlekar och expanderbara anteckningar.
Snabblänkar: Ger direkta länkar till vanliga utbildningsplattformar som Google Classroom och Schoolsoft från applikationens huvudsakliga gränssnitt.
Krediter (Credits): Visar information om projektets bidragsgivare och commit-historik, hämtad från GitHub.
Teknisk översikt för den nya gruppen:

Electron-applikation: Detta innebär att det är en webbapplikation (HTML, CSS, JavaScript) paketerad som en skrivbordsapplikation, vilket gör att den körs native på Windows, macOS och Linux.
Lokal datalagring: Klass- och elevdata lagras lokalt i JSON-filer (specifikt resources/data/classes.json), vilket gör applikationen självständig och inte kräver internetanslutning för kärnfunktionerna.
Användargränssnitt: Varje verktyg öppnas i sitt eget fönster, som kan flyttas runt på skärmen genom att dra i den övre listen. Det finns konsekventa stängningsknappar för varje verktyg.
Paketering: Filen forge.config.js hanterar skapandet av installationsprogram för olika operativsystem (t.ex. .exe för Windows).
Kärnfiler:

index.html: Huvudfönstret för applikationen, fungerar som startpunkt för andra verktyg.
main.js: Electron-huvudprocesskriptet, hanterar fönsterskapande, inter-processkommunikation (IPC) med verktygen och grundläggande systeminteraktioner (som att spela upp ett ljud för timern).
preload.js: Ett skript som körs före andra skript i renderingsprocessen, används för säker kommunikation mellan renderings- och huvudprocesserna.
utils.js: En delad JavaScript-fil som innehåller hjälpfunktioner som används i flera verktyg, såsom läsning/skrivning av klassdata och hantering av fönsterstorlek/stängning.
I grunden är Desktop Toolie en praktisk, offline-fokuserad svit av verktyg utformad för att effektivisera vanliga klassrumshanteringsuppgifter för lärare.
