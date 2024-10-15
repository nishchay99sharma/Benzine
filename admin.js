document.addEventListener('DOMContentLoaded', function() {
    // Load pending testimonials
    const pendingTestimonials = JSON.parse(localStorage.getItem('pendingTestimonials')) || [];
    const pendingTestimonialsDiv = document.getElementById('pendingTestimonials');

    pendingTestimonials.forEach((testimonial, index) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('mb-4', 'p-4', 'bg-gray-100', 'rounded');
        testimonialDiv.innerHTML = `
            <p>"${testimonial.text}"</p>
            <span>- ${testimonial.name}</span>
            <br>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2" onclick="approveTestimonial(${index})">Approve</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2" onclick="deletePendingTestimonial(${index})">Delete</button>
        `;
        pendingTestimonialsDiv.appendChild(testimonialDiv);
    });

    // Load approved testimonials
    const approvedTestimonials = JSON.parse(localStorage.getItem('approvedTestimonials')) || [];
    const approvedTestimonialsDiv = document.getElementById('approvedTestimonials');

    approvedTestimonials.forEach((testimonial, index) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('mb-4', 'p-4', 'bg-gray-100', 'rounded');
        testimonialDiv.innerHTML = `
            <p>"${testimonial.text}"</p>
            <span>- ${testimonial.name}</span>
            <br>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onclick="deleteApprovedTestimonial(${index})">Delete</button>
        `;
        approvedTestimonialsDiv.appendChild(testimonialDiv);
    });
});

// Function to approve a pending testimonial
function approveTestimonial(index) {
    const pendingTestimonials = JSON.parse(localStorage.getItem('pendingTestimonials')) || [];
    const approvedTestimonial = pendingTestimonials[index];

    // Add to approved testimonials
    let approvedTestimonials = JSON.parse(localStorage.getItem('approvedTestimonials')) || [];
    approvedTestimonials.push(approvedTestimonial);
    localStorage.setItem('approvedTestimonials', JSON.stringify(approvedTestimonials));

    // Remove from pending
    pendingTestimonials.splice(index, 1);
    localStorage.setItem('pendingTestimonials', JSON.stringify(pendingTestimonials));

    // Reload page
    location.reload();
}

// Function to delete a pending testimonial
function deletePendingTestimonial(index) {
    const pendingTestimonials = JSON.parse(localStorage.getItem('pendingTestimonials')) || [];
    pendingTestimonials.splice(index, 1);
    localStorage.setItem('pendingTestimonials', JSON.stringify(pendingTestimonials));

    // Reload page
    location.reload();
}

// Function to delete an approved testimonial
function deleteApprovedTestimonial(index) {
    const approvedTestimonials = JSON.parse(localStorage.getItem('approvedTestimonials')) || [];
    approvedTestimonials.splice(index, 1);
    localStorage.setItem('approvedTestimonials', JSON.stringify(approvedTestimonials));

    // Reload page
    location.reload();
}


// Show the schedule modal when "Add Schedule" is clicked
document.getElementById('addScheduleBtn').addEventListener('click', function() {
    document.getElementById('scheduleModal').classList.remove('hidden');
});

// Close the schedule modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('scheduleModal').classList.add('hidden');
});

// Handle adding the schedule
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const scheduleDate = document.getElementById('scheduleDate').value;
    const scheduleTask = document.getElementById('scheduleTask').value;

    if (scheduleDate && scheduleTask) {
        let schedules = JSON.parse(localStorage.getItem('pendingSchedules')) || [];
        schedules.push({ date: scheduleDate, task: scheduleTask });
        localStorage.setItem('pendingSchedules', JSON.stringify(schedules));

        alert('Schedule added successfully!');
        document.getElementById('scheduleModal').classList.add('hidden');
        displayConfirmedSchedules(); // Ensure confirmed schedules are displayed
    }
});

// Confirm and display schedules
document.getElementById('confirmScheduleBtn').addEventListener('click', function() {
    const pendingSchedules = JSON.parse(localStorage.getItem('pendingSchedules')) || [];
    const confirmedSchedules = JSON.parse(localStorage.getItem('confirmedSchedules')) || [];

    pendingSchedules.forEach(schedule => {
        confirmedSchedules.push(schedule);
    });

    localStorage.setItem('confirmedSchedules', JSON.stringify(confirmedSchedules));
    localStorage.removeItem('pendingSchedules'); // Clear pending schedules after confirmation

    displayConfirmedSchedules();
});

// Display confirmed schedules
function displayConfirmedSchedules() {
    const confirmedSchedules = JSON.parse(localStorage.getItem('confirmedSchedules')) || [];
    const scheduleDiv = document.getElementById('scheduleList');

    scheduleDiv.innerHTML = ''; // Clear previous list

    confirmedSchedules.forEach((schedule, index) => {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('mb-4', 'p-4', 'bg-gray-100', 'rounded');
        scheduleItem.innerHTML = `
            <p><strong>Date:</strong> ${schedule.date}</p>
            <p><strong>Task:</strong> ${schedule.task}</p>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onclick="deleteSchedule(${index})">Delete</button>
        `;
        scheduleDiv.appendChild(scheduleItem);
    });
}

// Delete a schedule
function deleteSchedule(index) {
    const confirmedSchedules = JSON.parse(localStorage.getItem('confirmedSchedules')) || [];
    confirmedSchedules.splice(index, 1);
    localStorage.setItem('confirmedSchedules', JSON.stringify(confirmedSchedules));

    displayConfirmedSchedules();
}

// Display schedules on page load
document.addEventListener('DOMContentLoaded', displayConfirmedSchedules);



// Manage Values
const valuesList = document.getElementById('valuesList');
document.getElementById('valueForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const valueInput = document.getElementById('valueInput');
    const valueText = valueInput.value.trim();

    if (valueText) {
        let values = JSON.parse(localStorage.getItem('companyValues')) || [];
        values.push(valueText);
        localStorage.setItem('companyValues', JSON.stringify(values));
        valueInput.value = ''; // Clear input
        displayValues();
    }
});

function displayValues() {
    const values = JSON.parse(localStorage.getItem('companyValues')) || [];
    valuesList.innerHTML = ''; // Clear existing list
    values.forEach((value, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${value} <button class="text-red-500" onclick="deleteValue(${index})">Delete</button>`;
        valuesList.appendChild(li);
    });
}

function deleteValue(index) {
    let values = JSON.parse(localStorage.getItem('companyValues')) || [];
    values.splice(index, 1);
    localStorage.setItem('companyValues', JSON.stringify(values));
    displayValues();
}

// Manage Events
const eventsList = document.getElementById('eventsList');
document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const eventInput = document.getElementById('eventInput');
    const eventText = eventInput.value.trim();

    if (eventText) {
        let events = JSON.parse(localStorage.getItem('companyEvents')) || [];
        events.push(eventText);
        localStorage.setItem('companyEvents', JSON.stringify(events));
        eventInput.value = ''; // Clear input
        displayEvents();
    }
});

function displayEvents() {
    const events = JSON.parse(localStorage.getItem('companyEvents')) || [];
    eventsList.innerHTML = ''; // Clear existing list
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${event} <button class="text-red-500" onclick="deleteEvent(${index})">Delete</button>`;
        eventsList.appendChild(li);
    });
}

function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem('companyEvents')) || [];
    events.splice(index, 1);
    localStorage.setItem('companyEvents', JSON.stringify(events));
    displayEvents();
}

// Initial display of values and events on page load
document.addEventListener('DOMContentLoaded', function() {
    displayValues();
    displayEvents();
});
