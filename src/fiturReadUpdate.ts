interface Parkir {
  id: string;
  platNomor: string;
  jenisKendaraan: number;
  lamaParkir: number;
  hariParkir: number;
  member: boolean;
  karcisHilang: boolean;
  totalBayar: number;
}

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