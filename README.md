# Grade Calculator Web App

A browser-based tool for students to track their courses and calculate their GPA, overall and per year. No account or backend needed: data is saved in the browser.

## Features
- Add courses with a name, grade, credits and year
- Delete courses
- Credit-weighted overall GPA, recalculated on every change
- Year-wise GPA breakdown
- Data persists between visits using `localStorage`

## How the GPA is calculated
GPA = sum(grade x credits) / sum(credits), calculated overall and separately for each year.
Grades are entered as plain numbers, so use whichever scale you like (for example a 4.0 scale or percentages). The result is on that same scale.

## Tech
HTML, CSS, vanilla JavaScript (DOM manipulation, event handling, `localStorage`)

## Run it locally
1. Clone the repo
2. Open `index.html` in your browser

## Possible improvements
- Input validation (negative values, empty fields, credits of 0)
- Handle corrupted `localStorage` data without crashing
- Edit existing courses, not just delete
- Support different grading scales
