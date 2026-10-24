# FocusFlow Study Dashboard

FocusFlow is a small study dashboard with a Pomodoro timer and a task list. I built it with help from AI tools as part of my student portfolio.

It uses HTML, CSS, and JavaScript without a frontend framework. The main parts are timer controls, task updates, and saving information in the browser.

[Open FocusFlow](https://Kevin-Phon.github.io/focusflow-dashboard/)

## What it does

- Switch between a 25-minute focus session, a 5-minute short break, and a 15-minute long break.
- Start, pause, and reset the timer.
- Add tasks, mark them complete, and remove them.
- Save tasks and the light/dark theme preference using `localStorage`.
- Show the remaining time in the browser tab title and an alert when a session ends.

## How it works

- `index.html` contains the timer, task form, and page structure.
- `style.css` handles the layout and appearance.
- `script.js` handles the timer, button events, task list, and saved preferences.

Tasks and the theme preference are stored in the current browser. There is no account or server database, so they do not sync across devices. Refreshing the page resets the timer.

The timer uses `setInterval`, so browser throttling or putting a device to sleep can affect its timing.

## Run it locally

Clone this repository and open `index.html` in a browser. There are no packages to install or build commands to run.

## Project context

This is a learning project in my portfolio as a Computer Science student at Cal Poly Pomona. AI tools helped with the code and documentation. I am continuing to build my understanding of the project and revise it as I learn.

The interface includes labels for the main controls and a skip link to the dashboard.

[My portfolio](https://Kevin-Phon.github.io/portfolio/)
