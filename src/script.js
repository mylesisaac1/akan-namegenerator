document.getElementById('akanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous result
    document.getElementById('result').innerHTML = '';
    
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const gender = document.getElementById('gender').value;
    
    // Validate inputs
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showError("Please enter valid numbers for date fields");
        return;
    }
    
    if (!validateDate(day, month, year)) {
        showError("Please enter a valid date ");
        return;
    }
    
    if (!gender) {
        showError("Please select your gender");
        return;
    }
    
    // Calculate day of week (0-6 where 0=Sunday)
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    
    // Get Akan name
    const akanName = getAkanName(dayOfWeek, gender);
    const dayName = getDayName(dayOfWeek);
    
    // Display result
    document.getElementById('result').innerHTML = `
        <p>You were born on a <strong>${dayName}</strong></p>
        <p>Your Akan name is: <strong class="highlight">${akanName}</strong></p>
    `;
});

// Helper functions
function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p class="error">${message}</p>`;
}

function validateDate(day, month, year) {
    // Basic month validation
    if (month < 1 || month > 12) return false;
    
    
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
}

function getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

function getAkanName(dayIndex, gender) {
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
    return gender === 'male' ? maleNames[dayIndex] : femaleNames[dayIndex];
}
