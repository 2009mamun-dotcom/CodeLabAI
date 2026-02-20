let database = null;

// Transition to Login
function showLogin() {
    document.getElementById('access-trigger-section').style.display = 'none';
    document.getElementById('bg-image').classList.add('blur-bg');
    document.getElementById('login-section').style.display = 'flex';
}

// Login Authentication
async function checkLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "01885412300" && pass === "17648") {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        // Fetch JSON Data
        const res = await fetch('data.json');
        database = await res.json();
    } else {
        alert("Access Denied! Check Credentials.");
    }
}

// Module Navigation
function showModule(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    if(id === 'gallery-view') renderGallery();
    else renderContact();
}

function goBack() {
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none');
    document.getElementById('dashboard').style.display = 'flex';
}

// Content Rendering
function renderGallery() {
    const container = document.getElementById('photo-gallery');
    container.innerHTML = "";
    database.gallery.forEach(item => {
        container.innerHTML += `
            <div class="photo-item">
                <img src="${item.url}" alt="image">
                <p style="margin: 10px 0;">${item.caption}</p>
                <a href="${item.url}" download style="color:#00cec9; text-decoration:none;">Download .JPG</a>
            </div>`;
    });
}

function renderContact(filteredData = null) {
    const container = document.getElementById('contact-details');
    container.innerHTML = "";
    const data = filteredData || [database.contact];
    
    data.forEach(c => {
        container.innerHTML += `
            <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:10px; margin-top:15px; border-left: 4px solid #00cec9;">
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Address:</strong> ${c.address}</p>
                <p><strong>Phone:</strong> ${c.number}</p>
            </div>`;
    });
}

// Search Function
function searchContact() {
    const query = document.getElementById('contactSearch').value.toLowerCase();
    const c = database.contact;
    if (c.name.toLowerCase().includes(query) || c.number.includes(query)) {
        renderContact([c]);
    } else {
        document.getElementById('contact-details').innerHTML = "<p>Not Found</p>";
    }
}
