console.log("JavaScript connected");

let courses = [];

// Load from localStorage
const savedCourses = localStorage.getItem("courses");
if (savedCourses) {
    courses = JSON.parse(savedCourses);
}

const form = document.getElementById("course-form");
const nameInput = document.getElementById("course-name");
const gradeInput = document.getElementById("course-grade");
const creditsInput = document.getElementById("course-credits");
const yearInput = document.getElementById("course-year");

const courseList = document.getElementById("course-list");
const gpaElement = document.getElementById("gpa");
const yearlyContainer = document.getElementById("yearly-gpa");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const course = {
        name: nameInput.value,
        grade: Number(gradeInput.value),
        credits: Number(creditsInput.value),
        year: Number(yearInput.value)
    };

    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
    form.reset();
    renderCourses();
});

function renderCourses() {
    courseList.innerHTML = "";

    courses.forEach((course, index) => {
        const li = document.createElement("li");
        li.textContent = `${course.name} (Year ${course.year}) — Grade: ${course.grade}, Credits: ${course.credits}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            renderCourses();
        };

        li.appendChild(deleteBtn);
        courseList.appendChild(li);
    });

    calculateGPA();
}

function calculateGPA() {
    let totalCredits = 0;
    let totalWeighted = 0;

    const yearlyData = {};

    courses.forEach(course => {
        totalCredits += course.credits;
        totalWeighted += course.grade * course.credits;

        if (!yearlyData[course.year]) {
            yearlyData[course.year] = { credits: 0, weighted: 0 };
        }

        yearlyData[course.year].credits += course.credits;
        yearlyData[course.year].weighted += course.grade * course.credits;
    });

    const overallGPA = totalCredits === 0 ? 0 : (totalWeighted / totalCredits).toFixed(2);
    gpaElement.textContent = overallGPA;

    yearlyContainer.innerHTML = "<h3>Year-wise GPA</h3>";
    for (let year in yearlyData) {
        const gpa = (yearlyData[year].weighted / yearlyData[year].credits).toFixed(2);
        const p = document.createElement("p");
        p.textContent = `Year ${year}: ${gpa}`;
        yearlyContainer.appendChild(p);
    }
}

// Initial render
renderCourses();
