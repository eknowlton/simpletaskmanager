# Project Context

## Project Overview

**simpletaskmanager** is a Laravel-based server-side SPA for managing tasks, built with Inertia.js, React, Vite, TailwindCSS, and ShadCN UI components. The application is designed primarily for desktop use and features an integrated AI agent powered by OpenAI/Gemini that helps users create and plan projects with tasks, due dates, and tags.

**Live Demo**: https://jobshop.works  
**GitHub**: https://github.com/eknowlton/simpletaskmanager

## Architecture

### Monolithic Structure

The application follows a monolithic architecture with three distinct modules:

- **`app/`** - Main application logic (UI controllers, agents, policies)
- **`api/`** - API endpoints and controllers
- **`shared/`** - Shared resources between app and api (models, data objects, enums)

This structure allows code sharing between the application and API while maintaining clear boundaries.

### Technology Stack

#### Backend
- **PHP 8.2+** with Laravel 12
- **Laravel Inertia** for server-side SPA routing
- **Spatie Laravel Data** for data transfer objects
- **Spatie TypeScript Transformer** for PHP-to-TypeScript type generation
- **Laravel Sanctum** for API authentication
- **Laravel Auditing** for audit trails
- **Predis** for Redis integration
- **LaraAgent** (maestroerror/laragent) for AI agent functionality

#### Frontend
- **React 19** with TypeScript
- **Inertia.js 2.0** for seamless client-server integration
- **Vite 6** for build tooling
- **TailwindCSS 4** for styling
- **ShadCN UI** (Radix UI components)
- **React Hook Form** with Zod validation
- **date-fns** for date manipulation
- **dnd-kit** for drag-and-drop functionality
- **Lucide React** for icons

#### Infrastructure
- **Docker** with multi-service architecture
- **PostgreSQL** for database
- **Redis** for caching and queues
- **Nginx** as web server
- **AWS Lightsail** for container hosting
- **AWS ECR** for Docker image registry
- **GitHub Actions** for CI/CD

## Directory Structure

```
/
├── .github/workflows/          # CI/CD pipelines
│   ├── tests.yml              # Runs tests on PRs
│   └── deploy.yml             # Deploys to AWS Lightsail
├── docker/                     # Docker configuration files
│   ├── app.Dockerfile         # PHP-FPM application container
│   ├── nginx.Dockerfile       # Nginx web server
│   ├── nginx-site.conf        # Nginx site configuration
│   └── php.conf               # PHP-FPM configuration
├── src/                       # Main application code
│   ├── app/                   # Application module
│   │   ├── Agents/            # AI agents (ProjectAgent)
│   │   ├── Http/              # Controllers, middleware
│   │   └── Policies/          # Authorization policies
│   ├── api/                   # API module
│   │   ├── Http/              # API controllers
│   │   └── Providers/         # API service providers
│   ├── shared/                # Shared module
│   │   ├── Data/              # Data transfer objects
│   │   ├── Models/            # Eloquent models
│   │   ├── ProjectStatus.php  # Project status enum
│   │   └── TaskStatus.php     # Task status enum
│   ├── bootstrap/             # Laravel bootstrap files
│   ├── config/                # Configuration files
│   ├── database/              # Migrations, seeders, factories
│   ├── resources/             # Frontend resources
│   │   ├── css/               # Stylesheets
│   │   ├── js/                # React application
│   │   │   ├── components/    # React components
│   │   │   ├── app.tsx        # Client-side entry
│   │   │   └── ssr.tsx        # Server-side rendering entry
│   │   └── images/            # Static images
│   ├── routes/                # Route definitions
│   ├── tests/                 # Test suites
│   ├── artisan                # Laravel CLI
│   ├── composer.json          # PHP dependencies
│   └── package.json           # Node.js dependencies
├── docker-compose.yaml        # Multi-container orchestration
├── docker-bake.hcl            # Docker Buildx configuration
└── README.md                  # Project documentation
```

## Docker Services

### Production Services
- **nginx** - Web server (port 80 → 8000)
- **app** - PHP-FPM application server (port 9000)
- **ssr** - Inertia SSR server (port 3000)
- **database** - PostgreSQL database (port 5432)
- **redis** - Redis cache/queue (port 6379)

### Development Services
- **node** - Vite dev server replacing SSR in development (port 3000)

### Testing Services
- **selenium** - Selenium standalone Chrome for Dusk tests (port 4444)

