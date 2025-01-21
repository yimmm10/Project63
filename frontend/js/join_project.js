document.getElementById("joinProjectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const projectCode = document.getElementById("projectCode").value;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const response = await fetch('/api/auth/projects/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectCode, userId }),
    });

    if (response.ok) {
        alert("Successfully joined the project!");
        window.location.href = "home.html";
    } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
    }
});

import { checkLogin } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    checkLogin(); // ตรวจสอบการล็อกอิน
});

document.getElementById("joinProjectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const projectCode = document.getElementById("projectCode").value.trim();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!projectCode) {
        alert("Please enter a valid project code.");
        return;
    }

    try {
        const response = await fetch('/api/auth/projects/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ projectCode, userId }),
        });

        if (response.ok) {
            alert("Successfully joined the project!");
            window.location.href = "home.html";
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error("Error joining project:", err);
        alert("An unexpected error occurred. Please try again later.");
    }
});
