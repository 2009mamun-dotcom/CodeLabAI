let database = null;

// Transition to Login
function showLogin() {
    document.getElementById('access-trigger-section').style.display = 'none';
    const bg = document.getElementById('bg-image');
    if(bg) bg.classList.add('blur-bg');
    document.getElementById('login-section').style.display = 'flex';
}

// Login Authentication
async function checkLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "01885412300" && pass === "17648") {
        try {
            const res = await fetch('data.json');
            database = await res.json();
            
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
            console.log("Data Loaded Successfully", database);
        } catch (error) {
            alert("data.json ফাইলটি খুঁজে পাওয়া যায়নি!");
            console.error(error);
        }
    } else {
        alert("Access Denied! Check Credentials.");
    }
}

// Module Navigation
function showModule(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none'); // আগের ভিউগুলো হাইড করা
    document.getElementById(id).style.display = 'block';
    
    if(id === 'gallery-view') renderGallery();
    else if(id === 'contact-view') renderContact();
}

function goBack() {
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none');
    document.getElementById('dashboard').style.display = 'flex';
}

// Content Rendering
function renderGallery() {
    const container = document.getElementById('photo-gallery');
    if(!database || !database.gallery) return;
    
    container.innerHTML = "";
    database.gallery.forEach(item => {
        container.innerHTML += `
            <div class="photo-item" style="margin-bottom: 20px; border: 1px solid #333; padding: 10px;">
                <img src="${item.url}" alt="image" style="width:100%; border-radius:5px;">
                <p style="margin: 10px 0;">${item.caption}</p>
                <a href="${item.url}" download style="color:#00cec9; text-decoration:none;">Download .JPG</a>
            </div>`;
    });
}

function renderContact(filteredData = null) {
    const container = document.getElementById('contact-details');
    if(!database || !database.contacts) return;
    
    container.innerHTML = "";
    // যদি ফিল্টারড ডেটা না থাকে, তবে পুরো লিস্ট দেখাবে
    const dataToShow = filteredData || database.contacts;
    
    dataToShow.forEach(c => {
        container.innerHTML += `
            <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:10px; margin-top:15px; border-left: 4px solid #00cec9;">
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Address:</strong> ${c.address || 'Not Available'}</p>
                <p><strong>Phone:</strong> <a href="tel:${c.number}" style="color:#fff;">${c.number}</a></p>
            </div>`;
    });
}

// Search Function
function searchContact() {
    const query = document.getElementById('contactSearch').value.toLowerCase();
    if(!database || !database.contacts) return;

    const filtered = database.contacts.filter(c => 
        c.name.toLowerCase().includes(query) || c.number.includes(query)
    );

    if (filtered.length > 0) {
        renderContact(filtered);
    } else {
        document.getElementById('contact-details').innerHTML = "<p style='color:red; margin-top:20px;'>No Contact Found!</p>";
    }
}
