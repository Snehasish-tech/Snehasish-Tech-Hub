# Marku - Grade Calculator

A simple, responsive 2-page website for calculating SGPA, CGPA, and percentage based on subject grades and credits.

## Features

- **Page 1 (index.html)**: Input form for subjects
  - Subject name input
  - Credits input (1-10)
  - Grade selection (A+ to F)
  - Add multiple subjects
  - View added subjects list
  - Remove individual subjects
  - Calculate results

- **Page 2 (results.html)**: Results summary
  - SGPA (Semester Grade Point Average)
  - CGPA (Cumulative Grade Point Average)
  - Percentage equivalent
  - Detailed subject table
  - Download results as text file
  - Navigation back to input page

## Grade Point Scale

- A+ = 10 points
- A = 9 points
- B+ = 8 points
- B = 7 points
- C+ = 6 points
- C = 5 points
- D = 4 points
- F = 0 points

## Calculations

- **SGPA** = Total Grade Points / Total Credits
- **CGPA** = SGPA (for single semester)
- **Percentage** = (SGPA / 10) × 100

## How to Use

1. Open `index.html` in a web browser
2. Enter subject details:
   - Subject name
   - Number of credits
   - Grade achieved
3. Click "Add Subject" to add to the list
4. Repeat for all subjects
5. Click "Calculate Results" to view SGPA, CGPA, and percentage
6. On the results page, you can:
   - View detailed calculations
   - Download results as a text file
   - Add more subjects
   - Clear all data

## Technologies Used

- HTML5
- CSS3 (Responsive design with CSS Grid and Flexbox)
- Vanilla JavaScript
- Local Storage for data persistence

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean UI**: Minimal and modern design with gradient backgrounds
- **Data Persistence**: Uses browser's localStorage to save subjects
- **Form Validation**: Ensures all fields are filled before submission
- **Interactive Elements**: Hover effects and smooth animations
- **Download Results**: Export results as a formatted text file
- **Notifications**: Success/error messages for user actions

## File Structure

```
/
├── index.html          # Main input page
├── results.html        # Results display page
├── styles.css          # CSS styles for both pages
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Local Development

To run locally:

1. Clone or download the files
2. Open a terminal in the project directory
3. Run: `python3 -m http.server 8000`
4. Open browser and go to: `http://localhost:8000`

No additional dependencies or build process required!

