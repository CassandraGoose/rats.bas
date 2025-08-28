# RATS

I built this little game to test out Phaser and also to pay homage to a game I loved as a child: GORILLAS.BAS. GORILLAS.BAS came with MS-DOS, a command line operating system used in the 80s and 90s. The game involves throwing an explosive banana at your gorilla opponent over a city skyline, keeping in mind gravity, wind-speed, throwing angle, and velocity. Try the original GORILLAS.BAS game out on CLASSIC RELOAD: https://classicreload.com/play/qbasic-gorillas.html#

This game is purely for learning purposes. 

RATS encourages users to hurl explosive slices of pizza at their opponent over a city skyline but only requires the gamer to consider gravity, throwing angle, and velocity. It's meant to feel under-polished and evoke a retro feel. 


## Getting Started

I utlized the Phaser supplied vite template: https://github.com/phaserjs/template-vite-ts

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `dist` folder |
| `npm run dev-nolog` | Launch a development web server without sending anonymous data (see "About log.js" below) |
| `npm run build-nolog` | Create a production build in the `dist` folder without sending anonymous data (see "About log.js" below) |


## Template Project Structure (Supplied by Phaser)


| Path                           | Description                                                |
|--------------------------------|------------------------------------------------------------|
| `index.html`                   | A basic HTML page to contain the game.                     |
| `public/assets`                | Game sprites, audio, etc. Served directly at runtime.      |
| `public/style.css`             | Global layout styles.                                      |
| `src/main.ts`                  | Application bootstrap.                                     |
| `src/game`                     | Folder containing the game code.                           |
| `src/game/main.ts`             | Game entry point: configures and starts the game.          |
| `src/game/scenes`              | Folder with all Phaser game scenes.                        | 
| `src/game/scenes/Preloader.ts` | Loads assets before the game starts for snappy UX.         | 
| `src/game/entities`            | Organize game state and functionality in a basic capacity  | 
| `src/game/state`               | Organize game state and functionality in a basic capacity  | 

Note: Next time, I want to try out the game data that Phaser supplies, instead!
