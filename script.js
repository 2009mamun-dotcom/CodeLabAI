const USERNAME = "01885412300";
const PASSWORD = "17648";

function checkLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (u === USERNAME && p === PASSWORD) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        fetchData();
    } else {
        alert("Incorrect login details!");
    }
}

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Gallery Load
        const gallery = document.getElementById('photo-gallery');
        data.gallery.forEach(item => {
            gallery.innerHTML += `
                <div class="photo-card">
                    <img src="${item.url}" alt="photo">
                    <div style="padding:15px">
                        <p>${item.caption}</p>
                        <a href="${item.url}" download style="color:#00cec9; text-decoration:none; font-size:14px">Download File</a>
                    </div>
                </div>
            `;
        });

        // Contact Load
        const contact = document.getElementById('contact-details');
        contact.innerHTML = `
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${data.contact.name}</p>
            <p><strong>Address:</strong> ${data.contact.address}</p>
            <p><strong>Phone:</strong> ${data.contact.number}</p>
        `;
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}
// Agere motoi thakbe, sudhu search function-ti niche add hobe
let allContacts = []; // Data store korar jonno

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allContacts = [data.contact]; // JSON theke contact nilam
        
        displayContacts(allContacts); // Initial display
        loadGallery(data.gallery);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Contact dekhano function
function displayContacts(contacts) {
    const container = document.getElementById('contact-details');
    container.innerHTML = ""; 

    contacts.forEach(c => {
        container.innerHTML += `
            <div class="contact-card" style="padding:15px; background:rgba(255,255,255,0.05); border-radius:10px; margin-bottom:10px;">
                <p><strong>Name:</strong> ${c.name}</p>
                <p><strong>Address:</strong> ${c.address}</p>
                <p><strong>Phone:</strong> ${c.number}</p>
            </div>
        `;
    });
}

// Search Logic
function searchContact() {
    const query = document.getElementById('contactSearch').value.toLowerCase();
    
    const filtered = allContacts.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.number.includes(query) ||
        c.address.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
        displayContacts(filtered);
    } else {
        document.getElementById('contact-details').innerHTML = "<p>No contact found!</p>";
    }
}
