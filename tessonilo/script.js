// Konfigurasi Tailwind untuk warna dan font kustom
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-green': '#1b742e', // Hijau Konservasi Lebih Gelap
                'secondary-yellow': '#ffb300', // Kuning Aksen
                'bg-light': '#f0fdf4', // Light Green Background
                'text-dark': '#1f2937',
                'accent-blue': '#3b82f6',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
};

// --- 1. SETUP & DATA SIMULASI ---
const STORAGE_KEY_INFO = 'tessoNiloInfoData';
const STORAGE_KEY_RESERVASI = 'tessoNiloReservasiData';
const IS_LOGGED_IN = sessionStorage.getItem('isLoggedIn') === 'true';

// Data Informasi Publik (Berita/Laporan) - DATA LENGKAP
let infoData = JSON.parse(localStorage.getItem(STORAGE_KEY_INFO)) || [
    { id: 1, title: 'Laporan Konservasi Gajah', category: 'Konservasi', date: '2025-05-10', content: 'Populasi Gajah Sumatera terpantau stabil di zona inti. Upaya mitigasi konflik dengan masyarakat berjalan efektif.' },
    { id: 2, title: 'Studi Keragaman Flora Hutan Rawa', category: 'Riset', date: '2025-04-20', content: 'Ditemukan dua spesies Anggrek baru di area blok selatan yang memerlukan perlindungan segera.' },
    { id: 3, title: 'Pengembangan Jalur Ekowisata Sepeda', category: 'Ekowisata', date: '2025-06-01', content: 'Pembukaan jalur baru sepanjang 15 km untuk wisata sepeda yang ramah lingkungan di zona penyangga. Tiket dapat dipesan melalui laman reservasi.' },
    { id: 4, title: 'Penemuan Jaring Perangkap Ilegal', category: 'Konservasi', date: '2025-05-28', content: 'Tim Patroli berhasil menyita puluhan jaring perangkap satwa liar di area rawan perburuan. Tindak lanjut hukum sedang diproses.' },
    { id: 5, title: 'Workshop Pengenalan Keanekaragaman Hayati', category: 'Lainnya', date: '2025-06-15', content: 'Diadakan workshop kolaborasi dengan universitas setempat untuk meningkatkan kesadaran publik terhadap ekosistem Tesso Nilo.' },
    { id: 6, title: 'Perkiraan Musim Migrasi Burung', category: 'Riset', date: '2025-04-05', content: 'Analisis data menunjukkan peningkatan signifikan pada spesies burung migran yang melintasi kawasan pada bulan April, memerlukan pemantauan ketat.' },
];
let nextInfoId = infoData.length > 0 ? Math.max(...infoData.map(d => d.id)) + 1 : 1;

function saveInfoData() {
    localStorage.setItem(STORAGE_KEY_INFO, JSON.stringify(infoData));
}

// Data Reservasi (Simulasi Data Pengunjung)
let reservasiData = JSON.parse(localStorage.getItem(STORAGE_KEY_RESERVASI)) || [
    { id: 101, name: 'Budi Santoso', date: '2025-06-10', tickets: 4, status: 'Confirmed' },
    { id: 102, name: 'Siti Aisyah', date: '2025-07-01', tickets: 2, status: 'Pending' },
];
let nextReservasiId = reservasiData.length > 0 ? Math.max(...reservasiData.map(d => d.id)) + 1 : 101;

function saveReservasiData() {
    localStorage.setItem(STORAGE_KEY_RESERVASI, JSON.stringify(reservasiData));
}

// --- 2. LOGIKA UTAMA: HEADER & ROUTING (MPA) ---

