#!/bin/bash

# Matcha Gallery - Local Development Server
# Simple script to start a local server for testing

echo "🍵 Starting Matcha Gallery local server..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python first."
    exit 1
fi

# Start the server
echo "Starting server on http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
