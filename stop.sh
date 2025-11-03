#!/bin/bash
# Stop all GetPrompt servers

echo "🛑 Stopping GetPrompt servers..."
echo ""

# Kill processes on specific ports
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Stopping backend (port 4000)..."
    lsof -ti:4000 | xargs kill -9 2>/dev/null
fi

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "Stopping frontend (port 8080)..."
    lsof -ti:8080 | xargs kill -9 2>/dev/null
fi

echo "✅ All servers stopped"
