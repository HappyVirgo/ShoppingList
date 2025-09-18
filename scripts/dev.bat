@echo off
REM Development setup script for Shopping List Application (Windows)

echo 🛒 Setting up Shopping List Application for development...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Start the database
echo 🗄️  Starting PostgreSQL database...
docker-compose up -d db

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ Development environment is ready!
echo.
echo To start the application:
echo   Backend:  cd backend ^&^& npm run dev
echo   Frontend: cd frontend ^&^& npm start
echo.
echo Or use Docker Compose:
echo   docker-compose up --build
