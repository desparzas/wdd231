
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

    function displayCourses(coursesToDisplay) {
        courseGrid.innerHTML = '';
        coursesToDisplay.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course-card');
            if (course.completed) courseElement.classList.add('completed');
            courseElement.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
            `;
            courseGrid.appendChild(courseElement);
        });
    }

    function updateTotalCredits(coursesToCount) {
        const totalCredits = coursesToCount.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }
    
    function filterCourses(filter = 'all') {
        const filteredCourses = courses.filter(course => {
            if (filter === 'all') return true;
            return course.code.startsWith(filter);
        });

        displayCourses(filteredCourses);
        updateTotalCredits(filteredCourses);
    }

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const filterButtons = document.getElementById('filter-buttons');
    const courseGrid = document.getElementById('course-grid');
    const totalCreditsElement = document.getElementById('total-credits');
    const currentYearElement = document.getElementById('current-year');
    const lastModifiedElement = document.getElementById('last-modified');

    const courses = [
        { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
        { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
        { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
        { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
        { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
        { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: true },
        { code: "ITM 111", name: "Introduction to Databases", credits: 3, completed: true },
        { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: false },
    ];

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    filterButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            filterCourses(e.target.dataset.filter);
        }
    });
    filterCourses();
});

filterCourses();