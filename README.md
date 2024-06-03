# CourseProject
## Weather Dashboard

# Table of Contents
- [Overview](#Overview)
- [Features](#Features)
- [Technologies](#Technologies)
- [Setup](#Setup)
- [Usage](#Usage)
- [API Integration](#API-Integration)
- [Contributing](#Contributing)

# Overview
Weather Dashboard is a user-friendly web application that allows users to view the current weather and forecast for different cities. The dashboard also features a sidebar with motivational quotes to inspire users throughout their day. This project demonstrates the integration of various web development technologies including HTML5, CSS3, JavaScript, Node.js, and SQLite.

# Features
+ Current Weather: Displays current weather conditions for a searched city.
+ Favorite Cities: Users can save and quickly access their favorite cities.
+ Motivational Quotes: Sidebar displays inspirational quotes.
+ Responsive Design: Optimized for both desktop and mobile devices.
+ User Preferences: Saves user preferences and favorite cities using a backend service.

# Technologies
## Frontend:
    + HTML5
    + CSS3 (Flexbox and Media Queries)
    + JavaScript (ES6)

## Backend:
    + Node.js
    + Express.js
    + SQLite

## APIs:
    + Rapid API (for weather data)
    + A motivational quotes API (or hardcoded quotes for simplicity)

# Setup
## Prerequisites
+ Node.js and npm installed on your machine.
+ Rapid API key.

## Installation
1. Clone the repository:

```
git clone https://github.com/patricklungu99/CourseProject.git
cd backend
```

2. Install the dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

5. Open your frontend, start the live server and navigate to http://localhost:5500.

# Usage

+ Search for a City: Enter the name of a city in the search bar and click "Search" to view current weather and forecast.
+ Add to Favorites: Click the "Add to Favorites" button to save the city to your favorites list.
+ View Favorite Cities: Click on a city in the favorites list to quickly view its weather information.
+ Responsive Design: The layout adapts to various screen sizes, ensuring a seamless experience on both desktop and mobile devices.

# API Integration
## Weather Data
+ WeatherAPI.com: Used to fetch current weather.
    + __[API Documentation](https://rapidapi.com/weatherapi/api/weatherapi-com/)__

## Motivational Quotes
+ Get Quotes API: Used to fetch motivational quotes.
    + __[API Documentation](https://rapidapi.com/eimaam/api/get-quotes-api/)__


# Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

