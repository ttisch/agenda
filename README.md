<div align="center">
  <img src="./src/assets/Agenda.png" alt="Agenda Banner" width="100" />
  <h1>Agenda</h1>
  <p><strong>Your Smart Work Companion</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#development">Development</a> •
    <a href="#roadmap">Roadmap</a> •
    <a href="#license">License</a>
  </p>
  
  ![GitHub release (latest by date)](https://img.shields.io/github/v/release/ttisch/agenda)
  ![License](https://img.shields.io/badge/license-MIT-blue)
  ![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
</div>

## Overview

Agenda is a modern planning tool designed to simplify your workday. Built with Tauri, React, and Mantine, it combines the best of desktop performance with beautiful UI design.

<div align="center">
  <img src="screenshot.png" alt="Agenda Screenshot" width="800" />
</div>

## Features

- ✅ **Smart Scheduling** - Automatically reschedules your tasks when you need it
- 🎨 **Custom Themes** - Choose from various visual styles to match your preference
- 🌍 **Multi-language Support** - Work in your preferred language
- ⚡ **Lightweight & Fast** - Built with Tauri for optimal performance
- 💻 **Cross-platform** - Works on Windows, macOS, and Linux

## Installation

### Download Prebuilt Binaries

Download the latest version for your operating system:

- [Windows (.msi)](https://github.com/ttisch/agenda/releases/latest)
- [macOS (.dmg)](https://github.com/ttisch/agenda/releases/latest)
- [Linux (.deb, .AppImage)](https://github.com/ttisch/agenda/releases/latest)

### Package Managers

```bash
# macOS (coming soon)
brew install agenda

# Linux (coming soon)
sudo apt install agenda
```

## Development

### Prerequisites

- Node.js (LTS)
- Rust
- Yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/tisch-systems/agenda.git
cd agenda

# Install dependencies
yarn install

# Start the development server
yarn tauri dev
```

### Building

```bash
# Build for production
yarn tauri build
```

## Roadmap

- [ ] MS Exchange Integration
- [ ] AI-powered scheduling suggestions
- [ ] Plugin system

## License

MIT © [Thomas Tisch](https://tisch.systems)

---

<div align="center">
  <sub>Built with ❤️ in Austria</sub>
</div>
