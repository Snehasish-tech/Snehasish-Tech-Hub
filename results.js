// DOM elements
const finalSgpaElement = document.getElementById('finalSgpa');
const finalCgpaElement = document.getElementById('finalCgpa');
const finalPercentageElement = document.getElementById('finalPercentage');
const subjectsTableBody = document.getElementById('subjectsTableBody');
const totalCreditsElement = document.getElementById('totalCredits');
const totalGradePointsElement = document.getElementById('totalGradePoints');

// Initialize the results page
document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayResults();
});

// Load and display results
function loadAndDisplayResults() {
    const resultsData = JSON.parse(localStorage.getItem('marku_results_data'));
    
    if (!resultsData || !resultsData.subjects || resultsData.subjects.length === 0) {
        showNoDataMessage();
        return;
    }
    
    const { subjects, sgpa, cgpa, percentage } = resultsData;
    
    // Update main results
    finalSgpaElement.textContent = sgpa.toFixed(2);
    finalCgpaElement.textContent = cgpa.toFixed(2);
    finalPercentageElement.textContent = percentage.toFixed(2) + '%';
    
    // Calculate totals
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + subject.gradePoints, 0);
    
    // Update calculation details
    totalCreditsElement.textContent = totalCredits;
    totalGradePointsElement.textContent = totalGradePoints;
    
    // Populate subjects table
    populateSubjectsTable(subjects);
    
    // Add performance indicators
    addPerformanceIndicators(sgpa, percentage);
}

// Show message when no data is available
function showNoDataMessage() {
    const mainContent = document.querySelector('.results-summary');
    mainContent.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h2 style="color: #666; margin-bottom: 20px;">No Data Available</h2>
            <p style="color: #888; margin-bottom: 30px;">
                No subjects have been added yet. Please go back to the calculator and add some subjects.
            </p>
            <a href="index.html" class="btn-primary" style="text-decoration: none; display: inline-block;">
                Go to Calculator
            </a>
        </div>
    `;
}

// Populate subjects table
function populateSubjectsTable(subjects) {
    subjectsTableBody.innerHTML = subjects.map(subject => `
        <tr>
            <td><strong>${subject.name}</strong></td>
            <td>${subject.credits}</td>
            <td>${getGradeLetter(subject.grade)} (${subject.grade})</td>
            <td>${subject.grade}</td>
            <td><strong>${subject.gradePoints}</strong></td>
        </tr>
    `).join('');
}

// Get grade letter from grade points
function getGradeLetter(grade) {
    const gradeMap = {
        10: 'O',
        9: 'A+',
        8: 'A',
        7: 'B+',
        6: 'B',
        5: 'C',
        0: 'F'
    };
    return gradeMap[grade] || 'N/A';
}

// Add performance indicators
function addPerformanceIndicators(sgpa, percentage) {
    const mainResults = document.querySelector('.main-results');
    
    // Create performance indicator
    const performanceIndicator = document.createElement('div');
    performanceIndicator.className = 'performance-indicator';
    performanceIndicator.style.cssText = `
        text-align: center;
        margin: 30px 0;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    `;
    
    let performanceText = '';
    let performanceClass = '';
    
    if (sgpa >= 9.0) {
        performanceText = 'Excellent Performance! 🎉';
        performanceClass = 'excellent';
    } else if (sgpa >= 8.0) {
        performanceText = 'Very Good Performance! 👍';
        performanceClass = 'very-good';
    } else if (sgpa >= 7.0) {
        performanceText = 'Good Performance! 😊';
        performanceClass = 'good';
    } else if (sgpa >= 6.0) {
        performanceText = 'Satisfactory Performance 📚';
        performanceClass = 'satisfactory';
    } else if (sgpa >= 5.0) {
        performanceText = 'Needs Improvement ⚠️';
        performanceClass = 'needs-improvement';
    } else {
        performanceText = 'Critical - Requires Attention! 🚨';
        performanceClass = 'critical';
    }
    
    performanceIndicator.innerHTML = `
        <h3 style="margin-bottom: 10px; color: #333;">Performance Assessment</h3>
        <p style="font-size: 1.2rem; font-weight: 600; color: ${getPerformanceColor(performanceClass)};">
            ${performanceText}
        </p>
        <p style="margin-top: 10px; color: #666; font-size: 0.9rem;">
            Based on your SGPA of ${sgpa.toFixed(2)} (${percentage.toFixed(2)}%)
        </p>
    `;
    
    // Insert after result-highlight
    const resultHighlight = document.querySelector('.result-highlight');
    resultHighlight.parentNode.insertBefore(performanceIndicator, resultHighlight.nextSibling);
}

// Get performance color
function getPerformanceColor(performanceClass) {
    const colors = {
        'excellent': '#28a745',
        'very-good': '#17a2b8',
        'good': '#ffc107',
        'satisfactory': '#fd7e14',
        'needs-improvement': '#dc3545',
        'critical': '#6f42c1'
    };
    return colors[performanceClass] || '#333';
}

// Add print functionality
function printResults() {
    window.print();
}

// Add export functionality
function exportResults() {
    const resultsData = JSON.parse(localStorage.getItem('marku_results_data'));
    
    if (!resultsData) {
        alert('No data to export');
        return;
    }
    
    const { subjects, sgpa, cgpa, percentage } = resultsData;
    
    // Create CSV content
    let csvContent = 'Subject,Credits,Grade,Grade Points,Total Points\n';
    subjects.forEach(subject => {
        csvContent += `${subject.name},${subject.credits},${getGradeLetter(subject.grade)} (${subject.grade}),${subject.grade},${subject.gradePoints}\n`;
    });
    csvContent += `\nSummary\n`;
    csvContent += `SGPA,${sgpa.toFixed(2)}\n`;
    csvContent += `CGPA,${cgpa.toFixed(2)}\n`;
    csvContent += `Percentage,${percentage.toFixed(2)}%\n`;
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marku_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add keyboard shortcuts for results page
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printResults();
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportResults();
    }
    
    // Escape to go back
    if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
});

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        body {
            background: white !important;
        }
        
        .container {
            max-width: none !important;
            padding: 0 !important;
        }
        
        header {
            color: black !important;
            margin-bottom: 20px !important;
        }
        
        main {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
        
        .btn-back,
        .performance-indicator {
            display: none !important;
        }
        
        .result-item {
            background: #f8f9fa !important;
            color: black !important;
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
        
        table {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
        
        th {
            background: #f8f9fa !important;
        }
    }
`;
document.head.appendChild(printStyles);