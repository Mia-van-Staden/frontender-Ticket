document.addEventListener("DOMContentLoaded", function() {
    // Upload Image Logic
    const uploadBox = document.getElementById("upload-box");
    const imageInput = document.getElementById("image-input");
    const imagePreview = document.getElementById("image-preview");

    if (uploadBox && imageInput && imagePreview) {
        uploadBox.addEventListener("click", () => imageInput.click());

        imageInput.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                    
                    // Store the base64 encoded image
                    localStorage.setItem("ticketImage", e.target.result);
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Generate Button Logic
    const generateButton = document.getElementById("generate-ticket");
    
    if (generateButton) {
        generateButton.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent page reload
            
            // Store form data
            localStorage.setItem("fullName", document.getElementById("full-name").value);
            localStorage.setItem("email", document.getElementById("email").value);
            localStorage.setItem("githubUsername", document.getElementById("github-username").value);
            
            // Navigate to ticket.html
            window.location.href = "ticket.html";
        });
    }

    // Ticket Display Logics
    if (document.getElementById("ticket-name")) {
        const fullName = localStorage.getItem("fullName");
        const email = localStorage.getItem("email");
        const githubUsername = localStorage.getItem("githubUsername");
        const ticketImage = localStorage.getItem("ticketImage");

        // Update ticket content
        document.getElementById("ticket-name").textContent = `Congratulations, ${fullName}!`;
        document.getElementById("ticket-email").textContent = email;
        document.getElementById("ticket-username").textContent = fullName;
        document.getElementById("ticket-github").textContent = `@${githubUsername}`;

        // Set ticket image with fallback
        const ticketImageElement = document.getElementById("ticket-image");
        if (ticketImage) {
            ticketImageElement.src = ticketImage;
        } else {
            ticketImageElement.src = "assets/images/image-avatar.jpg";
        }
    }
});

  