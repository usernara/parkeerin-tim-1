// ============================================================
// Parkeerin - Sistem Tarif dan Pengelolaan Data Parkir
// UAS Pemrograman Dasar - Kelompok 1 (T1B)
// ============================================================
import * as readlineSync from "readline-sync"

// ===== BAGIAN 1: TIPE DATA DAN DATA AWAL =====

// Cetakan data untuk satu transaksi parkir
interface Parkir {
  id: string; // kode unik, contoh "PKR-001"
  platNomor: string; // plat nomor kendaraan
  jenisKendaraan: number; // kode jenis kendaraan (1 = Motor, 2 = Mobil, 3 = Lainnya)
  lamaParkir: number; // lama parkir dalam jam
  hariParkir: number; // kode hari parkir (1 sampai 7)
  member: boolean; // true jika pelanggan adalah member
  karcisHilang: boolean; // true jika karcis hilang
  totalBayar: number; // total biaya setelah pembulatan (rupiah)
}

// Array penyimpanan seluruh data parkir, berisi 5 data awal (seed data)
// Catatan: nilai totalBayar masih sementara, nanti disesuaikan dengan fungsi perhitungan
const dataParkir: Parkir[] = [
  { id: "PKR-001", platNomor: "N 1234 AB", jenisKendaraan: 1, lamaParkir: 2, hariParkir: 1, member: false, karcisHilang: false, totalBayar: 4000 },
  { id: "PKR-002", platNomor: "N 5678 CD", jenisKendaraan: 2, lamaParkir: 3, hariParkir: 2, member: true, karcisHilang: false, totalBayar: 9000 },
  { id: "PKR-003", platNomor: "L 9012 EF", jenisKendaraan: 1, lamaParkir: 5, hariParkir: 6, member: false, karcisHilang: true, totalBayar: 15000 },
  { id: "PKR-004", platNomor: "AG 3456 GH", jenisKendaraan: 2, lamaParkir: 1, hariParkir: 7, member: false, karcisHilang: false, totalBayar: 5000 },
  { id: "PKR-005", platNomor: "N 7890 IJ", jenisKendaraan: 3, lamaParkir: 4, hariParkir: 3, member: true, karcisHilang: false, totalBayar: 12000 },
];

// ===== BAGIAN 2: FUNGSI BANTU VALIDASI INPUT =====

// Mengecek apakah teks tidak kosong (spasi di awal/akhir diabaikan)
function validasiTeks(teks: string): boolean {
  return teks.trim().length > 0;
}

// Mengecek apakah teks berupa angka yang valid (bukan kosong, bukan huruf, tidak negatif)
function validasiAngka(teks: string): boolean {
  const angka: number = Number(teks);
  return validasiTeks(teks) && !isNaN(angka) && angka >= 0;
}

// ===== BAGIAN 3: FITUR CREATE (Nara - dikerjakan di Progress 3) =====
// Fungsi tambah data parkir akan ditulis di sini


// ===== BAGIAN 4: FITUR READ, UPDATE, DAN PERHITUNGAN (Hafiz) =====
const namaJenis = (kode: number): string =>
  kode === 1 ? "Motor" : kode === 2 ? "Mobil" : "Lainnya";

// ===== READ =====
function tampilSemua(data: Parkir[]): void {
  if (data.length === 0) {
    console.log("Data kosong.");
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    if (!p) continue;
    console.log(
      `${i + 1}. ${p.id} | ${p.platNomor} | ${namaJenis(p.jenisKendaraan)} | ${p.lamaParkir} jam | Rp${p.totalBayar}`
    );
  }
}

function tampilDetail(data: Parkir[], id: string): void {
  const p = data.find(item => item.id.toLowerCase() === id.toLowerCase());
  if (!p) {
    console.log("Data dengan id tersebut tidak ditemukan.");
    return;
  }
  console.log(`Id            : ${p.id}`);
  console.log(`Plat Nomor    : ${p.platNomor}`);
  console.log(`Jenis         : ${namaJenis(p.jenisKendaraan)}`);
  console.log(`Lama Parkir   : ${p.lamaParkir} jam`);
  console.log(`Hari Parkir   : ${p.hariParkir}`);
  console.log(`Member        : ${p.member ? "Ya" : "Tidak"}`);
  console.log(`Karcis Hilang : ${p.karcisHilang ? "Ya" : "Tidak"}`);
  console.log(`Total Bayar   : Rp${p.totalBayar}`);
}

