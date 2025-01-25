# Stock Management Microservice Project

## 🚀 Technologies

- [NestJS](https://nestjs.com/) - Node.js Framework
- [RabbitMQ](https://www.rabbitmq.com/) - Message Broker
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Drizzle ORM](https://orm.drizzle.team/) - Database Toolkit
- [Redis](https://redis.io/) - Caching Solution
- [Prometheus](https://prometheus.io/) - Monitoring
- [Grafana](https://grafana.com/) - Visualization and Monitoring
- [Docker](https://www.docker.com/) - Containerization

## 🏗️ Project Structure

```
project-root/
│
├── docker-compose.yml
├── order/           # Order service (Publisher)
├── stock/           # Stock service (Consumer)
└── prometheus/      # Monitoring configuration
```

## 🛠️ Services Overview

### Order Service
- NestJS API running on port 3333
- Publishes messages to RabbitMQ
- Includes Swagger documentation

### Stock Service
- NestJS API running on port 3334
- Consumes messages from RabbitMQ
- Uses PostgreSQL with Drizzle ORM
- Implements Redis caching
- Includes Swagger documentation

## 📋 Prerequisites

- Docker
- Docker Compose
- Node.js

## ⚙️ Project Setup

1. Clone the repository
```bash
git clone [your-repository-url]
cd [project-directory]
```

2. Start the services
```bash
# Start all services in detached mode
docker compose up -d

# Stop all services
docker compose down
```

## 🗄️ Database Management

### Migrations
```bash
# Run migrations
npm run drizzle:migrate
```

### Seeding
```bash
# Seed the database with initial data
npm run seed
```

## 📚 API Documentation

- Order Service Swagger: `http://localhost:3333/api`
- Stock Service Swagger: `http://localhost:3334/api`

## 🔍 Monitoring

Access Grafana and Prometheus dashboards to monitor RabbitMQ and system metrics.

## 🚀 Development

### Stock Service Scripts
```json
{
  "build": "Compile the project",
  "start": "Start the application",
  "start:dev": "Start in development mode with watch",
  "start:debug": "Start in debug mode",
  "start:prod": "Run production build",
  "seed": "Run database seeding",
  "drizzle:migrate": "Run database migrations"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


Made with ♥ by [Diogo Soares]
