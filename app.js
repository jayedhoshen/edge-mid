let students = [];
let currentKey = "";
let currentPage = 1;
let perPage = 5;
let editIndex = null;

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
      msg.innerHTML = `
            <div class="alert alert-danger">All fields required</div>
        `;
      return;
    }

    if (!email.includes("@")) {
      msg.innerHTML = `
        <div class="alert alert-warning">Invalid Email</div>
        `;
      return;
    }

    let student = { id, name, email, phone, course };
  });
}
