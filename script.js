async function generateWebsite() {
    const prompt = document.getElementById("prompt").value;
    const fileInput = document.getElementById("imageInput");
    const resultEl = document.getElementById("result");
    resultEl.textContent = "Generating...";

    try {
        let formData = new FormData();
        formData.append("prompt", prompt);
        if (fileInput.files.length > 0) {
            formData.append("image", fileInput.files[0]);
        }

        const res = await fetch("/generate", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        resultEl.textContent = data.code;
    } catch (err) {
        resultEl.textContent = "Error: " + err.message;
    }
}
