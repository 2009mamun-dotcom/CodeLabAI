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
