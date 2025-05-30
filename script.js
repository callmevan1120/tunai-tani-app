document.addEventListener("DOMContentLoaded", () => {
  const initialRoleSelection = document.getElementById(
    "initial-role-selection"
  );
  const mainAppContent = document.getElementById("main-app-content");
  const contentArea = document.getElementById("content-area");
  const bottomNavItems = document.querySelectorAll(".app-bottom-nav .nav-item");
  const btnSelectPetani = document.getElementById("btn-select-petani");
  const btnSelectKonsumen = document.getElementById("btn-select-konsumen");
  const navChangeRole = document.getElementById("nav-change-role");
  const navLogout = document.getElementById("nav-logout");
  const currentRoleDisplay = document.getElementById("current-role-display");

  let currentUserRole = null; // 'petani', 'konsumen', or null

  // Function to update active bottom nav item
  const setActiveNavItem = (id) => {
    bottomNavItems.forEach((item) => item.classList.remove("active"));
    if (id) {
      document.getElementById(id).classList.add("active");
    }
  };

  // Function to show/hide navigation items based on role
  const updateNavVisibility = (role) => {
    document.querySelectorAll(".petani-only").forEach((item) => {
      item.style.display = role === "petani" ? "flex" : "none"; // Use flex for bottom nav items
    });
    document.querySelectorAll(".konsumen-only").forEach((item) => {
      item.style.display = role === "konsumen" ? "flex" : "none"; // Use flex for bottom nav items
    });
    currentRoleDisplay.textContent = role
      ? role.charAt(0).toUpperCase() + role.slice(1)
      : "Guest";
  };

  // Function to render content based on selected role and feature
  const renderContent = (feature) => {
    contentArea.innerHTML = ""; // Clear previous content

    let htmlContent = "";

    switch (feature) {
      case "home":
        htmlContent += `
                    <div class="card p-4 text-center mb-3">
                        <img src="assets/petani.jpg" class="img-fluid rounded mb-3 shadow-sm" alt="Ilustrasi Pertanian">
                        <h4 class="mb-2 text-success">Halo, <span class="text-dark">${
                          currentUserRole
                            ? currentUserRole.charAt(0).toUpperCase() +
                              currentUserRole.slice(1)
                            : "Pengguna"
                        }</span>!</h4>
                        <p class="text-muted small mb-0">Selamat datang di Tunai Tani, platform yang mendukung pertanian Indonesia.</p>
                    </div>

                    <div class="row">
                        <div class="col-6 mb-3">
                            <div class="card p-3 text-center">
                                <i class="fas fa-handshake fa-2x text-primary mb-2"></i>
                                <h6 class="mb-1">Dukung Pre-order</h6>
                                <p class="small text-muted mb-0">Dana untuk petani, panen untuk Anda.</p>
                            </div>
                        </div>
                        <div class="col-6 mb-3">
                            <div class="card p-3 text-center">
                                <i class="fas fa-chart-bar fa-2x text-success mb-2"></i>
                                <h6 class="mb-1">Rekomendasi Akurat</h6>
                                <p class="small text-muted mb-0">Tanam sesuai kebutuhan pasar (khusus petani).</p>
                            </div>
                        </div>
                        <div class="col-6 mb-3">
                            <div class="card p-3 text-center">
                                <i class="fas fa-shield-alt fa-2x text-info mb-2"></i>
                                <h6 class="mb-1">Dana Cadangan</h6>
                                <p class="small text-muted mb-0">Mitigasi risiko gagal panen.</p>
                            </div>
                        </div>
                        <div class="col-6 mb-3">
                            <div class="card p-3 text-center">
                                <i class="fas fa-lightbulb fa-2x text-warning mb-2"></i>
                                <h6 class="mb-1">Edukasi & Info</h6>
                                <p class="small text-muted mb-0">Tips dan informasi terbaru pertanian.</p>
                            </div>
                        </div>
                    </div>
                `;
        break;
      case "preorder":
        htmlContent += `<h4 class="mb-3 text-center"><i class="fas fa-seedling me-2"></i>Pre-order Panen</h4>`;
        if (currentUserRole === "petani") {
          htmlContent += `
                        <div class="card p-3 mb-3">
                            <h6 class="mb-2">Daftar Proyek Baru Anda</h6>
                            <div class="mb-2">
                                <label for="namaKomoditas" class="form-label small mb-1">Komoditas <span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-sm" id="namaKomoditas" placeholder="Contoh: Cabai Rawit" required>
                            </div>
                            <div class="mb-2">
                                <label for="luasLahan" class="form-label small mb-1">Luas Lahan (m²) <span class="text-danger">*</span></label>
                                <input type="number" class="form-control form-control-sm" id="luasLahan" placeholder="Contoh: 500" required>
                            </div>
                            <div class="mb-2">
                                <label for="modalDibutuhkan" class="form-label small mb-1">Modal Dibutuhkan (Rp) <span class="text-danger">*</span></label>
                                <input type="number" class="form-control form-control-sm" id="modalDibutuhkan" placeholder="Contoh: 8000000" required>
                            </div>
                            <div class="mb-3">
                                <label for="estimasiPanen" class="form-label small mb-1">Estimasi Panen (hari) <span class="text-danger">*</span></label>
                                <input type="number" class="form-control form-control-sm" id="estimasiPanen" placeholder="Contoh: 75" required>
                            </div>
                            <button class="btn btn-primary btn-sm"><i class="fas fa-plus-circle me-1"></i>Daftarkan Proyek</button>
                        </div>
                        <h5 class="mt-4 mb-3 text-center">Proyek Aktif Anda</h5>
                        <div id="daftar-proyek-petani">
                            <div class="preorder-card p-3 mb-3">
                                <h6>Cabai Rawit <span class="badge bg-warning text-dark float-end">Pending</span></h6>
                                <p class="small mb-1"><i class="fas fa-ruler-combined me-1"></i>Lahan: 500 m² | <i class="fas fa-calendar-alt me-1"></i>Panen: 75 hari</p>
                                <p class="small mb-1"><i class="fas fa-money-bill-wave me-1"></i>Modal: <span class="fw-bold">Rp 8.000.000</span></p>
                                <p class="small mb-1"><i class="fas fa-sack-dollar me-1"></i>Terkumpul: <span class="fw-bold text-success">Rp 4.000.000</span> (50%)</p>
                                <div class="progress mb-2" style="height: 6px;">
                                    <div class="progress-bar progress-bar-custom" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div class="d-flex justify-content-end gap-2 mt-2">
                                    <button class="btn btn-outline-secondary btn-sm"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-outline-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                            <p class="text-muted text-center small mt-3">Belum ada proyek lain yang terdaftar.</p>
                        </div>
                    `;
        } else if (currentUserRole === "konsumen") {
          htmlContent += `
                        <p class="text-center text-muted small">Dukung proyek tanam petani favoritmu.</p>
                        <div id="daftar-proyek-konsumen" class="row row-cols-1 row-cols-md-2 g-3">
                            <div class="col">
                                <div class="preorder-card p-3" data-id="1" data-name="Cabai Rawit" data-petani="Bapak Budi" data-modal="8000000" data-estimasi-panen-kg="400" data-estimasi-harga="20000">
                                    <img src="assets/cabai.jpg" class="img-fluid rounded mb-2" alt="Cabai Rawit">
                                    <h6>Cabai Rawit</h6>
                                    <p class="small text-muted mb-1"><i class="fas fa-user me-1"></i>Bapak Budi</p>
                                    <p class="small mb-1"><i class="fas fa-ruler-combined me-1"></i>Lahan: 500 m² | <i class="fas fa-calendar-alt me-1"></i>Panen: 75 hari</p>
                                    <p class="small mb-1"><i class="fas fa-money-bill-wave me-1"></i>Modal: <span class="fw-bold">Rp 8.000.000</span></p>
                                    <p class="small mb-1"><i class="fas fa-sack-dollar me-1"></i>Terkumpul: <span class="fw-bold text-success">Rp 4.000.000</span> (50%)</p>
                                    <div class="progress mb-2" style="height: 6px;">
                                        <div class="progress-bar progress-bar-custom" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="alert alert-info small py-1 px-2 mt-2 text-center">5% Dana Cadangan</div>
                                    <label for="jumlahDukungan1" class="form-label small mb-1">Dukung (Rp)</label>
                                    <input type="number" class="form-control form-control-sm mb-2" id="jumlahDukungan1" placeholder="Min Rp 50.000">
                                    <button class="btn btn-success btn-sm w-100 add-to-cart-btn"><i class="fas fa-shopping-basket me-1"></i>Dukung</button>
                                </div>
                            </div>
                            <div class="col">
                                <div class="preorder-card p-3" data-id="2" data-name="Bayam Merah" data-petani="Ibu Siti" data-modal="2000000" data-estimasi-panen-kg="100" data-estimasi-harga="25000">
                                    <img src="assets/bayam.jpg" class="img-fluid rounded mb-2" alt="Bayam Merah">
                                    <h6>Bayam Merah</h6>
                                    <p class="small text-muted mb-1"><i class="fas fa-user me-1"></i>Ibu Siti</p>
                                    <p class="small mb-1"><i class="fas fa-ruler-combined me-1"></i>Lahan: 200 m² | <i class="fas fa-calendar-alt me-1"></i>Panen: 30 hari</p>
                                    <p class="small mb-1"><i class="fas fa-money-bill-wave me-1"></i>Modal: <span class="fw-bold">Rp 2.000.000</span></p>
                                    <p class="small mb-1"><i class="fas fa-sack-dollar me-1"></i>Terkumpul: <span class="fw-bold text-success">Rp 1.800.000</span> (90%)</p>
                                    <div class="progress mb-2" style="height: 6px;">
                                        <div class="progress-bar progress-bar-custom" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="alert alert-info small py-1 px-2 mt-2 text-center">5% Dana Cadangan</div>
                                    <label for="jumlahDukungan2" class="form-label small mb-1">Dukung (Rp)</label>
                                    <input type="number" class="form-control form-control-sm mb-2" id="jumlahDukungan2" placeholder="Min Rp 50.000">
                                    <button class="btn btn-success btn-sm w-100 add-to-cart-btn"><i class="fas fa-shopping-basket me-1"></i>Dukung</button>
                                </div>
                            </div>
                        </div>
                    `;
        }
        break;
      case "simulasi": // Petani only
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-calculator me-2"></i>Simulasi Balik Modal</h4>
                    <p class="text-center text-muted small">Hitung estimasi hasil panen minimal agar Anda tidak rugi.</p>
                    <div class="card p-3 mb-3">
                        <div class="mb-2">
                            <label for="modalTanam" class="form-label small mb-1">Modal Tanam (Rp) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control form-control-sm" id="modalTanam" value="8000000" required>
                        </div>
                        <div class="mb-3">
                            <label for="hargaJualKg" class="form-label small mb-1">Harga Jual per Kg (Rp) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control form-control-sm" id="hargaJualKg" value="20000" required>
                        </div>
                        <button class="btn btn-primary btn-sm" id="btn-hitung-simulasi"><i class="fas fa-play-circle me-1"></i>Hitung Simulasi</button>
                        <div class="mt-3" id="hasil-simulasi"></div>
                    </div>
                    <div class="card p-3">
                        <h6 class="mb-2">Grafik Potensi Pendapatan</h6>
                        <canvas id="yieldChart"></canvas>
                    </div>
                `;
        break;
      case "crowdfarming": // Konsumen only (now "Investasi")
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-coins me-2"></i>Simulasi Investasi Komoditas</h4>
                    <p class="text-center text-muted small">Pilih proyek dan lihat potensi hasil dari investasi Anda.</p>
                    <div class="card p-3 mb-3">
                        <div class="mb-2">
                            <label for="pilihProyekInvestasi" class="form-label small mb-1">Pilih Proyek <span class="text-danger">*</span></label>
                            <select class="form-select form-select-sm" id="pilihProyekInvestasi" required>
                                <option value="" disabled selected>Pilih proyek pre-order...</option>
                                <option value="cabai-rawit" data-modal="8000000" data-estimasi-panen-kg="400" data-estimasi-harga="20000">Cabai Rawit (Bapak Budi)</option>
                                <option value="bayam-merah" data-modal="2000000" data-estimasi-panen-kg="100" data-estimasi-harga="25000">Bayam Merah (Ibu Siti)</option>
                                <option value="wortel-organik" data-modal="5000000" data-estimasi-panen-kg="250" data-estimasi-harga="22000">Wortel Organik (Bapak Joni)</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label for="jumlahDukunganInvestasi" class="form-label small mb-1">Jumlah Dukungan Anda (Rp) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control form-control-sm" id="jumlahDukunganInvestasi" value="500000" required>
                        </div>
                        <button class="btn btn-success btn-sm" id="btn-hitung-investasi"><i class="fas fa-chart-pie me-1"></i>Hitung Simulasi Investasi</button>
                        <div class="mt-3" id="hasil-investasi"></div>
                    </div>
                    <div class="card p-3">
                        <h6 class="mb-2">Alokasi Dana Proyek</h6>
                        <canvas id="crowdFarmingChart"></canvas>
                    </div>
                 `;
        break;
      case "rekomendasi": // Petani only
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-chart-line me-2"></i>Rekomendasi Komoditas</h4>
                    <p class="text-center text-muted small">Tanam komoditas dengan permintaan tertinggi di pasar pre-order.</p>
                    <div class="card p-3 mb-3">
                        <h6 class="mb-2">Tren Permintaan Pre-order Bulan Ini</h6>
                        <ul class="list-group list-group-flush small mb-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                <span><i class="fas fa-pepper-hot text-danger me-2"></i>Timun</span>
                                <span class="badge bg-primary rounded-pill">35%</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                <span><i class="fas fa-leaf text-success me-2"></i>Bayam</span>
                                <span class="badge bg-info rounded-pill">28%</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                <span><i class="fas fa-onion text-warning me-2"></i>Bawang Merah</span>
                                <span class="badge bg-secondary rounded-pill">20%</span>
                            </li>
                        </ul>
                         <h6 class="mb-2">Distribusi Permintaan</h6>
                        <canvas id="rekomendasiChart"></canvas>
                    </div>
                `;
        break;
      case "konsultasi": // Petani only
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-comments-dollar me-2"></i>Konsultasi Pakar Tanaman</h4>
                    <p class="text-center text-muted small">Dapatkan bimbingan langsung dari ahli pertanian.</p>
                    <div class="card p-3 mb-3">
                        <h6 class="mb-2">Pakar Tersedia</h6>
                        <ul class="list-group list-group-flush small">
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <h6 class="mb-0">Dr. Agr. Surya Wijaya</h6>
                                    <span class="text-muted"><i class="fas fa-bug me-1"></i>Hama & Penyakit</span>
                                </div>
                                <button class="btn btn-outline-primary btn-sm"><i class="fas fa-comment me-1"></i>Chat</button>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                <div>
                                    <h6 class="mb-0">Ir. Lestari Indah</h6>
                                    <span class="text-muted"><i class="fas fa-vial me-1"></i>Nutrisi Tanaman</span>
                                </div>
                                <button class="btn btn-outline-primary btn-sm"><i class="fas fa-comment me-1"></i>Chat</button>
                            </li>
                        </ul>
                    </div>
                 `;
        break;
      case "chat":
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-comment-dots me-2"></i>Notifikasi & Chat</h4>
                    <p class="text-center text-muted small">Komunikasi ringan dengan pihak terkait.</p>
                    <div class="card p-3 mb-3">
                        <h6 class="mb-2">Riwayat Chat</h6>
                        <div class="chat-container mb-3">
                            <div class="chat-message petani">
                                <small class="text-muted d-block text-end mb-1">Petani - 27 Mei</small>
                                Tanaman sehat, hujan bagus minggu ini.
                            </div>
                            <div class="chat-message konsumen">
                                <small class="text-muted d-block text-start mb-1">Konsumen - 28 Mei</small>
                                Oke Pak, semoga panen melimpah!
                            </div>
                        </div>
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" placeholder="Tulis pesan singkat...">
                            <button class="btn btn-primary"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                `;
        break;
      case "laporan":
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-clipboard-list me-2"></i>Laporan Tanam</h4>
                    <p class="text-center text-muted small">Update atau pantau kemajuan proyek panen.</p>
                `;
        if (currentUserRole === "petani") {
          htmlContent += `
                        <div class="card p-3 mb-3">
                            <h6 class="mb-2">Buat Laporan Baru</h6>
                            <div class="mb-2">
                                <label for="selectProyekLaporan" class="form-label small mb-1">Pilih Proyek <span class="text-danger">*</span></label>
                                <select class="form-select form-select-sm" id="selectProyekLaporan" required>
                                    <option selected disabled value="">Pilih...</option>
                                    <option value="cabai-rawit">Cabai Rawit (Proyek #123)</option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="statusTanaman" class="form-label small mb-1">Status Tanaman <span class="text-danger">*</span></label>
                                <select class="form-select form-select-sm" id="statusTanaman" required>
                                    <option selected disabled value="">Pilih...</option>
                                    <option value="baik">Baik</option>
                                    <option value="tersingung-hama">Terserang hama</option>
                                    <option value="kerusakan">Kerusakan</option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="deskripsiLaporan" class="form-label small mb-1">Deskripsi</label>
                                <textarea class="form-control form-control-sm" id="deskripsiLaporan" rows="2" placeholder="Contoh: Tanaman tumbuh subur."></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="fotoLaporan" class="form-label small mb-1">Unggah Foto (Opsional)</label>
                                <input class="form-control form-control-sm" type="file" id="fotoLaporan" accept="image/*">
                            </div>
                            <button class="btn btn-primary btn-sm"><i class="fas fa-paper-plane me-1"></i>Kirim</button>
                        </div>
                        <h6 class="mt-4 mb-3 text-center">Riwayat Laporan Anda</h6>
                        <div class="card p-3">
                            <div class="alert alert-success d-flex align-items-center py-2 px-3 mb-2" role="alert">
                                <i class="fas fa-check-circle me-2"></i>
                                <div class="small">
                                    <strong>Cabai Rawit:</strong> Status Baik - 20 Mei
                                </div>
                                <button class="btn btn-sm btn-outline-info ms-auto"><i class="fas fa-eye"></i></button>
                            </div>
                        </div>
                    `;
        } else if (currentUserRole === "konsumen") {
          htmlContent += `
                        <p class="text-center text-muted small">Pantau laporan proyek yang Anda dukung.</p>
                        <div class="card p-3">
                            <h6 class="mb-2">Laporan Proyek yang Anda Dukung</h6>
                            <div class="alert alert-success d-flex align-items-center py-2 px-3 mb-2" role="alert">
                                <i class="fas fa-check-circle me-2"></i>
                                <div class="small">
                                    <strong>Cabai Rawit (Bpk. Budi):</strong> Status Baik - 20 Mei
                                </div>
                                <button class="btn btn-sm btn-outline-info ms-auto"><i class="fas fa-eye"></i></button>
                            </div>
                             <div class="alert alert-danger d-flex align-items-center py-2 px-3 mb-2" role="alert">
                                <i class="fas fa-times-circle me-2"></i>
                                <div class="small">
                                    <strong>Bayam Merah (Ibu Siti):</strong> Kerusakan - 29 Mei
                                </div>
                                <button class="btn btn-sm btn-outline-info ms-auto"><i class="fas fa-eye"></i></button>
                            </div>
                            <div class="alert alert-light text-muted d-flex align-items-center py-2 px-3 mb-0" role="alert">
                                <i class="fas fa-hourglass-half me-2"></i>
                                <div class="small">
                                    <strong>Timun (Bpk. Jaya):</strong> Belum ada kabar (terakhir 10 Mei)
                                </div>
                            </div>
                        </div>
                    `;
        }
        break;
      case "keranjang": // Konsumen only
        htmlContent += `
                    <h4 class="mb-3 text-center"><i class="fas fa-shopping-basket me-2"></i>Keranjang Pre-order</h4>
                    <p class="text-center text-muted small">Daftar proyek yang akan Anda dukung.</p>
                    <div class="card p-3 mb-3">
                        <div id="keranjang-list">
                            <p class="text-muted text-center small" id="empty-cart-message">Keranjang Anda kosong. Yuk, dukung petani!</p>
                        </div>
                        <hr id="keranjang-divider" class="d-none">
                        <div id="keranjang-summary" class="d-none">
                            <h6 class="mt-3 mb-2">Ringkasan Dukungan:</h6>
                            <p class="lead fw-bold text-success mb-2">Total: <span id="total-dukungan">Rp 0</span></p>
                            <button class="btn btn-success w-100"><i class="fas fa-money-check-alt me-2"></i>Lanjutkan Pembayaran</button>
                        </div>
                    </div>
                `;
        break;
      default:
        htmlContent += `<p class="alert alert-danger text-center">Fitur tidak ditemukan.</p>`;
    }
    contentArea.innerHTML = htmlContent;

    // --- Add event listeners for dynamically added elements ---

    // Petani: Simulasi Balik Modal
    if (feature === "simulasi") {
      const btnHitungSimulasi = document.getElementById("btn-hitung-simulasi");
      const yieldChartCtx = document
        .getElementById("yieldChart")
        .getContext("2d");
      let yieldChart;

      const updateYieldChart = (modalTanam, hargaJualKg) => {
        if (yieldChart) {
          yieldChart.destroy();
        }

        const labels = [];
        const breakevenYield = modalTanam / hargaJualKg;
        const dataPendapatan = [];
        const dataModal = Array(5).fill(modalTanam); // Modal is constant

        // Generate points around breakeven for better visualization
        for (let i = 0; i < 5; i++) {
          let currentYield = breakevenYield * (0.8 + i * 0.1); // From 80% to 120% of BEP
          labels.push(`${currentYield.toFixed(0)} kg`);
          dataPendapatan.push(currentYield * hargaJualKg);
        }

        yieldChart = new Chart(yieldChartCtx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Pendapatan (Rp)",
                data: dataPendapatan,
                borderColor: "#28a745",
                backgroundColor: "rgba(40, 167, 69, 0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "#28a745",
              },
              {
                label: "Modal Tanam (Rp)",
                data: dataModal,
                borderColor: "#007bff",
                borderDash: [5, 5],
                tension: 0.1,
                fill: false,
                pointRadius: 0,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  font: {
                    size: 10,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label += `Rp ${context.parsed.y.toLocaleString("id-ID")}`;
                    }
                    return label;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Dana (Rp)",
                  font: { size: 10 },
                },
                ticks: {
                  callback: function (value, index, values) {
                    return "Rp " + (value / 1000000).toFixed(0) + "jt";
                  },
                  font: { size: 9 },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Hasil Panen (Kg)",
                  font: { size: 10 },
                },
                ticks: {
                  font: { size: 9 },
                },
              },
            },
          },
        });
      };

      btnHitungSimulasi.addEventListener("click", () => {
        const modalTanam = parseFloat(
          document.getElementById("modalTanam").value
        );
        const hargaJualKg = parseFloat(
          document.getElementById("hargaJualKg").value
        );
        const hasilSimulasiDiv = document.getElementById("hasil-simulasi");

        if (
          isNaN(modalTanam) ||
          isNaN(hargaJualKg) ||
          modalTanam <= 0 ||
          hargaJualKg <= 0
        ) {
          hasilSimulasiDiv.innerHTML =
            '<div class="alert alert-danger py-2"><i class="fas fa-exclamation-triangle me-2"></i>Mohon masukkan nilai yang valid.</div>';
          return;
        }

        const hasilPanenMinimal = modalTanam / hargaJualKg;
        const targetPanenOptimal = hasilPanenMinimal * 1.25;
        const estimasiMarginOptimal =
          targetPanenOptimal * hargaJualKg - modalTanam;

        hasilSimulasiDiv.innerHTML = `
                    <div class="alert alert-success py-2">
                        <h6 class="mb-1"><i class="fas fa-check-circle me-2"></i>Hasil Simulasi:</h6>
                        <p class="small mb-1">Panen minimal (BEP): <strong>${hasilPanenMinimal.toFixed(
                          2
                        )} kg</strong></p>
                        <p class="small mb-1">Target panen optimal (25% profit): <strong>${targetPanenOptimal.toFixed(
                          2
                        )} kg</strong></p>
                        <p class="small mb-0">Estimasi margin: <strong class="${
                          estimasiMarginOptimal >= 0
                            ? "text-primary"
                            : "text-danger"
                        }">Rp ${estimasiMarginOptimal.toLocaleString(
          "id-ID"
        )}</strong></p>
                    </div>
                `;
        updateYieldChart(modalTanam, hargaJualKg);
      });

      updateYieldChart(8000000, 20000); // Initial chart load
    }

    // Konsumen: Simulasi Investasi Komoditas (Crowd Farming)
    if (feature === "crowdfarming") {
      const pilihProyekInvestasi = document.getElementById(
        "pilihProyekInvestasi"
      );
      const jumlahDukunganInvestasi = document.getElementById(
        "jumlahDukunganInvestasi"
      );
      const btnHitungInvestasi = document.getElementById(
        "btn-hitung-investasi"
      );
      const hasilInvestasiDiv = document.getElementById("hasil-investasi");
      const crowdFarmingChartCtx = document
        .getElementById("crowdFarmingChart")
        .getContext("2d");
      let crowdFarmingChart;

      const updateCrowdFarmingChart = (
        persentaseDukunganAnda,
        persentaseDukunganLain,
        persentaseSisaModal
      ) => {
        if (crowdFarmingChart) {
          crowdFarmingChart.destroy();
        }
        crowdFarmingChart = new Chart(crowdFarmingChartCtx, {
          type: "pie",
          data: {
            labels: [
              "Dukungan Anda",
              "Dukungan Investor Lain",
              "Sisa Modal Dibutuhkan",
            ],
            datasets: [
              {
                data: [
                  persentaseDukunganAnda,
                  persentaseDukunganLain,
                  persentaseSisaModal,
                ],
                backgroundColor: ["#28a745", "#007bff", "#ffc107"],
                hoverOffset: 8,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  font: {
                    size: 10,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed !== null) {
                      label += `${context.parsed.toFixed(2)}%`;
                    }
                    return label;
                  },
                },
              },
            },
          },
        });
      };

      btnHitungInvestasi.addEventListener("click", () => {
        const selectedOption =
          pilihProyekInvestasi.options[pilihProyekInvestasi.selectedIndex];
        const totalModalProyek = parseFloat(selectedOption.dataset.modal);
        const estimasiTotalPanen = parseFloat(
          selectedOption.dataset.estimasiPanenKg
        );
        const estimasiHargaJual = parseFloat(
          selectedOption.dataset.estimasiHarga
        );
        const jumlahDukungan = parseFloat(jumlahDukunganInvestasi.value);

        if (
          isNaN(jumlahDukungan) ||
          jumlahDukungan <= 0 ||
          isNaN(totalModalProyek) ||
          isNaN(estimasiTotalPanen) ||
          isNaN(estimasiHargaJual)
        ) {
          hasilInvestasiDiv.innerHTML =
            '<div class="alert alert-danger py-2"><i class="fas fa-exclamation-triangle me-2"></i>Mohon pilih proyek dan masukkan jumlah dukungan valid.</div>';
          return;
        }

        const persentaseDukungan = jumlahDukungan / totalModalProyek;
        const estimasiHasilPanenAndaKg =
          estimasiTotalPanen * persentaseDukungan;
        const estimasiPendapatanAnda =
          estimasiHasilPanenAndaKg * estimasiHargaJual;
        const potensiPengembalian = estimasiPendapatanAnda - jumlahDukungan;

        // For chart visualization
        const persentaseDukunganAndaChart = persentaseDukungan * 100;
        const persentaseDukunganLainChart =
          (1 - persentaseDukungan) * 100 * 0.8; // Assume 80% funded by others
        const persentaseSisaModalChart =
          100 - persentaseDukunganAndaChart - persentaseDukunganLainChart;

        hasilInvestasiDiv.innerHTML = `
                    <div class="alert alert-success py-2">
                        <h6 class="mb-1"><i class="fas fa-chart-line me-2"></i>Potensi Investasi Anda:</h6>
                        <p class="small mb-1">Proyek: <strong>${
                          selectedOption.textContent
                        }</strong></p>
                        <p class="small mb-1">Proporsi dukungan: <strong>${(
                          persentaseDukungan * 100
                        ).toFixed(2)}%</strong> dari modal proyek</p>
                        <p class="small mb-1">Estimasi bagian panen Anda: <strong>${estimasiHasilPanenAndaKg.toFixed(
                          2
                        )} kg</strong></p>
                        <p class="small mb-1">Estimasi pendapatan: <strong class="text-primary">Rp ${estimasiPendapatanAnda.toLocaleString(
                          "id-ID"
                        )}</strong></p>
                        <p class="small mb-0">Potensi keuntungan/kerugian: <strong class="${
                          potensiPengembalian >= 0
                            ? "text-success"
                            : "text-danger"
                        }">Rp ${potensiPengembalian.toLocaleString(
          "id-ID"
        )}</strong></p>
                    </div>
                `;
        updateCrowdFarmingChart(
          persentaseDukunganAndaChart,
          persentaseDukunganLainChart,
          persentaseSisaModalChart
        );
      });

      // Initial chart load when page loads
      pilihProyekInvestasi.addEventListener("change", () => {
        // Trigger calculation with default amount if project changes
        btnHitungInvestasi.click();
      });
      // Simulate initial calculation
      if (pilihProyekInvestasi.value) {
        // If a default option is selected
        btnHitungInvestasi.click();
      } else {
        // Or render empty chart if no default selection
        updateCrowdFarmingChart(0, 0, 100);
      }
    }

    // Rekomendasi Komoditas Chart (Petani only)
    if (feature === "rekomendasi") {
      const rekomendasiChartCtx = document
        .getElementById("rekomendasiChart")
        .getContext("2d");
      new Chart(rekomendasiChartCtx, {
        type: "doughnut",
        data: {
          labels: [
            "Timun (35%)",
            "Bayam (28%)",
            "Bawang Merah (20%)",
            "Tomat (10%)",
            "Terong (7%)",
          ],
          datasets: [
            {
              data: [35, 28, 20, 10, 7],
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(255, 205, 86, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(153, 102, 255, 0.8)",
              ],
              borderColor: "#fff",
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 10,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed !== null) {
                    label += context.parsed + "%";
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    }

    // Keranjang Pre-order (Konsumen)
    if (feature === "keranjang") {
      const keranjangList = document.getElementById("keranjang-list");
      const emptyCartMessage = document.getElementById("empty-cart-message");
      const totalDukunganSpan = document.getElementById("total-dukungan");
      const keranjangSummary = document.getElementById("keranjang-summary");
      const keranjangDivider = document.getElementById("keranjang-divider");

      let cartItems = JSON.parse(localStorage.getItem("tunaiTaniCart")) || [];

      const renderCart = () => {
        keranjangList.innerHTML = "";
        let total = 0;

        if (cartItems.length === 0) {
          emptyCartMessage.classList.remove("d-none");
          keranjangSummary.classList.add("d-none");
          keranjangDivider.classList.add("d-none");
        } else {
          emptyCartMessage.classList.add("d-none");
          keranjangSummary.classList.remove("d-none");
          keranjangDivider.classList.remove("d-none");

          cartItems.forEach((item, index) => {
            total += item.amount;
            const itemHtml = `
                            <div class="keranjang-item d-flex justify-content-between align-items-center py-2 border-bottom">
                                <div>
                                    <h6 class="mb-0">${
                                      item.name
                                    } <small class="text-muted">(${
              item.petani
            })</small></h6>
                                    <p class="small mb-0">Dukungan: <span class="fw-bold text-success">Rp ${item.amount.toLocaleString(
                                      "id-ID"
                                    )}</span></p>
                                </div>
                                <button class="btn btn-danger btn-sm remove-from-cart-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        `;
            keranjangList.innerHTML += itemHtml;
          });
          totalDukunganSpan.textContent = `Rp ${total.toLocaleString("id-ID")}`;

          document
            .querySelectorAll(".remove-from-cart-btn")
            .forEach((button) => {
              button.addEventListener("click", (e) => {
                const indexToRemove = parseInt(e.target.dataset.index);
                cartItems.splice(indexToRemove, 1);
                localStorage.setItem(
                  "tunaiTaniCart",
                  JSON.stringify(cartItems)
                );
                renderCart();
              });
            });
        }
      };
      renderCart();
    }

    // Add to Cart functionality (for Pre-order page)
    if (feature === "preorder" && currentUserRole === "konsumen") {
      document
        .querySelectorAll(".preorder-card .add-to-cart-btn")
        .forEach((button) => {
          button.addEventListener("click", (e) => {
            const card = e.target.closest(".preorder-card");
            const projectId = card.dataset.id;
            const projectName = card.dataset.name;
            const projectPetani = card.dataset.petani;
            const inputAmountId = `jumlahDukungan${projectId}`;
            const amount = parseFloat(
              document.getElementById(inputAmountId).value
            );

            if (isNaN(amount) || amount < 50000) {
              alert("Mohon masukkan jumlah dukungan minimal Rp 50.000.");
              return;
            }

            let cartItems =
              JSON.parse(localStorage.getItem("tunaiTaniCart")) || [];
            const existingItemIndex = cartItems.findIndex(
              (item) => item.id === projectId
            );

            if (existingItemIndex > -1) {
              cartItems[existingItemIndex].amount += amount;
            } else {
              cartItems.push({
                id: projectId,
                name: projectName,
                petani: projectPetani,
                amount: amount,
              });
            }
            localStorage.setItem("tunaiTaniCart", JSON.stringify(cartItems));
            alert(
              `${projectName} (Rp ${amount.toLocaleString(
                "id-ID"
              )}) telah ditambahkan ke keranjang pre-order Anda!`
            );
            document.getElementById(inputAmountId).value = "";
          });
        });
    }
  };

  // --- Core Logic for Role Selection and Navigation ---

  // Function to handle role selection (from initial screen or dropdown)
  const selectRole = (role) => {
    currentUserRole = role;
    initialRoleSelection.classList.add("d-none"); // Hide initial screen
    mainAppContent.classList.remove("d-none"); // Show main app content
    updateNavVisibility(currentUserRole); // Update navigation
    setActiveNavItem("nav-home"); // Set Home as active
    renderContent("home"); // Render home content for selected role
  };

  // Event listeners for role selection buttons (initial screen)
  btnSelectPetani.addEventListener("click", (e) => {
    e.preventDefault();
    selectRole("petani");
  });

  btnSelectKonsumen.addEventListener("click", (e) => {
    e.preventDefault();
    selectRole("konsumen");
  });

  // Event listener for "Ganti Role" in dropdown
  navChangeRole.addEventListener("click", (e) => {
    e.preventDefault();
    currentUserRole = null; // Clear current role
    localStorage.removeItem("tunaiTaniCart"); // Clear cart on role change
    mainAppContent.classList.add("d-none");
    initialRoleSelection.classList.remove("d-none");
    updateNavVisibility(currentUserRole);
    setActiveNavItem(null);
  });

  // Event listener for Logout button
  navLogout.addEventListener("click", (e) => {
    e.preventDefault();
    currentUserRole = null;
    localStorage.removeItem("tunaiTaniCart");
    mainAppContent.classList.add("d-none");
    initialRoleSelection.classList.remove("d-none"); // Back to role selection
    updateNavVisibility(currentUserRole);
    setActiveNavItem(null);
    alert("Anda telah keluar.");
  });

  // Event listeners for bottom navigation items
  bottomNavItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.id; // Get ID from the <a> tag
      const feature = targetId.replace("nav-", "");

      // Prevent navigation if role not selected for certain features
      if (!currentUserRole) {
        alert("Silakan pilih role Anda terlebih dahulu!");
        return;
      }

      // Specific role restrictions for navigation (Double check for client-side control)
      if (
        currentUserRole === "konsumen" &&
        (feature === "simulasi" ||
          feature === "konsultasi" ||
          feature === "rekomendasi")
      ) {
        alert("Fitur ini hanya tersedia untuk Petani.");
        return;
      }
      if (
        currentUserRole === "petani" &&
        (feature === "crowdfarming" || feature === "keranjang")
      ) {
        alert("Fitur ini hanya tersedia untuk Konsumen.");
        return;
      }

      setActiveNavItem(targetId);
      renderContent(feature);
    });
  });

  // Initial state: Only show role selection
  // mainAppContent is hidden by default in index.html, only shown after role selection
  updateNavVisibility(currentUserRole); // Hide nav items initially
});
