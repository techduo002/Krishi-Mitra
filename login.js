document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password correctly.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("manoveda_users")) || [];
  const existingUser = users.find(user => user.email === email);

  if (!existingUser) {
    users.push({ email, password });
    localStorage.setItem("manoveda_users", JSON.stringify(users));
    localStorage.setItem("manoveda_current", JSON.stringify({ email }));
    alert("Welcome, new user! 🌸");
  } else {
    localStorage.setItem("manoveda_current", JSON.stringify(existingUser));
    alert("Welcome back, " + existingUser.email + "!");
  }

  window.location.href = "index.html";
});
