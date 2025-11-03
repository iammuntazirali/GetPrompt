#!/bin/bash

set -e

echo "🚀 GetPrompt Setup Script"
echo "========================="
echo ""

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "✅ Docker detected"
    USE_DOCKER=true
else
    echo "⚠️  Docker not found. Will use SQLite for development."
    USE_DOCKER=false
fi

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd apps/server
npm install

# Setup database
echo ""
if [ "$USE_DOCKER" = true ]; then
    echo "🐳 Starting PostgreSQL and Redis with Docker..."
    cd ../..
    docker-compose up -d
    
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
    
    cd apps/server
    echo "🔄 Running Prisma migrations..."
    npx prisma migrate dev --name init
else
    echo "📁 Using SQLite database..."
    # Backup original schema
    cp prisma/schema.prisma prisma/schema.postgres.prisma
    # Use SQLite schema
    cp prisma/schema.sqlite.prisma prisma/schema.prisma
    
    echo "🔄 Running Prisma migrations for SQLite..."
    npx prisma migrate dev --name init
fi

# Seed database
echo ""
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run seed
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../web
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development servers:"
echo ""
echo "Backend:"
echo "  cd apps/server"
echo "  npm run dev"
echo ""
echo "Frontend:"
echo "  cd apps/web"
echo "  npm run dev"
echo ""
if [ "$USE_DOCKER" = true ]; then
    echo "Docker services are running. To stop them:"
    echo "  docker-compose down"
fi
