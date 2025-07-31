# Marku - Grade Calculator & GPA Tracker

A simple, responsive 2-page website for calculating SGPA, CGPA, and percentage from subject grades and credits.

## Features

- **Page 1 (Calculator)**: Add subjects with name, credits, and grade
- **Page 2 (Results)**: Detailed results summary with breakdown
- **Automatic Calculations**: Real-time SGPA, CGPA, and percentage calculation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Persistence**: Uses localStorage to save your data
- **Performance Assessment**: Automatic performance evaluation based on grades
- **Export & Print**: Export results to CSV and print functionality

## Grade Scale

| Grade | Points | Letter |
|-------|--------|--------|
| O     | 10     | Outstanding |
| A+    | 9      | Excellent |
| A     | 8      | Very Good |
| B+    | 7      | Good |
| B     | 6      | Above Average |
| C     | 5      | Average |
| F     | 0      | Fail |

## How to Use

1. **Add Subjects**: Enter subject name, credits (1-10), and select grade
2. **View Results**: See real-time SGPA, CGPA, and percentage updates
3. **Detailed Summary**: Click "View Detailed Results" for comprehensive breakdown
4. **Export/Print**: Use keyboard shortcuts or browser functions to save/print results

## Keyboard Shortcuts

### Calculator Page (index.html)
- `Ctrl/Cmd + Enter`: Submit form
- `Escape`: Clear form

### Results Page (results.html)
- `Ctrl/Cmd + P`: Print results
- `Ctrl/Cmd + E`: Export to CSV
- `Escape`: Go back to calculator

## Files Structure

```
marku/
├── index.html          # Main calculator page
├── results.html        # Results summary page
├── styles.css          # Responsive CSS styling
├── script.js           # Calculator page JavaScript
├── results.js          # Results page JavaScript
└── README.md           # This file
```

## Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage
- **Responsive**: CSS Grid and Flexbox
- **No Dependencies**: Pure HTML/CSS/JS implementation

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Local Development

1. Clone or download the files
2. Open `index.html` in your web browser
3. Start adding subjects and calculating grades!

## License

This project is open source and available under the MIT License.