// ===== UPDATE =====
function updateData(
  data: Parkir[],
  id: string,
  platBaru: string,
  lamaBaru: number
): void {
  const index = data.findIndex(item => item.id.toLowerCase() === id.toLowerCase());
  const target = data[index];
  if (index === -1 || !target) {
    console.log("Id tidak ditemukan.");
    return;
  }
  target.platNomor = platBaru;
  target.lamaParkir = lamaBaru;
  console.log("Data berhasil diperbarui.");
}

// ===== PERHITUNGAN (return nilai) =====
function hitungTotalPendapatan(data: Parkir[]): number {
  return data.reduce((total, item) => total + item.totalBayar, 0);
}

function hitungRataRata(data: Parkir[]): number {
  if (data.length === 0) return 0;
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i]?.totalBayar ?? 0;
  }
  return total / data.length;
}

function hitungJumlahPerJenis(data: Parkir[], kode: number): number {
  return data.filter(item => item.jenisKendaraan === kode).length;
}

// ===== VOID (tampil) =====
function tampilRingkasan(data: Parkir[]): void {
  console.log(`Total pendapatan : Rp${hitungTotalPendapatan(data)}`);
  console.log(`Rata-rata bayar  : Rp${hitungRataRata(data)}`);
  console.log(`Jumlah motor     : ${hitungJumlahPerJenis(data, 1)}`);
  console.log(`Jumlah mobil     : ${hitungJumlahPerJenis(data, 2)}`);
}


// ===== BAGIAN 5: FITUR DELETE DAN SEARCH (Haikal) =====
// Fungsi hapus data dan cari data akan ditulis di sini


// ===== BAGIAN 6: MENU UTAMA (Nara) =====

// Menampilkan daftar menu ke layar
function tampilkanMenu(): void {
  console.log("\n===== PARKEERIN =====");
  console.log(`Jumlah data tersimpan: ${dataParkir.length}`);
  console.log("1. Tambah data parkir (Create)");
  console.log("2. Lihat data parkir (Read)");
  console.log("3. Ubah data parkir (Update)");
  console.log("4. Hapus data parkir (Delete)");
  console.log("5. Cari data parkir (Search)");
  console.log("0. Keluar");
  console.log("=====================");
}

// Membaca pilihan menu dari pengguna, mengembalikan -1 jika input tidak valid
function bacaPilihanMenu(): number {
  const masukan: string = readlineSync.question("Pilih menu: ");
  // input harus berupa angka bulat, selain itu dianggap tidak valid
  if (!validasiAngka(masukan) || !Number.isInteger(Number(masukan))) {
    return -1;
  }
  return Number(masukan);
}

// Menjalankan menu berulang sampai pengguna memilih keluar (0)
function jalankanProgram(): void {
  let pilihan: number;

  do {
    tampilkanMenu();
    pilihan = bacaPilihanMenu();

    switch (pilihan) {
      case 1:
        console.log("Fitur Tambah data belum tersedia.");
        break;
      case 2:
        console.log("Fitur Lihat data belum tersedia.");
        break;
      case 3:
        console.log("Fitur Ubah data belum tersedia.");
        break;
      case 4:
        console.log("Fitur Hapus data belum tersedia.");
        break;
      case 5:
        console.log("Fitur Cari data belum tersedia.");
        break;
      case 0:
        console.log("Terima kasih, program selesai.");
        break;
      default:
        // pilihan di luar 0-5 atau bukan angka bulat
        console.log("Pilihan tidak valid! Masukkan angka 0 sampai 5.");
    }
  } while (pilihan !== 0);
}

// Titik awal program
jalankanProgram();