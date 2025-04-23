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
        showError("Please enter a valid date (check day/month combination)");
        return;
    }
    
    if (!gender) {
        showError("Please select your gender");
        return;
    }
    
    
    const dayOfWeek = calculateDayOfWeek(day, month, year);
    
    // Get Akan name
    const akanName = getAkanName(dayOfWeek, gender);
    const dayName = getDayName(dayOfWeek);
    
    
    document.getElementById('result').innerHTML = `
        <p>You were born on a <strong>${dayName}</strong></p>
        <p>Your Akan name is: <strong class="highlight">${akanName}</strong></p>
    `;
});


function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p class="error">${message}</p>`;
}

function validateDate(day, month, year) {
    // Basic month validation
    if (month < 1 || month > 12) return false;
    
    // Check valid day for month
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


function calculateDayOfWeek(day, month, year) {
    
    let adjustedMonth = month;
    let adjustedYear = year;
    if (month < 3) {
        adjustedMonth += 12;
        adjustedYear -= 1;
    }
    
    const CC = Math.floor(adjustedYear / 100); 
    const YY = adjustedYear % 100;            
    const MM = adjustedMonth;
    const DD = day;
    
    
    const term1 = Math.floor(CC / 4) - 2 * CC - 1;
    const term2 = Math.floor(5 * YY / 4);
    const term3 = Math.floor(26 * (MM + 1) / 10);
    let dayIndex = (term1 + term2 + term3 + DD) % 7;
    
    
    return dayIndex < 0 ? dayIndex + 7 : dayIndex;
}
