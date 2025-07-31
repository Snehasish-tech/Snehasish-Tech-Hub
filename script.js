// Store subjects in localStorage
let subjects = JSON.parse(localStorage.getItem('marku_subjects')) || [];

// DOM elements
const gradeForm = document.getElementById('gradeForm');
const subjectsList = document.getElementById('subjectsList');
const sgpaElement = document.getElementById('sgpa');
const cgpaElement = document.getElementById('cgpa');
const percentageElement = document.getElementById('percentage');
const viewResultsBtn = document.getElementById('viewResults');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateSubjectsList();
    updateResults();
});

// Form submission handler
gradeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(gradeForm);
    const subjectName = formData.get('subjectName').trim();
    const credits = parseInt(formData.get('credits'));
    const grade = parseInt(formData.get('grade'));
    
    // Validation
    if (!subjectName) {
        alert('Please enter a subject name');
        return;
    }
    
    if (credits < 1 || credits > 10) {
        alert('Credits must be between 1 and 10');
        return;
    }
    
    if (grade < 0 || grade > 10) {
        alert('Please select a valid grade');
        return;
    }
    
    // Check if subject already exists
    const existingSubject = subjects.find(subject => 
        subject.name.toLowerCase() === subjectName.toLowerCase()
    );
    
    if (existingSubject) {
        alert('This subject already exists. Please use a different name.');
        return;
    }
    
    // Add new subject
    const newSubject = {
        id: Date.now(),
        name: subjectName,
        credits: credits,
        grade: grade,
        gradePoints: credits * grade
    };
    
    subjects.push(newSubject);
    saveSubjects();
    
    // Reset form
    gradeForm.reset();
    
    // Update display
    updateSubjectsList();
    updateResults();
    
    // Show success message
    showNotification('Subject added successfully!');
});

// Update subjects list display
function updateSubjectsList() {
    if (subjects.length === 0) {
        subjectsList.innerHTML = '<p class="no-subjects">No subjects added yet</p>';
        return;
    }
    
    subjectsList.innerHTML = subjects.map(subject => `
        <div class="subject-card">
            <button class="delete-btn" onclick="deleteSubject(${subject.id})" title="Delete subject">×</button>
            <h4>${subject.name}</h4>
            <div class="subject-details">
                <div class="subject-detail">
                    <strong>Credits:</strong> ${subject.credits}
                </div>
                <div class="subject-detail">
                    <strong>Grade:</strong> ${getGradeLetter(subject.grade)} (${subject.grade})
                </div>
            </div>
            <div class="subject-detail">
                <strong>Grade Points:</strong> ${subject.gradePoints}
            </div>
        </div>
    `).join('');
}

// Delete subject
function deleteSubject(id) {
    if (confirm('Are you sure you want to delete this subject?')) {
        subjects = subjects.filter(subject => subject.id !== id);
        saveSubjects();
        updateSubjectsList();
        updateResults();
        showNotification('Subject deleted successfully!');
    }
}

// Calculate and update results
function updateResults() {
    if (subjects.length === 0) {
        sgpaElement.textContent = '0.00';
        cgpaElement.textContent = '0.00';
        percentageElement.textContent = '0.00%';
        viewResultsBtn.disabled = true;
        return;
    }
    
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + subject.gradePoints, 0);
    
    const sgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    const percentage = sgpa * 10; // Assuming 10-point scale
    
    // Update display
    sgpaElement.textContent = sgpa.toFixed(2);
    cgpaElement.textContent = sgpa.toFixed(2); // For single semester, CGPA = SGPA
    percentageElement.textContent = percentage.toFixed(2) + '%';
    
    // Enable view results button
    viewResultsBtn.disabled = false;
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

// Save subjects to localStorage
function saveSubjects() {
    localStorage.setItem('marku_subjects', JSON.stringify(subjects));
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// View results button handler
viewResultsBtn.addEventListener('click', function() {
    // Store current data for results page
    localStorage.setItem('marku_results_data', JSON.stringify({
        subjects: subjects,
        sgpa: parseFloat(sgpaElement.textContent),
        cgpa: parseFloat(cgpaElement.textContent),
        percentage: parseFloat(percentageElement.textContent.replace('%', ''))
    }));
    
    // Navigate to results page
    window.location.href = 'results.html';
});

// Clear all data function (for debugging)
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.removeItem('marku_subjects');
        localStorage.removeItem('marku_results_data');
        subjects = [];
        updateSubjectsList();
        updateResults();
        showNotification('All data cleared!');
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        gradeForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        gradeForm.reset();
    }
});