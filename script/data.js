const STORAGE_KEY = "READING_LIST";

let list = [];

// memeriksa apakah penyimpanan lokal didukung oleh browser
function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

// menyimpan data buku ke penyimpanan lokal
function saveData() {
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// memuat data buku dari penyimpanan lokal
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null)
        list = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

// memperbarui data buku ke penyimpanan lokal jika penyimpanan didukung
function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

// membuat objek buku dengan properti tertentu
function buatObjekBuku(judul, penulis, tahun, waktu, selesai) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        waktu,
        selesai
    };
}

// mencari buku berdasarkan ID
function cariBuku(idBuku) {
    for (book of list) {
        if (book.id === idBuku)
            return book;
    }
    return null;
}

// mencari indeks buku berdasarkan ID
function cariIndeksBuku(idBuku) {
    let index = 0;
    for (book of list) {
        if (book.id === idBuku)
            return index;
        index++;
    }
    return -1;
}

// memperbarui tampilan daftar buku pada halaman
function refreshDataFromList() {
    const listBelumSelesai = document.getElementById(ID_LIST_BELUM);
    let listSelesai = document.getElementById(ID_LIST_SUDAH);
    for (book of list) {
        const bukuBaru = buatListBaca(book.judul, book.penulis, book.tahun, book.waktu, book.selesai);
        bukuBaru[ID_BUKU] = book.id;
        if (book.selesai) {
            listSelesai.append(bukuBaru);
        } else {
            listBelumSelesai.append(bukuBaru);
        }
    }
}
