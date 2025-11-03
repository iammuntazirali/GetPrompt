#!/bin/bash
# Quick Start Script for GetPrompt
# Run this to get the application running immediately

echo "🚀 GetPrompt Quick Start"
echo "======================="
echo ""

# Check if servers are already running
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 4000 already in use. Killing existing process..."
    lsof -ti:4000 | xargs kill -9 2>/dev/null
    sleep 1
fi

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 8080 already in use. Killing existing process..."
    lsof -ti:8080 | xargs kill -9 2>/dev/null
    sleep 1
fi

echo "✅ Ports cleared"
echo ""

echo "🌐 Starting backend server..."
cd apps/server
node server.js > /tmp/getprompt-backend.log 2>&1 &
BACKEND_PID=$!
cd ../..

# Wait a bit for backend to start
sleep 2

# Check if backend started
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ Backend started (PID: $BACKEND_PID)"
else
    echo "❌ Backend failed to start. Check /tmp/getprompt-backend.log"
    exit 1
fi

echo ""

# Start frontend
echo "🎨 Starting frontend..."
cd apps/web
npm run dev > /tmp/getprompt-frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../..

# Wait a bit for frontend to start
sleep 3

# Check if frontend started
if ps -p $FRONTEND_PID > /dev/null; then
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
else
    echo "❌ Frontend failed to start. Check /tmp/getprompt-frontend.log"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ GetPrompt is now running!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Frontend:  http://localhost:8080"
echo "🔌 Backend:   http://localhost:4000"
echo "🏥 Health:    http://localhost:4000/api/health"
echo ""
echo "📋 Process IDs:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "📄 Logs:"
echo "   Backend:  /tmp/getprompt-backend.log"
echo "   Frontend: /tmp/getprompt-frontend.log"
echo ""
echo "To stop the servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or run: ./stop.sh"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
