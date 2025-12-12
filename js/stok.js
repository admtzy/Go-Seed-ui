const API_BASE = 'http://localhost:8080';
const token = localStorage.getItem('token');
const bibitSelect = document.getElementById('bibitSelect');
const msgDiv = document.getElementById('msg');

// Fungsi menampilkan pesan
function showMsg(text, isError=false){
    msgDiv.textContent = text;
    msgDiv.classList.remove('hidden');
    msgDiv.classList.toggle('text-red-600', isError);
    msgDiv.classList.toggle('text-green-600', !isError);
    setTimeout(()=> msgDiv.classList.add('hidden'), 4000);
}

// Load semua bibit dari API dan masukkan ke select
async function loadBibit() {
    try {
        const res = await fetch(`${API_BASE}/bibit`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        const list = data.data || data; // fallback
        bibitSelect.innerHTML = '<option value="" disabled selected>-- Pilih Bibit --</option>';
        list.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = `${b.nama} (Stok: ${b.stok})`;
            bibitSelect.appendChild(opt);
        });
    } catch(err) {
        console.error(err);
        bibitSelect.innerHTML = '<option value="">Gagal memuat bibit</option>';
        showMsg('Gagal memuat daftar bibit.', true);
    }
}

// Submit form update stok
document.getElementById('stokForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = parseInt(bibitSelect.value);
    const delta = parseInt(document.getElementById('delta').value);

    if(!id || isNaN(delta)){
        showMsg('Pilih bibit dan masukkan jumlah valid.', true);
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/stok/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ delta })
        });
        const result = await res.json();
        showMsg(`${result.message}, stok baru: ${result.stok}`, false);
        document.getElementById('stokForm').reset();
        loadBibit(); // refresh dropdown
    } catch(err){
        console.error(err);
        showMsg('Gagal update stok.', true);
    }
});

// Load bibit saat halaman dibuka
loadBibit();