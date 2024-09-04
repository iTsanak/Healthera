# Healthera

# To start the app:
## You need to download "Expo go" on your mobile device.
## Run "npm install" inside the /Healthera/Healthera directory
## Run "pip install -r requirements.txt" inside the /Healthera/backend

# Then run "npx expo start" inside Healthera/Healthera

## Scan the QR on the terminal from your mobile camera (later when next steps are complete)
## In another terminal run "ngrok http 8000" (download if you dont have ngrok)
## Add the ngrok generated link to your .env file below 

EXPO_PUBLIC_REST_API_SERVER=your-ngrok-http-link-here
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=
EXPO_PUBLIC_FACEBOOK_IOS_CLIENT_ID=
EXPO_PUBLIC_FACEBOOK_ANDROID_CLIENT_ID=

## In another terminal inside /backend run python manage.py make migrations then python manage.py migrate and lastly python manage.py runserver
## In another terminal run "docker compose up --build"

# Finally scan the QR code on that was shown on the terminal after running "npx expo start" above.

Happy Testing
