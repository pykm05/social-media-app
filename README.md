# 📝 Freeform - text based social media platform

![Freeform logo](./freeform-app/public/Freeform-logo.png)

Freeform is a text-based social media platform that aims to share and cultivate discussion around thoughts, moments, and ideas from users of all backgrounds, using text as the sole medium of communication. 

 [![Skills](https://skillicons.dev/icons?i=nodejs,vite,react,spring,java,js,tailwind, )](https://skillicons.dev)

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Requirements

Make sure you have the following installed:

- Node.js (v16+ recommended)
- Java JDK 23+
- Maven 3.9.9+

## Installing

### 1. Start the Spring Boot server

To get a running backend, ***please refer to the project report to get the necessary 
environment variables.***

Paste the information in the application.properties file located in path:

    /freeform-springboot/src/main/resources

Do keep in mind that the backend is a **Maven Project** which may require you to install some dependencies. We recommend using the Intellij IDE as they deal with it for you.
In your IDE (Intellij is preferred), run:

    FreeformSpringbootApplication.java

### 2. Start the React app

Open a new terminal window and cd into freeform-app to install the necesary dependencies.

    cd freeform-app

    npm install

Once installed, start the app by running

    npm start

The app should now be running on http://localhost:3000.