function getHeader(isLoggedIn) {
    // Navigasi Publik Sekarang Menggunakan Link Langsung ke File HTML
    const publicNav = `
        <a href="index.html" class="text-text-dark hover:text-primary-green font-medium transition duration-150">Home Publik</a>
        <a href="berita.html" class="text-text-dark hover:text-primary-green font-medium transition duration-150">Berita & Laporan</a>
        <a href="about.html" class="text-text-dark hover:text-primary-green font-medium transition duration-150">Tentang</a>
        <a href="fauna.html" class="text-text-dark hover:text-primary-green font-medium transition duration-150">Satwa Kunci</a>
    `;

    // Wrapper Navigasi Utama, menggunakan kelas sticky dan shadow
    return `
        <nav class="sticky top-0 z-50 bg-white shadow-lg/50 backdrop-blur-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <span data-lucide="leaf" class="w-6 h-6 text-primary-green mr-2"></span>
                        <a href="index.html" class="text-xl font-extrabold text-primary-green tracking-wide">Tesso Nilo Project</a>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        ${publicNav}
                        ${isLoggedIn ? `
                            <a href="index.html#admin/dashboard" class="text-accent-blue hover:text-blue-700 font-medium transition duration-150">Menu Admin</a>
                            <a href="#" onclick="logout()" class="text-secondary-yellow hover:text-yellow-600 font-medium transition duration-150 flex items-center">
                                <span data-lucide="log-out" class="w-4 h-4 mr-1"></span> Logout
                            </a>
                        ` : `
                            <a href="login.html" class="text-primary-green hover:text-green-700 font-medium transition duration-150">Login</a>
                            <a href="register.html" class="bg-secondary-yellow text-text-dark px-3 py-1 rounded-full font-medium hover:bg-yellow-600 transition duration-150">Daftar</a>
                        `}
                    </div>
                    <div class="md:hidden">
                        <button class="p-2 text-gray-700 hover:text-primary-green transition duration-150" onclick="alert('Menu Mobile Demo')">
                            <span data-lucide="menu" class="w-6 h-6"></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

// Fungsi untuk menangani Header di halaman MPA (semua file HTML kecuali index.html)
function handleHybridHeader(isLoggedIn) {
    const headerPlaceholder = document.getElementById('mainHeader');
    if (headerPlaceholder) {
        // Ganti konten placeholder dengan Header Navigasi
        headerPlaceholder.innerHTML = getHeader(isLoggedIn);
        lucide.createIcons();
    }
}

// --- 3. LOGIKA FORMULIR DAN OTENTIKASI ---

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    const VALID_USER = 'admin';
    const VALID_PASS = '12345';

    if (username === VALID_USER && password === VALID_PASS) {
        sessionStorage.setItem('isLoggedIn', 'true');
        // Arahkan ke Admin Dashboard di index.html
        window.location.href = 'index.html#admin/dashboard'; 
    } else {
        errorMessage.classList.remove('hidden');
    }
}

function handleRegistration(event) {
    event.preventDefault();
    const message = document.getElementById('registerMessage');
    
    message.classList.remove('hidden', 'text-red-500');
    message.classList.add('text-primary-green');
    message.textContent = 'Registrasi Berhasil! Silakan masuk dengan akun Anda.';
    
    setTimeout(() => {
        // Setelah registrasi, arahkan ke login.html
        window.location.href = 'login.html';
    }, 2000);
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// --- 4. LOGIKA ROUTING FRAGMENT & RENDERING KONTEN ---

let currentAdminSubMenu = 'dashboard';

// Fungsi utama untuk menangani konten dinamis di halaman MPA
function handleRouting() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const appContainer = document.getElementById('app');
    const hash = window.location.hash.slice(1); // Ambil hash tanpa '#'

    if (!appContainer) return; // Hanya jalankan jika ada container #app

    let htmlContent = '';
    const parts = hash.split('/');
    const view = parts[0];
    const subView = parts[1];
    const dataId = parts[2] ? parseInt(parts[2]) : null;

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // === LOGIKA INDEX.HTML (Home Publik / Admin Dashboard) ===
        if (view === 'admin' && isLoggedIn) {
             // Admin Dashboard
            currentAdminSubMenu = subView || 'dashboard';
            htmlContent = renderAdminLayout(subView);
        } else if (view === 'admin' && !isLoggedIn) {
            // Coba akses Admin tanpa login -> Redirect ke login
             window.location.href = 'login.html';
            return;
        } else {
            // Home Publik (Default)
            htmlContent = renderPublicHomeView(isLoggedIn);
        }
    } else if (window.location.pathname.endsWith('berita.html')) {
        // === LOGIKA BERITA.HTML (Daftar / Detail Berita) ===
        if (view === 'detail' && dataId !== null) {
            htmlContent = renderDetailView(dataId, isLoggedIn);
        } else {
            // Daftar Berita (Default)
            htmlContent = renderBeritaListView(isLoggedIn);
        }
    }
    // Halaman MPA lain (about.html, fauna.html, login.html, register.html) statis

    appContainer.innerHTML = htmlContent;
    lucide.createIcons();
    attachEventListeners(view, subView);
}

// --- 5. EVENT LISTENERS DINAMIS ---
function attachEventListeners(view, subView) {
    // Event listeners untuk form Admin (hanya di index.html)
    if (view === 'admin') {
        if (subView === 'manage_info') {
            const infoForm = document.getElementById('infoForm');
            if (infoForm) infoForm.addEventListener('submit', handleInfoSubmit);
        } else if (subView === 'manage_reservasi') {
            const reservasiForm = document.getElementById('reservasiForm');
            if (reservasiForm) reservasiForm.addEventListener('submit', handleReservasiSubmit);
        }
    }
}

// --- 6. FUNGSI RENDERING TAMPILAN PUBLIK ---

function renderPublicHomeView(isLoggedIn) {
    const heroContent = `
        <header class="hero-bg h-[60vh] flex items-center justify-center text-center">
            <div class="px-4 py-16 text-white max-w-4xl">
                <h1 class="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                    Konservasi Gajah di Jantung Sumatera
                </h1>
                <p class="text-xl md:text-2xl mb-8 font-light tracking-wide">
                    Taman Nasional Tesso Nilo: Melindungi Keanekaragaman Hayati.
                </p>
                <a href="about.html" class="bg-secondary-yellow text-text-dark font-bold px-8 py-3 rounded-full hover:bg-yellow-600 transition duration-300 shadow-xl inline-flex items-center">
                    Tentang Tesso Nilo
                    <span data-lucide="info" class="ml-2 w-5 h-5"></span>
                </a>
            </div>
        </header>
        <section id="informasi-ringkas" class="py-20 bg-bg-light">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center text-primary-green mb-12">Informasi Ringkas</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${infoData.slice(0, 3).map((item, index) => {
                        const imageIndex = (index % 4) + 1;
                        let imageClass = `card-img-${imageIndex}`; 

                        return `
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:translate-y-[-5px]">
                                <div class="${imageClass} h-48 bg-cover bg-center rounded-t-xl"></div>
                                <div class="p-6">
                                    <h3 class="text-2xl font-semibold text-text-dark mb-3 truncate">${item.title}</h3>
                                    <div class="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                                        <span class="flex items-center"><span data-lucide="tag" class="w-4 h-4 mr-1"></span> ${item.category}</span>
                                    </div>
                                    <p class="text-gray-600 line-clamp-3 mb-4">${item.content}</p>
                                    <a href="berita.html#detail/${item.id}" class="inline-flex items-center text-accent-blue hover:text-blue-700 font-medium">
                                        Baca Selengkapnya <span data-lucide="arrow-right" class="ml-2 w-4 h-4"></span>
                                    </a>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="text-center mt-10">
                    <a href="berita.html" class="inline-flex items-center bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md">
                        Lihat Semua Laporan
                        <span data-lucide="external-link" class="ml-2 w-4 h-4"></span>
                    </a>
                </div>
            </div>
        </section>
    `;

    return getHeader(isLoggedIn) + heroContent;
}

