# Bar-Hopper

## Setting Up the App
Make sure you have NodeJS, ReactJS, and python installed, as well as an emulator connected. In terminal, run 

```
git clone https://github.com/liamjdavis/Bar-Hopper.git
cd Bar-Hopper
pip install -r requirements.txt
python backend/manage.py makemigrations
python backend/manage.py migrate
python backend/manage.py runserver
```

then in a new terminal, run

```
cd frontend
npm install
npm run [ios/android]
```

## Features Built
- User Authentication (Both Bars and Users)
- All profile attributes
- Profile Pictures
- Following and Friending
- All Backend Endpoints

## Features to Build
- Setting Location
- Frontend for Promotion Posts, Likes, and Comments
- Users setting location
- Promotion Post Feed
- Dockerize Backend and Frontend for Security and Scalability
- Deploy on Server

## Tech Stack
- React Native for Frontend
- Django for Backend
- SQLite for Database(Directly Integrated with Django)