// Storage key for localStorage
const STORAGE_KEY = 'marku_subjects';

// Grade point mapping
const gradePoints = {
    '10': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '0': 0
};

// Grade letter mapping
const gradeLetters = {
    '10': 'A+', '9': 'A', '8': 'B+', '7': 'B', '6': 'C+', '5': 'C', '4': 'D', '0': 'F'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (document.getElementById('subjectForm')) {
        initializeIndexPage();
    }
});

// Initialize index page functionality
function initializeIndexPage() {
    const form = document.getElementById('subjectForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Load existing subjects
    loadSubjects();
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addSubject();
    });
    
    // Calculate button
    calculateBtn.addEventListener('click', function() {
        calculateAndRedirect();
    });
    
    // Clear button
    clearBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all subjects?')) {
            clearAllSubjects();
        }
    });
}

// Add a new subject
function addSubject() {
    const subjectName = document.getElementById('subjectName').value.trim();
    const credits = parseInt(document.getElementById('credits').value);
    const grade = document.getElementById('grade').value;
    
    if (!subjectName || !credits || !grade) {
        alert('Please fill in all fields');
        return;
    }
    
    const subject = {
        id: Date.now(),
        name: subjectName,
        credits: credits,
        grade: parseInt(grade),
        gradeLetter: gradeLetters[grade]
    };
    
    // Get existing subjects
    let subjects = getSubjects();
    subjects.push(subject);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    
    // Update display
    loadSubjects();
    
    // Clear form
    document.getElementById('subjectForm').reset();
    
    // Show success message
    showNotification('Subject added successfully!', 'success');
}

// Load and display subjects
function loadSubjects() {
    const subjects = getSubjects();
    const container = document.getElementById('subjectsContainer');
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (subjects.length === 0) {
        container.innerHTML = '<p class="no-subjects">No subjects added yet.</p>';
        calculateBtn.disabled = true;
        return;
    }
    
    container.innerHTML = '';
    calculateBtn.disabled = false;
    
    subjects.forEach(subject => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-item';
        subjectDiv.innerHTML = `
            <div class="subject-info">
                <div class="subject-name">${subject.name}</div>
                <div class="subject-details">Credits: ${subject.credits} | Grade: ${subject.gradeLetter} (${subject.grade})</div>
            </div>
            <button class="remove-btn" onclick="removeSubject(${subject.id})" title="Remove subject">×</button>
        `;
        container.appendChild(subjectDiv);
    });
}

// Remove a subject
function removeSubject(id) {
    if (confirm('Are you sure you want to remove this subject?')) {
        let subjects = getSubjects();
        subjects = subjects.filter(subject => subject.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
        loadSubjects();
        showNotification('Subject removed successfully!', 'success');
    }
}

// Clear all subjects
function clearAllSubjects() {
    localStorage.removeItem(STORAGE_KEY);
    loadSubjects();
    showNotification('All subjects cleared!', 'success');
}

// Get subjects from localStorage
function getSubjects() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Calculate SGPA, CGPA, and Percentage
function calculateGrades(subjects) {
    if (subjects.length === 0) {
        return { sgpa: 0, cgpa: 0, percentage: 0 };
    }
    
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    subjects.forEach(subject => {
        totalGradePoints += subject.grade * subject.credits;
        totalCredits += subject.credits;
    });
    
    const sgpa = totalGradePoints / totalCredits;
    const cgpa = sgpa; // For this simple calculator, CGPA = SGPA
    const percentage = (sgpa / 10) * 100;
    
    return {
        sgpa: parseFloat(sgpa.toFixed(2)),
        cgpa: parseFloat(cgpa.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2))
    };
}

// Calculate and redirect to results page
function calculateAndRedirect() {
    const subjects = getSubjects();
    
    if (subjects.length === 0) {
        alert('Please add at least one subject before calculating.');
        return;
    }
    
    // Calculate results
    const results = calculateGrades(subjects);
    
    // Store results in localStorage
    localStorage.setItem('marku_results', JSON.stringify(results));
    
    // Redirect to results page
    window.location.href = 'results.html';
}

// Load results on results page
function loadResults() {
    const subjects = getSubjects();
    const storedResults = localStorage.getItem('marku_results');
    
    if (!storedResults || subjects.length === 0) {
        alert('No results found. Please add subjects and calculate first.');
        window.location.href = 'index.html';
        return;
    }
    
    const results = JSON.parse(storedResults);
    
    // Update result values
    document.getElementById('sgpaValue').textContent = results.sgpa.toFixed(2);
    document.getElementById('cgpaValue').textContent = results.cgpa.toFixed(2);
    document.getElementById('percentageValue').textContent = results.percentage.toFixed(2) + '%';
    
    // Populate results table
    const tableBody = document.getElementById('resultsTableBody');
    tableBody.innerHTML = '';
    
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.credits}</td>
            <td>${subject.gradeLetter}</td>
            <td>${subject.grade}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Download results as text file
function downloadResults() {
    const subjects = getSubjects();
    const storedResults = localStorage.getItem('marku_results');
    
    if (!storedResults) {
        alert('No results to download.');
        return;
    }
    
    const results = JSON.parse(storedResults);
    
    let content = `MARKU - Grade Calculator Results\n`;
    content += `=====================================\n\n`;
    content += `SGPA: ${results.sgpa.toFixed(2)}\n`;
    content += `CGPA: ${results.cgpa.toFixed(2)}\n`;
    content += `Percentage: ${results.percentage.toFixed(2)}%\n\n`;
    content += `Subject Details:\n`;
    content += `----------------\n`;
    
    subjects.forEach((subject, index) => {
        content += `${index + 1}. ${subject.name}\n`;
        content += `   Credits: ${subject.credits} | Grade: ${subject.gradeLetter} (${subject.grade})\n\n`;
    });
    
    content += `Generated on: ${new Date().toLocaleString()}\n`;
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marku_results_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('marku_results');
        window.location.href = 'index.html';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#e53e3e'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}