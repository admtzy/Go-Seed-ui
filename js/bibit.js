const API_BASE = 'http://localhost:8080';

// Render data bibit ke tabel
function renderBibit(listData) {
    const tbody = document.getElementById('bibitList');
    tbody.innerHTML = '';

    if (!listData || listData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500 bg-gray-50">Belum ada data bibit.</td></tr>`;
        return;
    }

    listData.forEach(b => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-yellow-50 transition duration-150';
        tr.innerHTML = `
            <td class="px-6 py-4">${b.id ?? '-'}</td>
            <td class="px-6 py-4">${b.nama ?? '-'}</td>
            <td class="px-6 py-4">${b.kualitas ?? '-'}</td>
            <td class="px-6 py-4 text-right font-extrabold text-green-600">${b.stok ?? '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Load data bibit dari API
async function loadBibit() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/bibit`, {
        headers: { 'Authorization': 'Bearer ' + token }
    });

    let data;
    try { data = await res.json(); } 
    catch (err) { alert("Gagal memuat bibit: " + await res.text()); return; }

    renderBibit(data.data || data); // fallback kalau API langsung array
}

// Tambah bibit baru
document.getElementById('bibitForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nama: document.getElementById('nama').value,
        kualitas: document.getElementById('kualitas').value,
        stok: parseInt(document.getElementById('stok').value),
        tanah: document.getElementById('tanah').value,
        curah_hujan: parseInt(document.getElementById('curah').value)
    };

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/bibit`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });

    let result;
    try { result = await res.json(); } 
    catch (err) { alert("Error: " + await res.text()); return; }

    alert(result.message);

    // Setelah berhasil tambah, reload tabel dari server
    await loadBibit();

    document.getElementById('bibitForm').reset();
});

// Load awal
loadBibit();
