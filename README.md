# Hello, let me explain about this project.

# Requirement to run this project.

# 1. Install PostgreSQL database in your system.(Create a database with name "weather_report_db" and Create a table with name "weather_user").

    -> Querys if you use SQL Shell (psql)
    -> CREATE DATABASE weather_report_db;
    -> CREATE TABLE Weather_User ( id SERIAL PRIMARY KEY, username varchar(150), password_hash varchar(255), created_at timestamp default current_timestamp, updated_at timestamp default current_timestamp);

# 2. Install NodeJS in your system.

# 3. Finally open both porjects in VS Code (1.API) (2.WEATHER_REPORT)

    --> 1. For run API write command in terminal "npm start".it will you give you output in terminal like
        "[nodemon] starting `node index.js`
        Server running on port 4001"

    --> 2. For run WETHER_REPORT write command in terminal "npm run dev", it will give you localhost url, open url in your browser.  Project is ready to use

# --> Project Overview

# 1. Project contain 4 modules, 1.Login, 2. Registration, 3. Logout, 4. Weather Report Dashboard

# 2. First you need to register with your credentials (Username,Password).

# 3. After register you will be redirect to dashboard where Ahmedabad is default weather report, now you can search your city and view report.

# 4. If you viewed report then you can logout, it will redirect to login page, you can login page with your with credentials.
