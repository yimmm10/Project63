document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // ตรวจสอบว่า user login แล้วหรือไม่
    if (!token || !userId) {
        alert("Please log in to access this page.");
        window.location.href = "longin.html";
        return;
    }
});

document.getElementById("createProjectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // ดึงค่าจากฟอร์ม
    const projectName = document.getElementById("projectName").value.trim();
    const description = document.getElementById("description").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!projectName || !startDate || !endDate) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const response = await fetch('/api/auth/projects/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                projectName,
                description,
                startDate,
                endDate,
                userId,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Project created successfully! Project Code: ${data.project.code}`);
            window.location.href = "home.html";
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error("Error creating project:", err);
        alert("An unexpected error occurred. Please try again later.");
    }
});
import { checkLogin } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    checkLogin(); // ตรวจสอบการล็อกอิน
});

document.getElementById("createProjectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const projectName = document.getElementById("projectName").value.trim();
    const description = document.getElementById("description").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!projectName || !startDate || !endDate) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const response = await fetch('/api/auth/projects/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                projectName,
                description,
                startDate,
                endDate,
                userId,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Project created successfully! Project Code: ${data.project.code}`);
            window.location.href = "home.html";
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error("Error creating project:", err);
        alert("An unexpected error occurred. Please try again later.");
    }
});
