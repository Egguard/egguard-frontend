# Project Structure

📦 src/
├── 📂 assets/          # Static assets
│   ├── fonts/         # Font files
│   ├── images/        # Image assets
│   ├── icons/         # SVG or PNG icons
│   └── styles/        # Global styles
│
├── 📂 components/      # Reusable UI components (Atomic Design structure)
│   ├── 📂 atoms/      # Smallest UI elements (Button, Input, Icon, etc.)
│   │
│   ├── 📂 molecules/   # Groups of atoms
│   │   └── Card.tsx
│   │
│   ├── 📂 organisms/   # Large, reusable components (Navbar, Sidebar, Footer, etc.)
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   └── 📂 templates/     # Page design or templates / Layouts
│
├── 📂 context/         # Global state using React Context API
│   └── AuthContext.tsx
│
├── 📂 lib/             # Shared utilities, hooks, constants, and global state
│   ├── 📂 constants/   # Global constants (URLs, config values, etc.)
│   │   └── apiRoutes.ts # API endpoint URLs
│   │
│   ├── 📂 helpers/     # Utility functions (formatters, parsers, etc.)
│   │   └── dateHelper.ts # Date formatting functions
│   │
│   ├── 📂 hooks/       # Reusable custom hooks
│   │   ├── useAuth.ts  # Authentication state hook
│   │   └── useTheme.ts # Theme state hook
│   │
│   ├── 📂 store/       # Global state management (Redux, Zustand, etc.)
│   │   ├── authSlice.ts # Authentication Redux slice
│   │   └── store.ts    # Redux/Zustand store
│   │
│   └── 📂 types/       # TypeScript types/interfaces
│       ├── authTypes.ts # User authentication types
│       ├── productTypes.ts # Product-related types
│       └── index.d.ts  # Global types
│
├── 📂 pages/           # Page-level components (mapped to routes)
│   ├── LoginPage.tsx   # Login page
│   ├── ProfilePage.tsx # User profile page
│   └── NotFoundPage.tsx # 404 page
│
├── 📂 routes/          # Application routing configuration
│   └── routes.tsx      # Define all routes and layout usage
│
├── 📂 services/        # API calls and data fetching (React Query, Axios, etc.)
│   ├── 📂 auth/        # Authentication-related API calls
│   │   └── authService.ts # Login, logout, register functions
│   │
│   └── 📂 products/    # Product-related API calls
│       ├── productService.ts # Fetching product data
│       ├── queries.ts  # Queries with React Query
│       └── mutations.ts # Mutations (POST, PUT, DELETE)
│
├── 📂 styles/          # Global styles (if Tailwind is customized)
│
├── index.tsx           # React entry point
└── main.tsx            # Main app bootstrap file
