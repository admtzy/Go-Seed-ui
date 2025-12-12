document.getElementById("regBtn").addEventListener("click", register);

async function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.text();
    const msg = document.getElementById("msg");

    if (!res.ok) {
        msg.style.color = "red";
        msg.innerText = data;
        return;
    }

    msg.style.color = "green";
    msg.innerText = "Registrasi berhasil!";

    // Redirect otomatis ke login
    setTimeout(() => {
        window.location.href = "../login.html";
    }, 1200);
}

