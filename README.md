# DB Profiler App

1. Clone the app https://github.com/RahulChouhan96/postgres_profiler_flask_react.git

## Setup Backend
1. `cd flask-server`
2. `python -m venv venv`
3. For windows: `source venv/Scripts/activate`. For Mac `source venv/bin/activate`.
4. As of now there is no `requirements.txt` so we need to download all packages by command: `pip install Flask flask_sqlalchemy python-dotenv`.
5. Create env variable - Create a file `.flaskenv` and create these environmnt variables.

```
DB_USERNAME="<YOUR_DB_USERNAME>"
DB_PASSWORD="<YOUR_DB_PASSWORD>"
DB_NAME="<YOUR_DB_NAME>"

FLASK_APP="server"
FLASK_ENV="development"
FLASK_RUN_PORT=3000
```

6. Run backend: `flask run`.

## Setup Frontend
1. Open a new terminal and go into client folder by `cd client`.
2. `npm install`.
3. `npm start`. Type "y" if asks to start frontend. A web page will be opened.

## Working
1. To check list of tables (present in your DB), go to `localhost:3001/tables`.
2. To check metrics for any table, click on the table name and it will take you to the corresponding page.

## Missing
DB connection is not implemented.