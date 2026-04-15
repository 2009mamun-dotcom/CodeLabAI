let database = null;

function showLogin() {
    document.getElementById('access-trigger-section').style.display = 'none';
    document.getElementById('bg-image').classList.add('blur-bg');
    document.getElementById('login-section').style.display = 'flex';
}

async function checkLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "01885412300" && pass === "17648") {
        try {
            const res = await fetch('data.json');
            database = await res.json();
            
            // Update Counters
            document.getElementById('gallery-count').innerText = database.gallery?.length || 0;
            document.getElementById('contact-count').innerText = database.contacts?.length || 0;
            
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
        } catch (e) {
            alert("Database Connection Failed!");
        }
    } else {
        alert("ACCESS DENIED: Credentials Invalid.");
    }
}

function showModule(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    if(id === 'gallery-view') renderGallery();
    else if(id === 'contact-view') renderContact();
}

function goBack() {
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none');
    document.getElementById('dashboard').style.display = 'flex';
}

function renderGallery() {
    const container = document.getElementById('photo-gallery');
    container.innerHTML = database.gallery.map(item => `
        <div class="photo-item">
            <img src="${item.url}">
            <p style="margin:10px 0; font-size:14px; opacity:0.8;">${item.caption}</p>
            <a href="${item.url}" download style="color:var(--primary); text-decoration:none; font-weight:bold;">DOWNLOAD</a>
        </div>
    `).join('');
}

function renderContact(filteredData = null) {
    const container = document.getElementById('contact-details');
    const data = filteredData || database.contacts;
    container.innerHTML = data.map(c => `
        <div class="photo-item" style="border-left: 4px solid var(--primary); margin-bottom:15px;">
            <p><strong>Name:</strong> ${c.name}</p>
            <p><strong>Phone:</strong> <a href="tel:${c.number}" style="color:var(--primary);">${c.number}</a></p>
        </div>
    `).join('');
}

function searchContact() {
    const query = document.getElementById('contactSearch').value.toLowerCase();
    const filtered = database.contacts.filter(c => c.name.toLowerCase().includes(query) || c.number.includes(query));
    renderContact(filtered);
}
