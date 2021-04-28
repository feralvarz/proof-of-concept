# PoC: Thumbnail Generator UI

## Goal

Build a simple UI for a thumbnail generator.

## Requirements

- The UI let's you upload files through AJAX
- You should mock the required endpoints (solved using `firebase app`)
- It should preview the image that is going to be processed
- It should give the users the urls of the new thumbnails and preview them

## Grading Guidelines

### MVP (40 points)

- ✅ Every requirement is met
- ✅ The solution runs on our enviroment
- ✅ Tech Stack: **Angular v6** or **React v16**
- ✅ Any ENV specific value should be configurable and documented
- ✅ Everything should work after following a simple README (ideally: npm install; npm start)
- ✅ The code should be clear and easy to read / debug
- ✅ It's responsive and works well with phones and tablets

### Nice moves (5 points each)

- ✅ It leverages some design framework (Material UI / Ant / Blueprint) `React Boostrap`
- ✅ It includes transitions, loaders, progress status
- ✅ It includes drag-and-drop functionality + visual cues to help the user
- It's Dockerized for local development / testing
- It includes some kind of testing (unit tests, integration tests, etc) with at least 70% coverage
- ✅ Includes a simple login (recommended: Auth0) `included Login, Register, Logout process using firebase`

### Wait, WHAT?! (10 points each)

- It works also with the device camera
- ✅ It include a croping area / resize helper
- It uses Redux extensively

## Installation

**Important ⚠️**: The project needs `node >= 12.0.0`. I suggest to use NVM (Node Version Manager) to easily switch between node versions: [Read more about NVM](https://github.com/nvm-sh/nvm)

Run `npm install` to start
You will need **Firebase Config**, to use the app in Local Environment.
Drop me an Email to [feralvarz@gmail.com](mailto:feralvarz@gmail.com) and I will send it over.

## Development Server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Demo 🚀

Production App: [Thumbnails Generator UI](https://thumbnails-ui-prod.web.app/)

Enjoy 😀
