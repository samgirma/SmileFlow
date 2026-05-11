# SmileFlow - Dental Practice Management System

A comprehensive dental practice management system built with React (frontend) and Laravel (backend), featuring PostgreSQL database integration.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Laravel 10 + PHP 8.2
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Containerization**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for frontend)
- PHP 8.2+ (for backend)
- PostgreSQL 15+ (or use Docker)
- Redis 7+ (optional, for caching)

### Setup Instructions

#### Option 1: Database Only (Recommended)

1. **Clone the repository**
   ```bash
   git clone git@github.com:samgirma/SmileFlow.git
   cd SmileFlow
   ```

2. **Start database services only**
   ```bash
   docker-compose -f docker-compose.db.yml up -d
   ```

3. **Setup frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Setup backend**
   ```bash
   cd server
   composer install
   cp .env.example .env
   php artisan migrate
   php artisan db:seed
   php artisan serve
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

#### Option 2: Full Docker Setup

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Run migrations and seeders**
   ```bash
   docker-compose exec server php artisan migrate
   docker-compose exec server php artisan db:seed
   ```

3. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8000
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

## 📱 Default Users

The system comes with pre-configured users for testing:

- **Admin**: admin@smileflow.com / admin123
- **Dentist**: dentist@smileflow.com / dentist123
- **Receptionist**: reception@smileflow.com / reception123
- **Patient**: patient@smileflow.com / patient123

## 🗄️ Database Structure

### Core Tables

- **users**: Authentication and role-based access control
- **services**: Dental services and treatments
- **appointments**: Patient appointments and scheduling
- **medical_records**: Patient medical history and records

### Database Credentials

- **Database**: smileflow
- **Username**: smileflow_user
- **Password**: smileflow_password

## ⚙️ Environment Configuration

### Frontend Environment Variables

See `client/.env.example` for available variables:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_ENDPOINT=/auth
VITE_TOKEN_STORAGE_KEY=sf_token

# External Services
VITE_AI_SERVICE_URL=https://ai.smileflow.com/api
VITE_AI_SERVICE_KEY=your_ai_service_key_here

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_SENTRY_DSN=your_sentry_dsn_here

# Payment
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key_here
```

### Backend Environment Variables

See `server/.env.example` for available variables:

```bash
# Application
APP_NAME=SmileFlow
APP_ENV=local
APP_DEBUG=true

# Database (PostgreSQL)
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=smileflow
DB_USERNAME=smileflow_user
DB_PASSWORD=smileflow_password

# Cache & Sessions (Redis)
CACHE_DRIVER=redis
SESSION_DRIVER=redis

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🔧 Development

### Database-Only Setup (Recommended)

```bash
# Start database services only
docker-compose -f docker-compose.db.yml up -d

# Stop database services
docker-compose -f docker-compose.db.yml down

# View database logs
docker-compose -f docker-compose.db.yml logs -f postgres

# View Redis logs
docker-compose -f docker-compose.db.yml logs -f redis

# Access PostgreSQL directly
docker-compose -f docker-compose.db.yml exec postgres psql -U smileflow_user -d smileflow
```

### Full Docker Setup

```bash
# Start all services
docker-compose up -d

# Start only database services
docker-compose up -d postgres redis

# Start backend only
docker-compose up -d server

# Start frontend only
docker-compose up -d client
```

### Database Management

```bash
# Run migrations (backend running locally)
cd server && php artisan migrate

# Run seeders (backend running locally)
cd server && php artisan db:seed

# Fresh database (backend running locally)
cd server && php artisan migrate:fresh --seed

# Run migrations (Docker backend)
docker-compose exec server php artisan migrate

# Run seeders (Docker backend)
docker-compose exec server php artisan db:seed

# Fresh database (Docker backend)
docker-compose exec server php artisan migrate:fresh --seed

# Create new migration
docker-compose exec server php artisan make:migration create_table_name

# Access PostgreSQL directly
docker-compose exec postgres psql -U smileflow_user -d smileflow
```

### Logs

```bash
# Database-only logs
docker-compose -f docker-compose.db.yml logs -f

# Full application logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postgres
docker-compose logs -f redis
docker-compose logs -f server
docker-compose logs -f client
```

## 🐳 Docker Services

### PostgreSQL
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: postgres_data

### Redis
- **Image**: redis:7-alpine
- **Port**: 6379
- **Volume**: redis_data

### Laravel Server
- **Base**: php:8.2-fpm-alpine
- **Port**: 8000
- **Web Server**: Nginx
- **Process Manager**: Supervisor

### React Client
- **Base**: node:18-alpine
- **Port**: 5173
- **Development Server**: Vite

## 🔐 Security Features

- JWT-based authentication with Laravel Sanctum
- Role-based access control (Admin, Dentist, Receptionist, Patient)
- CORS protection
- Environment variable protection via .gitignore
- Password hashing with bcrypt
- SQL injection protection with Eloquent ORM

## 📊 Features

### Authentication & Authorization
- User registration and login
- Role-based access control
- JWT token management
- Password reset functionality

### Patient Management
- Patient profiles and records
- Medical history tracking
- Appointment scheduling
- Treatment planning

### Dental Services
- Service catalog
- Treatment pricing
- Service categories
- Availability management

### API Endpoints

#### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

#### Patients
- `GET /api/patients` - List patients
- `GET /api/patients/{id}` - Get patient details
- `POST /api/patients` - Create patient

#### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/{id}` - Update appointment

#### Services
- `GET /api/services` - List services
- `POST /api/services` - Create service

## 🧪 Testing

```bash
# Run backend tests
docker-compose exec server php artisan test

# Run frontend tests
docker-compose exec client npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for dental professionals**
