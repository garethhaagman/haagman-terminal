# HAAG-MAN Terminal

![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)

## 📋 Description

An interactive terminal-style interface designed as a digital resume. This project showcases professional experience and skills through a retro-futuristic terminal UI, complete with CRT screen effects, boot-up sequences, and authentic sound effects.

## ✨ Features

- 🎮 Authentic CRT screen effects and retro terminal aesthetics
- 🔊 Interactive sound effects for a fully immersive experience
- 📊 Multiple sections including Bio, Timeline, Projects, Media, and Contact information
- 📱 Responsive design for desktop and mobile devices
- 🔄 Animated transitions between sections
- 🖥️ Boot sequence simulation

## 🚀 Live Demo

https://www,garethhaagman.com

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Animation**: CSS animations and Tailwind CSS Animate
- **Routing**: React Router
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Audio**: Howler.js

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd haagman-terminal

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

The development server will start at `http://localhost:8080

## 📦 Build

```bash
# Build for production
npm run build
# or
bun run build

# Preview the production build
npm run preview
# or
bun run preview
```
## 👤 Author

Created by [Gareth Haagman](https://github.com/garethhaagman)

# Haagman Terminal Resume

## Twitter API Integration

This project integrates with the Twitter API to display recent tweets in the Media Section.

### Setup

1. **Twitter Developer Account**
   - Create a Twitter Developer account at [developer.twitter.com](https://developer.twitter.com)
   - Create a project and app to obtain API credentials

2. **Environment Variables**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Twitter API credentials in the `.env` file:
     ```
     VITE_TWITTER_API_KEY=your_twitter_api_key
     VITE_TWITTER_API_SECRET=your_twitter_api_secret
     VITE_TWITTER_BEARER_TOKEN=your_twitter_bearer_token
     VITE_TWITTER_USERNAME=garethhaagman
     ```

3. **Restart Development Server**
   - After setting up environment variables, restart the development server:
     ```bash
     npm run dev
     ```

## Troubleshooting

If you encounter issues with the Twitter integration:

1. **Check API Credentials**
   - Ensure your Twitter API credentials are correct
   - Verify that your Twitter Developer account has the appropriate access level

2. **Network Issues**
   - The application will display "transmission link could not be established..." if it cannot connect to the Twitter API
   - Check your internet connection and API rate limits

3. **Console Errors**
   - Check the browser console for detailed error messages

## Development

For local development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

