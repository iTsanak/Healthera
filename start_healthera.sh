#!/bin/bash

# Start Docker Compose
gnome-terminal -- bash -c "docker-compose up --build; exec bash"

# Start Django development server
gnome-terminal -- bash -c "python backend/manage.py migrate; python backend/manage.py runserver 192.168.2.27:8000; exec bash"

# Start Expo development server
gnome-terminal -- bash -c "cd Healthera/; npx expo start; exec bash"
