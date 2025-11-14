# Final-Step Frontend

Frontend implementation for the Final-Step team management system, built with React and Vite.

## Current Status
- ✅ Initial commit completed
- ✅ First sprint implementation
- 🔄 Button components organized in `components/UI/Button` for easy maintenance when build there pages
- 🔄 Auth store and actions fixed

## Development Notes
- All button components are centralized in `components/UI/Button` directory for consistent styling and easy management
- Project uses Vite for fast development and building

## Project Structure

```
/├── public/                   # Static assets served directly
└── src/                     # Source code directory
    ├── App.css              # Main application styles
    ├── App.jsx              # Root React component
    ├── index.css            # Global CSS styles
    ├── main.jsx             # Application entry point
    ├── assets/              # Internal assets and resources
    │   ├── Images/          # Image assets
    │   │   └── logo/        # Logo variations
    │   └── styles/          # Organized CSS architecture
    │       ├── base/        # Base styles and variables
    │       │   ├── Global.css    # Global CSS resets and base styles
    │       │   └── Variables.css # CSS custom properties and variables
    │       ├── Components/  # Component-specific styles
    │       └── Pages/       # Page-specific styles
    ├── components/          # Reusable React components
    │   ├── index.js         # Component exports
    │   ├── ThemeToggle.jsx  # Dark/light theme switcher
    │   ├── ToastProvider.jsx # Toast notification provider
    │   ├── Models/          # Modal components
    │   └── UI/              # User Interface components
    │       └── Buttons/     # Centralized button components
    ├── layout/              # Layout components
    ├── Pages/               # Application pages/routes
    ├── routes/              # Application routing
    │   ├── route/           # Route definitions (needs organization)
    │   └── routers/         # Router components
    │       └── AppRoute.jsx # Main application router
    ├── services/            # API and external service integrations
    │   └── API/                   # API configuration
    │       ├── apiEndpoints.js    # API endpoint definitions
    │       └── ApiClient.js       # HTTP client configuration
    ├── store/               # State management (needs refactoring)
    └── utils/               # Utility functions and helpers
        └── index.js         # Utility exports
```

## Key Directories Explained

### `/src/components/UI/Buttons/`
Centralized location for all button components to ensure:
- Consistent styling across the application
- Easy maintenance and updates
- Reusable button variants for different use cases

### `/src/store/`
State management layer that requires refactoring:
- **AuthStore.js**: Needs organization for better state structure
- **AuthActions.js**: Requires cleanup and proper action definitions

### `/src/services/`
API integration layer with modular service files:
- Each service handles specific domain logic (Auth, Projects, Students, etc.)
- Centralized API client and endpoint management

### `/src/assets/styles/`
Organized CSS architecture:
- **base/**: Global styles and CSS variables
- **Components/**: Component-specific styling
- **Pages/**: Page-specific styling

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```
