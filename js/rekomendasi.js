const API_BASE = 'http://localhost:8080';

document.getElementById("formRekom").addEventListener("submit", async (e) => {
    e.preventDefault();

    const tanah = document.getElementById("tanah").value;
    const curah = document.getElementById("curah").value;
    const luas  = document.getElementById("luas").value;
    const hasilElem = document.getElementById("hasil");

    const token = localStorage.getItem("token"); // ambil token dari login

    try {
        const res = await fetch(`${API_BASE}/rekomendasi?tanah=${tanah}&curah=${curah}&luas=${luas}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText);
        }

        const data = await res.json();

        // Buat tabel hasil rekomendasi
        if (data.rekomendasi && data.rekomendasi.nama) {
            const bibit = data.rekomendasi;
            const kebutuhan = data.kebutuhan;

            const tableHTML = `
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nama Bibit</th>
                            <th>Kualitas</th>
                            <th>Kebutuhan (jumlah bibit)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${bibit.nama}</td>
                            <td>${bibit.kualitas}</td>
                            <td>${kebutuhan}</td>
                        </tr>
                    </tbody>
                </table>
            `;
            hasilElem.innerHTML = tableHTML;
        } else {
            hasilElem.textContent = `Tidak ada rekomendasi untuk tanah "${tanah}" dengan curah hujan ${curah} mm`;
        }

    } catch (err) {
        hasilElem.textContent = "Error: " + err;
    }
});
