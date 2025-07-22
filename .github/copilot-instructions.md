# Flame Grilled Cafe POS System

## Project Overview
This is a Point of Sale (POS) system for Flame Grilled Cafe, built with React + Vite and Supabase as the database backend.

## Technology Stack
- **Frontend**: React 18 + Vite
- **Database**: Supabase (https://ihsrwgidghryxhtgkqml.supabase.co)
- **Deployment**: Vercel
- **Package Manager**: npm

## Project Structure
```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── services/          # API and database services
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── assets/            # Static assets
```

## Development Guidelines

### Code Style
- Use functional components with React hooks
- Follow ESLint and Prettier configurations
- Use descriptive variable and function names
- Keep components small and focused

### Database Integration
- Use Supabase client for all database operations
- Implement proper error handling for database queries
- Use TypeScript types for database schemas when possible

### Component Guidelines
- Create reusable components in the `components/` directory
- Use proper prop validation
- Implement loading and error states
- Follow responsive design principles

### POS Features to Implement
- Product catalog management
- Order creation and management
- Payment processing integration
- Receipt generation
- Inventory tracking
- Customer management
- Sales reporting
- User authentication and roles

### Environment Variables
Required environment variables:
```
VITE_SUPABASE_URL=https://ihsrwgidghryxhtgkqml.supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

## Deployment
- Ensure all builds pass locally before deployment
- Use `npm run build` to create production builds
- Deploy to Vercel with proper environment variables configured

## Best Practices
- Write clean, maintainable code
- Implement proper error boundaries
- Use semantic HTML elements
- Ensure accessibility compliance
- Optimize for performance
- Write meaningful commit messages
