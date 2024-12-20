document.addEventListener("DOMContentLoaded", () => {
    let currentSemester = 1;
    let totalSemesters = 0;
    let sgpaList = [];

    const homeScreen = document.getElementById("home-screen");
    const sgpaScreen = document.getElementById("sgpa-screen");
    const resultScreen = document.getElementById("result-screen");

    const startForm = document.getElementById("start-form");
    const sgpaForm = document.getElementById("sgpa-form");
    const subjectsContainer = document.getElementById("subjects-container");
    const resultDisplay = document.getElementById("cgpa-result");
    const currentSemesterDisplay = document.getElementById("current-semester");

    const restartButton = document.getElementById("restart-button");

    // Show SGPA Input Screen
    function showSgpaScreen() {
        homeScreen.classList.add("hidden");
        sgpaScreen.classList.remove("hidden");
        currentSemesterDisplay.textContent = currentSemester;
    }

    // Show Result Screen
    function showResultScreen() {
        sgpaScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");
    }

    // Restart the Application
    restartButton.addEventListener("click", () => {
        currentSemester = 1;
        totalSemesters = 0;
        sgpaList = [];
        resultScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");
    });

    // Start Button
    startForm.addEventListener("submit", (event) => {
        event.preventDefault();
        totalSemesters = parseInt(document.getElementById("semesters").value);

        if (isNaN(totalSemesters) || totalSemesters <= 0) {
            alert("Enter a valid number of semesters.");
            return;
        }

        showSgpaScreen();
    });

    // Generate Subject Fields
    document.getElementById("generate-subject-fields").addEventListener("click", () => {
        const numSubjects = parseInt(document.getElementById("subjects").value);

        if (isNaN(numSubjects) || numSubjects <= 0) {
            alert("Enter a valid number of subjects.");
            return;
        }

        // Clear previous fields
        subjectsContainer.innerHTML = "";

        for (let i = 1; i <= numSubjects; i++) {
            const subjectInput = document.createElement("div");
            subjectInput.classList.add("subject-input");

            subjectInput.innerHTML = `
                <label for="grade-${i}">Grade for Subject ${i} (0-10):</label>
                <input type="number" id="grade-${i}" min="0" max="10" placeholder="Enter grade" required>
            `;

            subjectsContainer.appendChild(subjectInput);
        }
    });

    // Submit SGPA
    sgpaForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const grades = [];
        const gradeInputs = subjectsContainer.querySelectorAll("input");

        gradeInputs.forEach((input) => {
            const grade = parseFloat(input.value);

            if (isNaN(grade) || grade < 0 || grade > 10) {
                alert("Enter valid grades between 0 and 10.");
                return;
            }

            grades.push(grade);
        });

        if (grades.length === gradeInputs.length) {
            const sgpa = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
            sgpaList.push(sgpa);

            if (currentSemester < totalSemesters) {
                currentSemester++;
                showSgpaScreen();
            } else {
                const cgpa = sgpaList.reduce((sum, sgpa) => sum + sgpa, 0) / sgpaList.length;
                resultDisplay.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
                showResultScreen();
            }
        }
    });
});
