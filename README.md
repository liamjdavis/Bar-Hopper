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
npx react-native start
```