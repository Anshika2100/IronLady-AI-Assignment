let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course").value;
    const status = document.getElementById("status").value;

    if (!name || !email || !course) {
        alert("Please fill all fields");
        return;
    }

    students.push({ name, email, course, status });
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    clearForm();
}

function displayStudents() {
    const tableBody = document.getElementById("studentTable");
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="New" ${student.status === "New" ? "selected" : ""}>New</option>
                    <option value="Contacted" ${student.status === "Contacted" ? "selected" : ""}>Contacted</option>
                    <option value="Enrolled" ${student.status === "Enrolled" ? "selected" : ""}>Enrolled</option>
                </select>
            </td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function updateStatus(index, value) {
    students[index].status = value;
    localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}

displayStudents();