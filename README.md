# Todo React Native Application

A cross-platform todo application built with React Native and TypeScript demonstrating modern mobile development practices.

## 🚀 Features

- **Authentication**

  - Session-based authentication
  - Secure token management
  - Persistent login state

- **Todo Management**

  - Create, edit, and delete todos
  - Mark todos as complete/incomplete

- **Cross Platform**
  - iOS
  - Android
  - Web

## 🛠 Tech Stack

- **Frontend**
  - React Native with TypeScript
  - Zustand for state management
  - React Navigation
  - AsyncStorage for persistence
  - Jest & React Testing Library

## 🏗 Project Structure

```
src/
├── components/     # Reusable components
├── screens/        # Screen components
├── store/          # State management
├── services/       # API and external services
├── theme/          # Styling and themes
└── utils/          # Utilities and helpers
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14+)
- Yarn
- iOS: XCode 12+
- Android: Android Studio & SDK

### Installation

1. Clone the repository

```bash
git clone https://github.com/AnassHmida/todo-app.git
cd TodoApp
```

2. Install dependencies

```bash
yarn install
```

3. iOS Setup

```bash
cd ios && pod install && cd ..
```

### Running the App

```bash
# iOS
yarn ios

# Android
yarn android

# Web
yarn web

# Development
yarn start
```

### Testing

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

## 📱 Features Implemented

- User authentication (login/logout)
- Todo CRUD operations
- Cross-platform compatibility
- Comprehensive test coverage
- Type safety with TypeScript
- Clean and maintainable architecture

## 🧪 Testing Strategy

- Unit tests for business logic
- Component tests with React Testing Library
- Integration tests for critical paths
- 100% coverage for core features

## 🔐 Environment Setup

The application uses `.env.development` for local development configuration.

### Local Development Setup

1. Copy `.env.example` to `.env.development`:

```bash
cp .env.example .env.development
```

2. Configure your `.env.development`:

```properties
# API Configuration
API_URL=http://localhost:3000/api/v1  # Your local API endpoint
API_TIMEOUT=10000                     # API timeout in milliseconds

# App Environment
APP_ENV=development
```

3. Start the app:

```bash
# Start Metro bundler
yarn start

# In another terminal, run iOS or Android
yarn ios
# or
yarn android
```

> **Note**:
>
> - `.env.development` is used for local development
> - This file is already in `.gitignore`
> - Make sure your backend server is running on the configured port (default: 3000)

### For Android Emulator

1. Make sure you have an Android emulator running or create one via Android Studio

   - Open Android Studio
   - Go to "Tools" > "Device Manager"
   - Create a new device if none exists

2. Update `.env.development`:

```bash
# For Android Emulator
API_URL=http://10.0.2.2:3000/api/v1  # Maps to localhost on your machine
```

### Running on Physical Android Device

1. Enable USB debugging on your device:

   - Go to Settings > About Phone
   - Tap "Build Number" 7 times to enable developer options
   - Go back to Settings > System > Developer Options
   - Enable "USB Debugging"

2. Update `.env.development`:

```bash
# For Physical Device
API_URL=http://<your-machine-ip>:3000/api/v1  # Example: http://192.168.1.100:3000/api/v1
```

> **Note**:
>
> - Use `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to find your machine's IP address
> - Make sure your phone and computer are on the same network
> - Android debug manifest already includes `android:usesCleartextTraffic="true"` for local development