## AI Agent Integration

The application uses **LaraAgent** to power an AI assistant that helps users create projects:

### ProjectAgent
- **Location**: `src/app/Agents/ProjectAgent.php`
- **Model**: GPT-4.1 (OpenAI) with Gemini fallback
- **Purpose**: Generates project structures with tasks based on natural language descriptions
- **Features**:
  - Structured output with JSON schema validation
  - Generates project title, description, color, and tasks
  - Creates tasks with titles, descriptions, due dates, priorities, tags, and status
  - Enforces maximum of 10 tasks per response
  - Context-aware date generation based on current date

### Configuration
- AI providers configured in `src/config/laragent.php`
- Supports multiple providers (OpenAI, Gemini)
- API keys via environment variables (`OPENAI_API_KEY`, `GEMINI_API_KEY`)

## Development Workflow

### Local Development

```bash
# Start all services
docker compose --profile local up

# Run in background
docker compose --profile local up -d
```

The application will be available at http://localhost:8000

### NPM Scripts

```bash
npm run dev          # Vite dev server with HMR
npm run build        # Production build (client + SSR)
npm run build:dev    # Development build (client only)
npm run lint         # ESLint with auto-fix
npm run types        # TypeScript type checking
npm run format       # Prettier formatting
npm run format:check # Check formatting without changes
```

### Composer Scripts

```bash
composer dev         # Start Laravel with queue, logs, and Vite
composer dev:ssr     # Start Laravel with SSR
composer test        # Run Pest/PHPUnit tests
```

## Deployment

### CI/CD Pipeline

1. **Tests** (`.github/workflows/tests.yml`)
   - Triggered on PRs to `main` or `develop`
   - Runs PHP 8.3 with required extensions
   - Installs Composer dependencies
   - Builds Node.js assets
   - Runs Laravel test suite

2. **Deploy** (`.github/workflows/deploy.yml`)
   - Triggered after successful test workflow on `main`
   - Configures AWS credentials
   - Logs into AWS ECR
   - Retrieves production `.env` from S3
   - Builds and pushes Docker images
   - Triggers AWS Lightsail redeployment

### Docker Image Building

```bash
# Build and push with git commit tag
TAG=$(git rev-parse --short HEAD) docker buildx bake --push

# Production environment build
ENV=prod docker buildx bake --push
```

Images are tagged with git commit SHA and pushed to AWS ECR.

## Database

- **Primary**: PostgreSQL
- **ORM**: Laravel Eloquent
- **Migrations**: Located in `src/database/migrations/`
- **Auditing**: Enabled via `owen-it/laravel-auditing` package

## Authentication & Authorization

- **Laravel Sanctum** for API token authentication
- **Policies** in `src/app/Policies/` for authorization logic
- User management with audit trail support

## Key Features

1. **Task Management** - Create, update, delete, and organize tasks
2. **Project Management** - Group tasks into projects with status tracking
3. **AI-Powered Planning** - Natural language project creation via chat interface
4. **Drag-and-Drop** - Reorder tasks and projects
5. **Tags & Priorities** - Organize tasks with custom tags and priority levels
6. **Calendar Views** - Visualize tasks and due dates
7. **Kanban Board** - Visual task management
8. **Server-Side Rendering** - Fast initial page loads with Inertia SSR

## Environment Configuration

Key environment variables:

```env
APP_NAME=Laravel
APP_ENV=local
APP_URL=http://localhost

DB_CONNECTION=sqlite  # or pgsql for PostgreSQL
REDIS_HOST=127.0.0.1

OPENAI_API_KEY=       # For AI agent
GEMINI_API_KEY=       # Fallback AI provider

QUEUE_CONNECTION=database
CACHE_STORE=database
SESSION_DRIVER=database
```

## Testing

- **Framework**: Pest PHP (Laravel's testing framework)
- **Browser Tests**: Laravel Dusk with Selenium
- **Test Structure**:
  - `tests/app/` - Application tests
  - `tests/api/` - API tests
  - `tests/shared/` - Shared component tests

Run tests:
```bash
php artisan test
# or
composer test
```

## Code Quality Tools

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Laravel Pint** - PHP code style fixer
- **TypeScript** - Static type checking

## Additional Notes

- Mobile web support planned via React Native DOM companion app
- Application designed for desktop-first experience
- Hosted on AWS Lightsail free tier for demo purposes
- Monolithic architecture embraced for simplicity and rapid development
