document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();

            // จัดเก็บ token และ userId
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            alert("Login successful!");
            window.location.href = "home.html"; // ย้ายไปหน้า Home
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An unexpected error occurred. Please try again.");
    }
});
