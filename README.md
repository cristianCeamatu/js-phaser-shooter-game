![Hireable](https://img.shields.io/badge/Hireable-yes-success) ![](https://img.shields.io/badge/Mobile--responsive-yes-green) ![](https://img.shields.io/badge/-Microverse%20projects-blueviolet)

# Micro Shooters - Javascript Phaser 3 Game built in 5 days.

> In this project, we were required to build a space shooter game with the Phaser Javascript library.
> <br>
> The player will have to kill different types of enemies with AI functionality. He can also pick droppings to increase his weapon level/lives or to enter in shield mode.
> <br>
> The game currently has 7 levels (from which one is a Boss and the last one has an infinite spawn). The player can reach a maximum of 5 extra lives and level 7 laser.
> <br>
> The game is tested using Jest for unit testing

## Game design document
You can check the updated GDD in [PowerPoint](./gdd/Official_GDD.pptx) (recommended) and [pdf](./gdd/Official_GDD.pdf) versions, and some demos of the sprints (planning per day) used: [sprint1](./gdd/sprint1.txt), [sprint2](./gdd/sprint2.txt) and [sprint3](./gdd/sprint3.txt)

## App functionality

- Users are required to choose a nickname when they visit the website
- Users can kill enemies to increase the score and level
- Current game levels by score:
 - Level 0: 0 to 1000 points
 - Level 1: > 1000 points
 - Level 2: > 2500 points
 - Level 3: > 5000 points
 - Level 4: > 7000 points
 - Level 5: > 10000 points
 - Level Boss: > 150000 points
 - Level Infinite: unlock after killing the Boss
- The game has an all time leaderboard, scores are submitted automatically and updated at each game over.
- The user can see the leaderboard on the right-side nav.

## Controls

PC: `UP`, `DOWN`, `LEFT` and `RIGHT` arrow keys for movement and `SPACE` for shooting.
<br>
MOBILE: Use `joystick` displayed on the screen for the movement. Shooting is on auto mode.
Demo photo of the joystick:
<br>
![image](readme-assets/mobile-joystick.png)


## This web app is live, you can check it here: [Live demo](https://js-phaser-shooter-game.herokuapp.com/)

## Screenshots of the app.

![image](readme-assets/app-screenshot.png)
![image](readme-assets/app-screenshot1.png)

## Built With

- HTML/SCSS
- Webpack/ES6/Javascript
- Phaser 3
- Node/Express

## Prerequisities

To get this project up and running locally, you must have [node](https://nodejs.org/en/) installed locally. Node will automatically install [npm](https://www.npmjs.com/).

## Getting Started

**To get this project set up on your local machine, follow these simple steps:**

**Step 1**<br>
Navigate through the local folder where you want to clone the repository and run<br>
`git@github.com:cristianCeamatu/js-phaser-shooter-game.git`. It will clone the repo to your local folder.<br>
or with https<br>
`https://github.com/cristianCeamatu/js-phaser-shooter-game.git`.<br>
**Step 2**<br>
Run `cd js-phaser-shooter-game`<br>
**Step 3**<br>
Run `npm install` to install the npm packages from the `package.json` file.<br>
**Step 4**<br>
Run `npm run dev` to start the webpack server, you can now navigate to `http://localhost:3000` to view the app. The server refreshes the app every time you make a change to a file used by it.<br>
**Step 5**<br>
Most important, enjoy the app!<br>

## Tests

1. Open Terminal

2. Install dependencies (only if you did not install them previously):

   `npm install`

3. Run the tests with the command:

   `npm test`

## Future improvements
- Make the game playable on mobiles
- Add other worlds/levels/enemies

## Authors

👤 **Cristian Viorel Ceamatu**

- Email: [cristian.ceamatu@gmail.com](cristian.ceamatu@gmail.com)
- Github: [https://github.com/cristianCeamatu](https://github.com/cristianCeamatu)
- Twitter: [https://twitter.com/CristianCeamatu](https://twitter.com/CristianCeamatu)
- Linkedin: [https://www.linkedin.com/in/ceamatu-cristian/](https://www.linkedin.com/in/ceamatu-cristian/)

## 🤝 Contributing

Our favourite contributions are those that help us improve the project, whether with a contribution, an issue, or a feature request!

## Show your support

If you've read this far....give us a ⭐️!

## 📝 License

This project is licensed by Microverse and the Odin Project
