# Interview Scheduler

The Scheduler app allows a user to book an appointment for an interview on a specific day of the week. You can choose your interviewer, as well as edit or delete your appointment. 

Scheduler is a single-page, easy to use app with a clean design and interface. The app was built using React, Webpack, Babel, Axios, Storybook and Webpack Dev Server, and was tested using Jest and Cypress. 

## Some Visuals

### Creating an Appointment
![Adding an Appointment](https://github.com/claraisley/scheduler/blob/master/public/gifs/book-appt.gif?raw=true)

### Editing an Appointment
![Editing an Appointment](https://github.com/claraisley/scheduler/blob/master/public/gifs/edit-appt.gif?raw=true)

### Deleting an Appointment
![Deleting an Appointment](https://github.com/claraisley/scheduler/blob/master/public/gifs/delete-appt.gif?raw=true)

## Setup

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using `npm install`.
3. Start the web server using `npm start`. The app will be served at http://localhost:8000/.
   - Both servers run concurrently; requests are proxied from the Webpack development server to the API server.
4. Go to http://localhost:8000/ in your browser.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
