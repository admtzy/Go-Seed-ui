const API_BASE = 'http://localhost:8080';

document.getElementById('loadUsers').addEventListener('click', async () => {
  try {
    const token = localStorage.getItem('token'); // ambil token dari login
    const res = await fetch(`${API_BASE}/users`, {
      headers: {
        'Authorization': `Bearer ${token}` // kirim token
      }
    });

    if (!res.ok) {
      const text = await res.text();
      alert(`Error: ${text}`);
      return;
    }

    const users = await res.json();
    const tbody = document.getElementById('userList');
    tbody.innerHTML = ''; // kosongkan tabel

    if (!users || users.length === 0) {
      tbody.innerHTML = `<tr>
        <td colspan="3" class="px-6 py-6 text-center text-gray-500">Tidak ada data pengguna.</td>
      </tr>`;
      return;
    }

    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50 transition duration-150';
      tr.innerHTML = `
        <td class="px-6 py-4 font-mono text-sm text-gray-700">${u.username || '-'}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${u.role || '-'}</td>
        <td class="px-6 py-4 text-sm text-gray-500">${u.createdAt || '-'}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
    alert('Gagal load users');
  }
});
