#!/bin/bash
echo "🚀 Starting Urban AI Explorer..."

# Kill any existing processes
echo "🧹 Cleaning up ports..."
kill -9 $(lsof -ti:8080) 2>/dev/null || true
kill -9 $(lsof -ti:8081) 2>/dev/null || true
kill -9 $(lsof -ti:3000) 2>/dev/null || true
kill -9 $(lsof -ti:3001) 2>/dev/null || true

# Wait a moment
sleep 2

# Start backend
echo "🏗️ Starting backend..."
cd explorer && mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Start frontend
echo "🎨 Starting frontend..."
cd ../frontend && npm start &
FRONTEND_PID=$!

# Trap to kill processes on exit
trap "echo '🛑 Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

echo "✅ Both services starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both services"

# Wait for processes
wait