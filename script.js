let database = null;

function showLogin() {
    document.getElementById('access-trigger-section').style.display = 'none';
    document.getElementById('bg-image').classList.add('blur-bg');
    document.getElementById('login-section').style.display = 'flex';
}

async function checkLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // লোডিং ইফেক্ট বাটন এ দিতে পারেন
    if (user === "01885412300" && pass === "17648") {
        try {
            const res = await fetch('data.json');
            database = await res.json();
            
            // টোটাল সংখ্যা আপডেট করা
            updateCounters();
            
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
        } catch (error) {
            alert("data.json ফাইলটি পাওয়া যায়নি!");
        }
    } else {
        alert("ভুল পাসওয়ার্ড বা ইউজারনেম!");
    }
}

function updateCounters() {
    if(database) {
        document.getElementById('gallery-count').innerText = database.gallery ? database.gallery.length : 0;
        document.getElementById('contact-count').innerText = database.contacts ? database.contacts.length : 0;
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
    if(!database || !database.gallery) return;
    
    container.innerHTML = database.gallery.map(item => `
        <div class="photo-item">
            <img src="${item.url}" alt="image">
            <p style="margin: 15px 0; font-size: 0.9rem;">${item.caption}</p>
            <a href="${item.url}" download style="color:var(--accent); text-decoration:none; font-weight:bold;">
                <i class="fas fa-download"></i> Download JPG
            </a>
        </div>
    `).join('');
}

function renderContact(filteredData = null) {
    const container = document.getElementById('contact-details');
    if(!database || !database.contacts) return;
    
    const dataToShow = filteredData || database.contacts;
    container.innerHTML = dataToShow.map(c => `
        <div class="photo-item" style="margin-bottom:15px; border-left: 4px solid var(--accent);">
            <p><strong><i class="fas fa-user"></i> Name:</strong> ${c.name}</p>
            <p><strong><i class="fas fa-map-marker-alt"></i> Address:</strong> ${c.address || 'N/A'}</p>
            <p><strong><i class="fas fa-phone"></i> Phone:</strong> <a href="tel:${c.number}" style="color:var(--accent);">${c.number}</a></p>
        </div>
    `).join('');
}

function searchContact() {
    const query = document.getElementById('contactSearch').value.toLowerCase();
    const filtered = database.contacts.filter(c => 
        c.name.toLowerCase().includes(query) || c.number.includes(query)
    );
    renderContact(filtered);
}
