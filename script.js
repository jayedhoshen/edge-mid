// ================= GLOBAL =================
let students = [];
let currentKey = "";
let currentPage = 1;
let perPage = 5;
let editIndex = null;

// ================= ADD STUDENT =================
const form = document.getElementById("studentForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let key = document.getElementById("key").value.trim();
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let course = document.getElementById("course").value.trim();

    let msg = document.getElementById("msg");

    if (!key || !id || !name || !email || !phone || !course) {
      msg.innerHTML = `<div class="alert alert-danger">All fields required ❌</div>`;
      return;
    }

    if (!email.includes("@")) {
      msg.innerHTML = `<div class="alert alert-warning">Invalid Email ⚠️</div>`;
      return;
    }

    let student = { id, name, email, phone, course };

    let existing = localStorage.getItem(key);
    let data = existing ? JSON.parse(existing) : [];

    let exists = data.some((s) => s.id === id);
    if (exists) {
      msg.innerHTML = `<div class="alert alert-danger">Student ID already exists ❌</div>`;
      return;
    }

    data.push(student);
    localStorage.setItem(key, JSON.stringify(data));

    msg.innerHTML = `<div class="alert alert-success">Student Added Successfully ✅</div>`;

    form.reset();
    document.getElementById("key").focus();
  });
}

// ================= LOAD STUDENTS =================
function loadStudents() {
  currentKey = document.getElementById("viewKey").value.trim();

  if (!currentKey) {
    alert("Please enter a key ⚠️");
    return;
  }

  let data = localStorage.getItem(currentKey);

  if (!data) {
    alert("No data found ❌");
    return;
  }

  students = JSON.parse(data);
  currentPage = 1;
  renderTable(students);
}

// ================= RENDER TABLE =================
function renderTable(data = students) {
  let table = document.getElementById("tableBody");
  table.innerHTML = "";

  let start = (currentPage - 1) * perPage;
  let pageData = data.slice(start, start + perPage);

  pageData.forEach((s, i) => {
    let realIndex = students.indexOf(s);

    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>
          <button onclick="openEdit(${realIndex})" class="btn btn-primary btn-sm">Edit</button>
          <button onclick="deleteStudent(${realIndex})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  });

  renderPagination(data);
}

// ================= PAGINATION =================
function renderPagination(data = students) {
  let totalPages = Math.ceil(data.length / perPage);
  let container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    container.innerHTML += `
      <button onclick="goPage(${i})" class="btn btn-sm btn-secondary me-1">${i}</button>
    `;
  }
}

function goPage(page) {
  currentPage = page;
  renderTable();
}

// ================= DELETE =================
function deleteStudent(i) {
  if (!confirm("Are you sure to delete?")) return;

  students.splice(i, 1);
  localStorage.setItem(currentKey, JSON.stringify(students));

  renderTable();
}

// ================= EDIT =================
function openEdit(i) {
  editIndex = i;

  document.getElementById("editName").value = students[i].name;
  document.getElementById("editEmail").value = students[i].email;

  let modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

function saveEdit() {
  students[editIndex].name = document.getElementById("editName").value;
  students[editIndex].email = document.getElementById("editEmail").value;

  localStorage.setItem(currentKey, JSON.stringify(students));

  renderTable();
}

// ================= SEARCH =================
function searchStudent() {
  let keyword = document.getElementById("search").value.toLowerCase();

  let filtered = students.filter((s) => s.name.toLowerCase().includes(keyword));

  currentPage = 1;
  renderTable(filtered);
}
