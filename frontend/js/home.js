document.addEventListener("DOMContentLoaded", async () => {
    const projectList = document.getElementById("projectList");

    try {
        // เรียก API เพื่อนำข้อมูลโปรเจกต์ (ไม่ต้องใช้ token)
        const response = await fetch('/api/auth/me');

        if (response.ok) {
            const user = await response.json();

            // แสดงโปรเจกต์ในหน้า
            if (user.projects.length === 0) {
                projectList.innerHTML = "<p>No projects found. Create or join one!</p>";
            } else {
                user.projects.forEach(project => {
                    const projectItem = document.createElement("div");
                    projectItem.className = "project-item";
                    projectItem.innerHTML = `
                        <h3>${project.projectName}</h3>
                        <p>${project.description || "No description available."}</p>
                        <p><strong>Deadline:</strong> ${new Date(project.endDate).toLocaleDateString()}</p>
                    `;
                    projectList.appendChild(projectItem);
                });
            }
        } else {
            projectList.innerHTML = "<p>Error loading projects. Please try again later.</p>";
        }
    } catch (err) {
        console.error("Error loading projects:", err);
        projectList.innerHTML = "<p>An unexpected error occurred. Please try again later.</p>";
    }

    // ปุ่มสร้างโปรเจกต์
    document.getElementById("createProjectBtn").addEventListener("click", () => {
        window.location.href = "create_project.html";
    });

    // ปุ่มเข้าร่วมโปรเจกต์
    document.getElementById("joinProjectBtn").addEventListener("click", () => {
        window.location.href = "join_project.html";
    });

    // ปุ่มออกจากระบบ (ไม่ต้องล้าง token หรือข้อมูล)
    document.getElementById("logoutBtn").addEventListener("click", () => {
        alert("You have been logged out.");
        window.location.href = "longin.html";
    });
});