function renderBeritaListView(isLoggedIn) {
    const listItems = infoData.map((item, index) => {
        const imageIndex = (index % 4) + 1;
        let imageClass = `card-img-${imageIndex}`; 

        return `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:translate-y-[-3px] flex flex-col md:flex-row overflow-hidden">
                <div class="${imageClass} h-40 md:h-auto md:w-56 flex-shrink-0 bg-cover bg-center"></div>
                <div class="p-6 flex-1">
                    <span class="inline-block bg-secondary-yellow text-text-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">${item.category}</span>
                    <h3 class="text-2xl font-semibold text-text-dark mb-3">${item.title}</h3>
                    <p class="text-sm text-gray-500 mb-4 flex items-center">
                        <span data-lucide="calendar" class="w-4 h-4 mr-1"></span> ${item.date}
                    </p>
                    <p class="text-gray-600 line-clamp-2 mb-4">${item.content}</p>
                    <a href="#detail/${item.id}" class="inline-flex items-center text-accent-blue hover:text-blue-700 font-medium">
                        Baca Selengkapnya <span data-lucide="arrow-right" class="ml-2 w-4 h-4"></span>
                    </a>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-center text-primary-green mb-12 border-b pb-4">Semua Berita & Laporan</h1>
            <div class="space-y-6">
                ${listItems.length > 0 ? listItems : '<p class="text-center text-gray-500 py-10">Belum ada informasi yang tersedia.</p>'}
            </div>
        </div>
    `;
}


function renderDetailView(id, isLoggedIn) {
    const item = infoData.find(d => d.id === id);
    
    if (!item) {
        return `
            <div class="max-w-4xl mx-auto p-8 text-center bg-white rounded-xl shadow-xl">
                <h1 class="text-4xl font-bold text-red-500 mt-6">Informasi Tidak Ditemukan</h1>
                <p class="text-lg mt-4">Data dengan ID ${id} tidak ada atau telah dihapus.</p>
                <a href="berita.html" class="mt-6 inline-block bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">Kembali ke Daftar Berita</a>
            </div>
        `;
    }

    return `
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="berita.html" class="text-gray-500 hover:text-primary-green mb-6 flex items-center">
                <span data-lucide="arrow-left" class="w-5 h-5 mr-2"></span> Kembali ke Daftar Berita
            </a>
            
            <div class="bg-white p-8 rounded-xl shadow-xl">
                <span class="inline-block bg-secondary-yellow text-text-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">${item.category}</span>
                <h1 class="text-4xl font-extrabold text-text-dark mb-4">${item.title}</h1>
                <p class="text-sm text-gray-500 mb-8 flex items-center">
                    <span data-lucide="calendar" class="w-4 h-4 mr-1"></span> Tanggal Publikasi: ${item.date}
                </p>
                
                <div class="prose max-w-none text-lg text-gray-700 leading-relaxed border-t pt-6">
                    <p>${item.content}</p>
                    <p class="mt-8 italic text-gray-600">
                        Informasi ini merupakan bagian dari upaya transparansi dan edukasi publik Taman Nasional Tesso Nilo.
                    </p>
                </div>
            </div>
        </div>
    `;
}


// --- 7. FUNGSI RENDERING TAMPILAN ADMIN ---

function renderAdminLayout(subView) {
    const adminContent = getAdminContent(subView);
    return `
        ${getHeader(true)}
        <div class="view-content flex flex-col md:flex-row">
            <div class="md:w-64 bg-white shadow-lg p-4 md:h-screen sticky top-[72px]">
                <h3 class="text-lg font-bold text-primary-green mb-4 border-b pb-2">Panel Admin</h3>
                <nav class="space-y-2">
                    <a href="#admin/dashboard" onclick="window.location.hash='admin/dashboard';" class="flex items-center p-3 rounded-lg hover:bg-green-100 transition ${subView === 'dashboard' || !subView ? 'active-menu' : ''}">
                        <span data-lucide="layout-dashboard" class="w-5 h-5 mr-3"></span> Dashboard
                    </a>
                    <a href="#admin/manage_info" onclick="window.location.hash='admin/manage_info';" class="flex items-center p-3 rounded-lg hover:bg-green-100 transition ${subView === 'manage_info' ? 'active-menu' : ''}">
                        <span data-lucide="book-open-text" class="w-5 h-5 mr-3"></span> Kelola Informasi
                    </a>
                    <a href="#admin/manage_reservasi" onclick="window.location.hash='admin/manage_reservasi';" class="flex items-center p-3 rounded-lg hover:bg-green-100 transition ${subView === 'manage_reservasi' ? 'active-menu' : ''}">
                        <span data-lucide="calendar-check" class="w-5 h-5 mr-3"></span> Kelola Reservasi
                    </a>
                </nav>
            </div>

            <main class="flex-1 p-4 md:p-8">
                ${adminContent}
            </main>
        </div>
    `;
}

function getAdminContent(subView) {
    switch (subView) {
        case 'manage_info':
            return renderManageInfo();
        case 'manage_reservasi':
            return renderManageReservasi();
        case 'dashboard':
        default:
            return renderAdminDashboard();
    }
}

function renderAdminDashboard() { 
    const totalInfo = infoData.length;
    const totalReservasi = reservasiData.length;
    const confirmedReservasi = reservasiData.filter(r => r.status === 'Confirmed').length;

    return `
        <h1 class="text-4xl font-bold text-primary-green mb-6">Dashboard Admin</h1>
        <p class="text-lg text-gray-600 mb-8">Selamat datang, Admin. Berikut ringkasan aktivitas sistem Anda.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-accent-blue">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Informasi Publik</p>
                        <p class="text-3xl font-extrabold text-text-dark">${totalInfo}</p>
                    </div>
                    <span data-lucide="book-open-text" class="w-8 h-8 text-accent-blue opacity-70"></span>
                </div>
                <p class="text-xs text-gray-400 mt-2">Data ditampilkan di halaman Berita.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-secondary-yellow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Reservasi</p>
                        <p class="text-3xl font-extrabold text-text-dark">${totalReservasi}</p>
                    </div>
                    <span data-lucide="calendar-check" class="w-8 h-8 text-secondary-yellow opacity-70"></span>
                </div>
                <p class="text-xs text-gray-400 mt-2">Semua data pemesanan tiket.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-green">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Terkonfirmasi</p>
                        <p class="text-3xl font-extrabold text-text-dark">${confirmedReservasi}</p>
                    </div>
                    <span data-lucide="check-circle" class="w-8 h-8 text-primary-green opacity-70"></span>
                </div>
                <p class="text-xs text-gray-400 mt-2">${totalReservasi - confirmedReservasi} pending.</p>
            </div>
        </div>
    `;
}

function renderManageInfo() { 
    const listRows = infoData.map((item, index) => `
        <tr class="border-b hover:bg-green-50/50 transition">
            <td class="px-6 py-4 font-medium text-text-dark">${index + 1}</td>
            <td class="px-6 py-4">${item.title}</td>
            <td class="px-6 py-4 hidden sm:table-cell">${item.category}</td>
            <td class="px-6 py-4 hidden md:table-cell">${item.date}</td>
            <td class="px-6 py-4 space-x-2">
                <button onclick="editInfo(${item.id})" class="text-accent-blue hover:text-blue-700 p-1 rounded-full">
                    <span data-lucide="square-pen" class="w-5 h-5"></span>
                </button>
                <button onclick="deleteInfo(${item.id})" class="text-red-500 hover:text-red-700 p-1 rounded-full">
                    <span data-lucide="trash-2" class="w-5 h-5"></span>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <h1 class="text-4xl font-bold text-primary-green mb-6">Kelola Informasi Publik</h1>
        <p class="text-lg text-gray-600 mb-8">Tambahkan, ubah, atau hapus konten berita/laporan di halaman depan.</p>

        <button onclick="showInfoForm()" class="bg-secondary-yellow text-text-dark font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition mb-8 flex items-center">
            <span data-lucide="plus-circle" class="w-5 h-5 mr-2"></span> Tambah Informasi Baru
        </button>

        <div id="infoFormContainer" class="bg-white p-6 rounded-xl shadow-xl mb-10 hidden">
            <h3 id="infoFormTitle" class="text-2xl font-semibold text-text-dark mb-4">Tambah Informasi Baru</h3>
            <form id="infoForm" class="space-y-4">
                <input type="hidden" id="infoId">
                <div>
                    <label for="inputTitle" class="block font-medium text-gray-700">Judul Laporan</label>
                    <input type="text" id="inputTitle" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="inputCategory" class="block font-medium text-gray-700">Kategori</label>
                        <select id="inputCategory" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                            <option value="Konservasi">Konservasi</option>
                            <option value="Riset">Riset</option>
                            <option value="Ekowisata">Ekowisata</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                    <div>
                        <label for="inputDate" class="block font-medium text-gray-700">Tanggal</label>
                        <input type="date" id="inputDate" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                    </div>
                </div>
                <div>
                    <label for="inputContent" class="block font-medium text-gray-700">Isi Konten</label>
                    <textarea id="inputContent" rows="4" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required></textarea>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" id="submitInfoButton" class="bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition">Simpan Data</button>
                    <button type="button" onclick="hideInfoForm()" class="bg-gray-300 text-text-dark font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition">Batal</button>
                </div>
            </form>
        </div>
        
        <div class="bg-white rounded-xl shadow-xl overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">No</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Judul</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${listRows.length > 0 ? listRows : `<tr><td colspan="5" class="text-center py-8 text-gray-500">Data Kosong. Silakan tambah data baru.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;
}

function renderManageReservasi() { 
    const listRows = reservasiData.map((item, index) => `
        <tr class="border-b hover:bg-green-50/50 transition">
            <td class="px-6 py-4 font-medium text-text-dark">${index + 1}</td>
            <td class="px-6 py-4">${item.name}</td>
            <td class="px-6 py-4 hidden sm:table-cell">${item.date}</td>
            <td class="px-6 py-4">${item.tickets} Tiket</td>
            <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full 
                    ${item.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}">
                    ${item.status}
                </span>
            </td>
            <td class="px-6 py-4 space-x-2">
                <button onclick="editReservasi(${item.id})" class="text-accent-blue hover:text-blue-700 p-1 rounded-full">
                    <span data-lucide="square-pen" class="w-5 h-5"></span>
                </button>
                <button onclick="deleteReservasi(${item.id})" class="text-red-500 hover:text-red-700 p-1 rounded-full">
                    <span data-lucide="trash-2" class="w-5 h-5"></span>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <h1 class="text-4xl font-bold text-primary-green mb-6">Kelola Reservasi Pengunjung</h1>
        <p class="text-lg text-gray-600 mb-8">Kelola dan pantau data pemesanan tiket dari pengunjung.</p>

        <button onclick="showReservasiForm()" class="bg-secondary-yellow text-text-dark font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition mb-8 flex items-center">
            <span data-lucide="plus-circle" class="w-5 h-5 mr-2"></span> Tambah Data Reservasi
        </button>

        <div id="reservasiFormContainer" class="bg-white p-6 rounded-xl shadow-xl mb-10 hidden">
            <h3 id="reservasiFormTitle" class="text-2xl font-semibold text-text-dark mb-4">Tambah Reservasi Baru</h3>
            <form id="reservasiForm" class="space-y-4">
                <input type="hidden" id="reservasiId">
                <div>
                    <label for="inputName" class="block font-medium text-gray-700">Nama Pengunjung</label>
                    <input type="text" id="inputName" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="inputRsvDate" class="block font-medium text-gray-700">Tanggal Kunjungan</label>
                        <input type="date" id="inputRsvDate" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                    </div>
                    <div>
                        <label for="inputTickets" class="block font-medium text-gray-700">Jumlah Tiket</label>
                        <input type="number" id="inputTickets" min="1" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                    </div>
                    <div>
                        <label for="inputStatus" class="block font-medium text-gray-700">Status</label>
                        <select id="inputStatus" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" id="submitReservasiButton" class="bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition">Simpan Reservasi</button>
                    <button type="button" onclick="hideReservasiForm()" class="bg-gray-300 text-text-dark font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition">Batal</button>
                </div>
            </form>
        </div>
        
        <div class="bg-white rounded-xl shadow-xl overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">No</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Nama Pengunjung</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider hidden sm:table-cell">Tanggal Kunjungan</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Jumlah Tiket</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${listRows.length > 0 ? listRows : `<tr><td colspan="6" class="text-center py-8 text-gray-500">Belum ada data reservasi.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;
}

// --- FUNGSI CRUD (UPDATE PANGGILAN) ---

function showInfoForm(isEditing = false) { 
    const formContainer = document.getElementById('infoFormContainer');
    const formTitle = document.getElementById('infoFormTitle');
    const submitButton = document.getElementById('submitInfoButton');
    
    if (isEditing) {
        formTitle.textContent = 'Edit Data Informasi';
        submitButton.textContent = 'Update Data';
    } else {
        formTitle.textContent = 'Tambah Informasi Baru';
        submitButton.textContent = 'Simpan Data';
        document.getElementById('infoForm').reset();
        document.getElementById('infoId').value = '';
    }
    formContainer.classList.remove('hidden');
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

function hideInfoForm() {
    document.getElementById('infoFormContainer').classList.add('hidden');
    document.getElementById('infoForm').reset();
}

function handleInfoSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('infoId').value;
    const title = document.getElementById('inputTitle').value.trim();
    const category = document.getElementById('inputCategory').value;
    const date = document.getElementById('inputDate').value;
    const content = document.getElementById('inputContent').value.trim();

    if (id) {
        const index = infoData.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
            infoData[index] = { id: parseInt(id), title, category, date, content };
        }
    } else {
        const newData = { id: nextInfoId++, title, category, date, content };
        infoData.push(newData);
    }

    saveInfoData();
    hideInfoForm();
    // Refresh Admin View
    window.location.hash = 'admin/manage_info'; 
}

function editInfo(id) {
    const item = infoData.find(d => d.id === id);
    if (item) {
        document.getElementById('infoId').value = item.id;
        document.getElementById('inputTitle').value = item.title;
        document.getElementById('inputCategory').value = item.category;
        document.getElementById('inputDate').value = item.date;
        document.getElementById('inputContent').value = item.content;
        showInfoForm(true);
    }
}

function deleteInfo(id) {
    const isConfirmed = confirm('Anda yakin ingin menghapus informasi ini?');
    if (isConfirmed) {
        infoData = infoData.filter(d => d.id !== id);
        saveInfoData();
        // Refresh Admin View
        window.location.hash = 'admin/manage_info'; 
    }
}

function showReservasiForm(isEditing = false) { 
    const formContainer = document.getElementById('reservasiFormContainer');
    const formTitle = document.getElementById('reservasiFormTitle');
    const submitButton = document.getElementById('submitReservasiButton');
    
    if (isEditing) {
        formTitle.textContent = 'Edit Data Reservasi';
        submitButton.textContent = 'Update Reservasi';
    } else {
        formTitle.textContent = 'Tambah Reservasi Baru';
        submitButton.textContent = 'Simpan Reservasi';
        document.getElementById('reservasiForm').reset();
        document.getElementById('reservasiId').value = '';
    }
    formContainer.classList.remove('hidden');
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

function hideReservasiForm() {
    document.getElementById('reservasiFormContainer').classList.add('hidden');
    document.getElementById('reservasiForm').reset();
}

function handleReservasiSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('reservasiId').value;
    const name = document.getElementById('inputName').value.trim();
    const date = document.getElementById('inputRsvDate').value;
    const tickets = parseInt(document.getElementById('inputTickets').value);
    const status = document.getElementById('inputStatus').value;

    if (id) {
        const index = reservasiData.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
            reservasiData[index] = { id: parseInt(id), name, date, tickets, status };
        }
    } else {
        const newData = { id: nextReservasiId++, name, date, tickets, status };
        reservasiData.push(newData);
    }

    saveReservasiData();
    hideReservasiForm();
    // Refresh Admin View
    window.location.hash = 'admin/manage_reservasi';
}

function editReservasi(id) {
    const item = reservasiData.find(d => d.id === id);
    if (item) {
        document.getElementById('reservasiId').value = item.id;
        document.getElementById('inputName').value = item.name;
        document.getElementById('inputRsvDate').value = item.date;
        document.getElementById('inputTickets').value = item.tickets;
        document.getElementById('inputStatus').value = item.status;
        showReservasiForm(true);
    }
}

function deleteReservasi(id) {
    const isConfirmed = confirm('Anda yakin ingin menghapus data reservasi ini?');
    if (isConfirmed) {
        reservasiData = reservasiData.filter(d => d.id !== id);
        saveReservasiData();
        // Refresh Admin View
        window.location.hash = 'admin/manage_reservasi';
    }
}


// --- 8. INISIALISASI ---

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // 1. Tangani Header di semua halaman MPA
    handleHybridHeader(isLoggedIn);

    // 2. Pasang Event Listener Form spesifik per halaman (Login/Register)
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', handleRegistration);
    }

    // 3. Jalankan Routing untuk Konten Dinamis (index.html, berita.html)
    handleRouting();
    
    // 4. Tambahkan Listener untuk Hash Change (di index.html dan berita.html)
    window.addEventListener('hashchange', handleRouting);
});

