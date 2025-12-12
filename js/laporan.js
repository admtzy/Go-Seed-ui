async function loadLaporan() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan, login dulu!");

        const res = await fetch("http://localhost:8080/laporan", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!res.ok) throw new Error("Gagal fetch laporan");

        const data = await res.json();
        const tbody = document.querySelector("#laporanTable tbody");
        tbody.innerHTML = "";

        data.laporan.forEach(item => {
            const row = `
                <tr>
                    <td>${item.bibit_nama}</td>
                    <td>${item.tipe}</td>
                    <td>${item.jumlah}</td>
                    <td>${item.user_nama}</td>
                    <td>${item.created_at}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (err) {
        alert("Gagal memuat data: " + err);
    }
}

loadLaporan();
