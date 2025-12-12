document.getElementById("loginBtn").addEventListener("click", login);

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    try {
        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const json = await res.json();

        if (!res.ok) {
            msg.style.color = "red";
            msg.innerText = json.message || "Login gagal!";
            return;
        }

        if (!json.user) {
            msg.style.color = "red";
            msg.innerText = "Login gagal: user tidak ditemukan!";
            return;
        }

        localStorage.setItem("token", json.token);
        msg.style.color = "green";
        msg.innerText = `Login sukses! User ID: ${json.user.id}`;

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);

    } catch (err) {
        msg.style.color = "red";
        msg.innerText = "Terjadi error: " + err;
    }
}