function refreshPublicInfo() {
    const section = document.getElementById('informasi-ringkas');
    if (!section) return;

    section.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-4xl font-bold text-center text-primary-green mb-12">Informasi Ringkas</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${infoData.slice(0, 3).map((item, index) => {
                    const imageIndex = (index % 4) + 1;
                    let imageClass = `card-img-${imageIndex}`;
                    return `
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:translate-y-[-5px]">
                            <div class="${imageClass} h-48 bg-cover bg-center rounded-t-xl"></div>
                            <div class="p-6">
                                <h3 class="text-2xl font-semibold text-text-dark mb-3 truncate">${item.title}</h3>
                                <div class="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                                    <span class="flex items-center"><span data-lucide="tag" class="w-4 h-4 mr-1"></span> ${item.category}</span>
                                </div>
                                <p class="text-gray-600 line-clamp-3 mb-4">${item.content}</p>
                                <a href="berita.html#detail/${item.id}" class="inline-flex items-center text-accent-blue hover:text-blue-700 font-medium">
                                    Baca Selengkapnya <span data-lucide="arrow-right" class="ml-2 w-4 h-4"></span>
                                </a>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="text-center mt-10">
                <a href="berita.html" class="inline-flex items-center bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md">
                    Lihat Semua Laporan
                    <span data-lucide="external-link" class="ml-2 w-4 h-4"></span>
                </a>
            </div>
        </div>
    `;
    lucide.createIcons();
}
// Setelah simpan / hapus / update
refreshPublicInfo();
