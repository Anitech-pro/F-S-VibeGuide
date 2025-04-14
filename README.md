# Full-Stack Vibe Guide

An interactive tool that guides developers through the process of setting up and building full-stack web applications with best practices and contextual guidance.

## 🚀 Overview

Full-Stack Vibe Guide is an interactive wizard that helps developers, especially beginners, navigate the complex landscape of modern web development. It provides a structured approach to selecting technologies, setting up projects, and implementing features with contextual guidance at each step.

The application guides users through:
- Project type selection
- Frontend framework and styling options
- Backend technology selection
- Database and infrastructure choices
- Environment setup with automated commands
- Development task planning and execution

## ✨ Features

### Interactive Project Setup Wizard
- **Project Type Selection**: Choose between web applications, mobile apps, backend APIs, or full-stack projects
- **Technology Stack Selection**: Interactive UI for selecting compatible technologies
- **Smart Recommendations**: Get contextual recommendations based on your project requirements
- **Visual Progress Tracking**: Clear visualization of your setup progress

### Technology Selection
- **Frontend Frameworks**: React, Vue, Angular, and more
- **Styling Options**: Tailwind CSS, styled-components, and traditional CSS
- **Backend Technologies**: Node.js/Express, Django, Ruby on Rails, and others
- **Database Options**: MongoDB, PostgreSQL, MySQL, and more
- **Authentication Providers**: Auth0, Firebase, custom JWT solutions
- **Hosting & Deployment**: Various cloud and self-hosted options

### Environment Setup
- **Command Generation**: Automatically generate the necessary commands to set up your project
- **Step-by-Step Guidance**: Clear instructions for each setup step
- **Verification Steps**: Validation steps to ensure your setup is working correctly

### Development Workflow
- **Action Plan Generation**: Get a structured plan for implementing your project
- **Task Breakdown**: Detailed breakdown of development tasks
- **Best Practices**: Guidance on following industry best practices

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Routing**: Wouter
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tools**: Vite, esbuild
- **Deployment**: Supports various deployment options

## 📋 Prerequisites

- Node.js 14.0.0 or higher
- PostgreSQL database (or compatible alternative)
- npm or pnpm package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Anitech-pro/F-S-VibeGuide.git
cd F-S-VibeGuide
```

2. Install dependencies:
```bash
npm install
# or with pnpm
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env file with the following variables
DATABASE_URL=postgresql://username:password@localhost:5432/vibetracker
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000.

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## 🧪 Testing

For interactive testing, you can use the built-in test pages:
- http://localhost:5000/test - Tests the WizardContext
- http://localhost:5000/app-test - Tests core application functionality

## 📚 Project Structure

```
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── lib/            # Utility functions and data
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main application component
├── server/                 # Backend code
│   ├── routes.ts           # API routes
│   ├── index.ts            # Server entry point
│   ├── db.ts               # Database connection
│   └── vite.ts             # Vite server integration
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts           # Database and validation schemas
├── scripts/                # Build and development scripts
├── migrations/             # Database migrations
└── dist/                   # Build output
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Express](https://expressjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vite](https://vitejs.dev/)
- [Wouter](https://github.com/molefrog/wouter)


