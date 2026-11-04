const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll('[role="tabpanel"]');

navItems.forEach(item => {
    item.addEventListener("click", () => {
        // Remove active state from every tab
        navItems.forEach(tab => {
            tab.classList.remove("active");
            tab.setAttribute("aria-selected", "false");
            tab.setAttribute("tabindex", "-1");
        });

        // Activate the clicked tab
        item.classList.add("active");
        item.setAttribute("aria-selected", "true");
        item.setAttribute("tabindex", "0");

        // Show the corresponding content
        const targetId = item.getAttribute("aria-controls");

        panels.forEach(panel => {
            panel.hidden = panel.id !== targetId;
        });
    });
});

// Set initial keyboard focus behavior
navItems.forEach((item, index) => {
    item.setAttribute("tabindex", index === 0 ? "0" : "-1");
});