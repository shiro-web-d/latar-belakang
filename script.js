const nomorWA = "62895707081234"; // GANTI NOMOR KAMU
let produkAktif = null;

// DATA PRODUK + VARIAN + STOK PER VARIAN
const produk = [
  { 
    id: 1, nama: "Alight Motion Pro", desc: "Unlock semua fitur, no watermark", 
    icon: "assets/apk/am.png",
    varian: [
      { nama: "Sharing 1 Tahun", harga: "Rp 7.000", stok: 20 },  // <-- stok per varian
      { nama: "Private 1 Tahun", harga: "Rp 10.000", stok: 10 }
    ]
  },
  { 
    id: 2, nama: "CapCut Pro", desc: "Template premium, export 4K 60fps", 
    icon: "assets/apk/cc.png",
    varian: [
      { nama: "7 Hari", harga: "Rp 10.000", stok: 5 },
      { nama: "1 Bulan", harga: "Rp 35.000", stok: 3 }
    ]
  },
  { 
    id: 3, nama: "Spotify Premium", desc: "No iklan, download lagu", 
    icon: "assets/apk/sf.png",
    varian: [
      { nama: "1 Bulan no garansi", harga: "Rp 15.000", stok: 2 },
      { nama: "3 Bulan no garansi", harga: "Rp 17.000", stok: 0 }
    ]
  },
  { 
    id: 4, nama: "YouTube Premium", desc: "No iklan, background play", 
    icon: "assets/apk/yt.png",
    varian: [
      { nama: "1 Bulan", harga: "Rp 10.000", stok: 5 }
    ]
  },
  { 
    id: 5, nama: "Canva Pro", desc: "Akses semua template, AI tools", 
    icon: "assets/apk/cv.png",
    varian: [
      { nama: "1 Bulan", harga: "Rp 15.000", stok: 3 },
      
    ]
  },
  { 
    id: 6, nama: "coming soon", desc: "....", 
    icon: "assets/apk/pa.png",
    varian: [
      { nama: "1 Bulan", harga: "Rp 5.000", stok: 0 }
    ]
  }
];

// HITUNG TOTAL STOK BUAT DI HOME
function totalStok(produk){
  return produk.varian.reduce((total, v) => total + v.stok, 0);
}

// RENDER HOME
const grid = document.getElementById("produkGrid");
produk.forEach((p) => {
  const stokTotal = totalStok(p);
  const stokText = stokTotal > 0 ? `<span class="ada">Stok: ${stokTotal}</span>` : `<span class="habis">STOK HABIS</span>`;
  const btnDisabled = stokTotal > 0 ? `` : `disabled`;
  const btnText = stokTotal > 0 ? `LIHAT` : `MAAF STOK HABIS`;
  grid.innerHTML += `<div class="card"><img class="card-icon" src="${p.icon}" alt="${p.nama}"><h3>${p.nama}</h3><p class="desc">${p.desc}</p><div class="stok">${stokText}</div><button class="btn" ${btnDisabled} onclick="bukaDetail(${p.id})">${btnText}</button></div>`;
});

// PINDAH HALAMAN
function showPage(id){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

// BUKA DETAIL + TAMPILIN STOK PER VARIAN
function bukaDetail(id){
  produkAktif = produk.find(p => p.id === id);
  document.getElementById('detailIcon').src = produkAktif.icon;
  document.getElementById('detailNama').innerText = produkAktif.nama;
  document.getElementById('detailDesc').innerText = produkAktif.desc;
  
  const list = document.getElementById('variantList');
  list.innerHTML = '';
  produkAktif.varian.forEach(v => {
    const stokStatus = v.stok > 0 ? `Stok: ${v.stok}` : `HABIS`;
    const disabledClass = v.stok > 0 ? `` : `style="opacity:0.4; cursor:not-allowed"`;
    const onClick = v.stok > 0 ? `onclick="order('${produkAktif.nama}', '${v.nama}', '${v.harga}')"` : ``;
    
    list.innerHTML += `
      <div class="variant-item" ${onClick} ${disabledClass}>
        <div>
          <span class="nama-paket">${v.nama}</span>
          <div style="font-size:11px; color:var(--muted)">${stokStatus}</div>
        </div>
        <span class="harga-paket">${v.harga}</span>
      </div>
    `;
  });
  showPage('detail');
}

// POPUP WA
function order(namaProduk, namaVarian, harga){
  const popup = document.getElementById("popup");
  document.getElementById("popupTitle").innerText = `Order: ${namaProduk} - ${namaVarian}`;
  const pesan = `Halo kak Shiro, saya mau order ${namaProduk} paket ${namaVarian} . Apakah masih tersedia?`;
  document.getElementById("btnWa").href = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  popup.classList.add("show");
}
function closePopup(){ document.getElementById("popup").classList.remove("show"); }

// =================================
// INTRO EXIT ANIMATION
// =================================

setTimeout(() => {
  const intro = document.getElementById("intro");

  // Mulai animasi keranjang + teks
  intro.classList.add("exit");

  // Setelah animasi selesai, intro benar-benar dihilangkan
  setTimeout(() => {
    intro.classList.add("hide");
  }, 2500);

}, 3000);