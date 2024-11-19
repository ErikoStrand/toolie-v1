# Use a Windows-based image with a specific version of Windows Server Core
FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Set the working directory inside the container
WORKDIR /app

# Install dependencies (Rust, Node.js, etc.)

# Install Chocolatey (Windows package manager)
RUN powershell -Command \
    Set-ExecutionPolicy RemoteSigned -Scope Process -Force; \
    iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Node.js via Chocolatey
RUN choco install nodejs-lts -y

# Install Rust (required for Tauri)
RUN choco install rust -y

# Install Cargo (Rust's package manager)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Tauri CLI
RUN npm install -g @tauri-apps/cli

# Clone the GitHub repository (adjust with your actual repository URL)
# Use a Git repository containing your Tauri project (or mount it from your host machine)
RUN git clone https://github.com/ErikoStrand/toolie-v1.git .

# Install project dependencies (Node.js packages)
RUN npm install

# Expose the port (if applicable, e.g., for a dev server or the app)
EXPOSE 3000

# Set up the command to build the Tauri app (you can also specify "dev" here if you want a development server)
CMD ["npm", "run", "tauri", "build"]
