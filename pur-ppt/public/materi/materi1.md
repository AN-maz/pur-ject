# Pertemuan 9: React Lanjutan
**Interaktivitas dan Siklus Hidup Komponen**

---

## Poin yang akan dibahas

2. Event dan Forms
3. Conditional Rendering
4. List Rendering
5. Siklus Hidup Komponen
6. Effect Hook (useEffect)

---

## Pendahuluan

**Recap Pertemuan 8 — Dasar React:**

- JSX dan penulisan React
- Components
- Props (data antar component)
- useState (data yang sering berubah)

→ Component masih **diam**, perubahan state hanya dari kode manual.

---

## Pendahuluan — Yang akan dipelajari

**Pertemuan ini = component yang *hidup dan merespons*:**

- **Event & Forms** → `setState` dipicu oleh klik/ketik user
- **Conditional Rendering** → tampilan berubah sesuai state
- **List Rendering** → menampilkan data array (dari API dll)
- **useEffect** → efek samping setelah render (termasuk mount/update/unmount)

---

## Event dan Forms — Event Handling

Penulisan event di React menggunakan **camelCase**:

| HTML | React |
|------|-------|
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |

```jsx
<button onClick={() => onNavigate(link.id)}>
  {link.label}
</button>
```

---

## Event yang Sering Dipakai

| Event | Kapan dipicu |
|---|---|
| `onClick` | Elemen diklik |
| `onChange` | Input/textarea/select berubah |
| `onSubmit` | Form dikirim |
| `onKeyDown` / `onKeyUp` | Tombol keyboard ditekan/dilepas |
| `onMouseEnter` / `onMouseLeave` | Kursor masuk/keluar elemen |
| `onFocus` / `onBlur` | Elemen mendapat/kehilangan fokus |

---

## ⚠️ Common Error — Event Handling

```jsx
// ❌ SALAH — fungsi langsung dipanggil saat render!
<button onClick={handleClick()}>Klik</button>

// ✅ BENAR — berikan referensi fungsi
<button onClick={handleClick}>Klik</button>

// ✅ BENAR — pakai arrow function untuk parameter
<button onClick={() => handleClick(id)}>Klik</button>
```

> Fungsi akan langsung jalan setiap render jika ditulis `onClick={handleClick()}` — bukan saat tombol diklik!

---

## Event dan Forms — Controlled Components

**Controlled Component** → React memegang kendali penuh nilai input melalui `useState`.

- Nilai input **selalu** sinkron dengan state
- Input tidak menyimpan nilainya sendiri di DOM

**Uncontrolled Component** → input dibiarkan mengatur diri sendiri lewat DOM (biasanya pakai `useRef`). Di materi ini fokus ke *Controlled*.

---

## Contoh Controlled Components

```jsx
function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pesan terkirim dari ${form.name}`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <textarea name="message" value={form.message} onChange={handleChange} />
      <button type="submit">Kirim Pesan</button>
    </form>
  );
}
```

---

## 💡 Pro-Tips Forms

| Tips | Penjelasan |
|---|---|
| **Computed Property Name** | `[e.target.name]` — satu fungsi `handleChange` untuk semua input |
| **e.preventDefault()** | Wajib di `onSubmit` agar browser tidak refresh |
| **Jangan lupa onChange!** | `value={form.name}` tanpa `onChange` → input read-only, muncul warning |

---

<!-- quiz -->
## Quiz: Event & Forms

Pertanyaan 1: Apa yang terjadi jika kamu menulis `onClick={handleClick()}` pada elemen button di React?

- [ ] Fungsi akan berjalan saat tombol diklik oleh user
- [x] Fungsi akan berjalan setiap component di-render
- [ ] React akan melempar error sintaks
- [ ] Tidak terjadi apa-apa, React mengabaikannya

Pertanyaan 2: Kenapa kita perlu memanggil `e.preventDefault()` di dalam fungsi `handleSubmit` pada form React?

- [ ] Agar input form tidak bisa diketik lagi setelah submit
- [x] Agar browser tidak melakukan refresh halaman saat submit
- [ ] Agar state form otomatis ter-reset
- [ ] Agar tombol submit berubah warna

---

## Conditional Rendering — Ternary Operator

Cara paling umum di JSX. Cocok untuk 2 kemungkinan hasil.

```jsx
// Toggle icon berdasarkan state `open`
{open ? (
  <path d="M6 18L18 6M6 6l12 12" />   // Icon X
) : (
  <path d="M4 6h16M4 12h16M4 18h16" /> // Icon hamburger
)}
```

```jsx
// Styling link aktif
<button className={`... ${activePage === link.id
  ? 'bg-primary text-white'
  : 'text-white/70 hover:text-white'
}`}>
  {link.label}
</button>
```

---

## Conditional Rendering — Logical AND `&&`

Gunakan saat **hanya** ingin menampilkan sesuatu ketika kondisi `true`.

```jsx
// Menu mobile hanya muncul saat open = true
{open && (
  <div className="md:hidden bg-dark px-4 pb-4">
    {/* menu links mobile */}
  </div>
)}

// Pesan sukses setelah submit
{submitted && (
  <p className="text-green-500">
    Terima kasih! Pesan berhasil dikirim.
  </p>
)}
```

---

## ⚠️ Jebakan `&&` dengan Angka

```jsx
// ❗️ Jika cartItems.length = 0, React render angka "0"!
{cartItems.length && <p>Ada barang di keranjang</p>}

// ✅ Perbaikan: ubah ke boolean eksplisit
{cartItems.length > 0 && <p>Ada barang di keranjang</p>}
```

> `0` dianggap valid untuk di-render oleh React! Selalu gunakan kondisi boolean.

---

## Conditional Rendering — If/Else Sebelum Return

Untuk logika kompleks atau component yang benar-benar berbeda:

```jsx
function StatusPesanan({ status }) {
  if (status === 'loading') {
    return <p>Memuat data pesanan...</p>;
  }

  if (status === 'error') {
    return <p className="text-red-500">Gagal memuat data.</p>;
  }

  return <p>Pesanan berhasil ditemukan!</p>;
}
```

---

## Conditional Rendering — Switch untuk Routing

```jsx
function renderView() {
  switch (activePage) {
    case 'about':
      return <AboutView />;
    case 'contact':
      return <ContactView />;
    default:
      return <HomeView onNavigate={setActivePage} />;
  }
}
```

---

<!-- quiz -->
## Quiz: Conditional Rendering

Pertanyaan 1: Apa yang akan ditampilkan React jika kode berikut dijalankan dengan `cartItems` adalah array kosong `[]`?

```jsx
{cartItems.length && <p>Ada barang di keranjang</p>}
```

- [ ] Teks "Ada barang di keranjang"
- [x] Angka "0"
- [ ] Tidak menampilkan apa pun
- [ ] Error "Cannot read property length"

Pertanyaan 2: Kapan waktu yang tepat menggunakan `if/else` sebelum `return`, bukan ternary di dalam JSX?

- [ ] Saat hanya ada 2 kemungkinan tampilan
- [ ] Saat kondisi berupa boolean true/false
- [x] Saat component me-return struktur yang benar-benar berbeda tiap kondisi
- [ ] Saat menampilkan/menyembunyikan satu elemen kecil

---

## List Rendering

Gunakan `map()` untuk mengubah setiap item array menjadi elemen JSX.

```jsx
function HomeView() {
  return (
    <section>
      <h2>Layanan Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <FeatureCard
            key={service.id}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}
```

---

## ⚠️ Pentingnya `key`

Setiap item di `map()` WAJIB punya atribut **`key`** yang unik.

| Key | Kapan dipakai |
|---|---|
| `key={item.id}` | **✅ Paling aman** — dari database/API |
| `key={index}` | **⚠️ Hanya** jika data statis (tidak di-sort/ditambah/dihapus) |

> `key` membantu React mengenali item mana yang berubah, ditambah, atau dihapus. Index bisa menyebabkan bug state.

💡 Bisa digabung dengan `filter()`:
```jsx
services.filter(s => s.active).map(s => <Card key={s.id} ... />)
```

---

<!-- quiz -->
## Quiz: List Rendering

Pertanyaan 1: Fungsi JavaScript apa yang digunakan untuk mengubah setiap item array menjadi elemen JSX di React?

- [ ] `filter()`
- [x] `map()`
- [ ] `reduce()`
- [ ] `forEach()`

Pertanyaan 2: Kenapa kita tidak boleh menggunakan `key={index}` jika data array bisa berubah urutannya (ditambah/dihapus/di-sort)?

- [ ] Karena index bisa bernilai negatif
- [x] Karena React bisa salah mencocokkan elemen lama dengan yang baru, menyebabkan bug state
- [ ] Karena index tidak unik dalam satu array
- [ ] Karena index hanya tersedia di JavaScript versi ES6 ke atas

---

## Siklus Hidup Komponen

Setiap component React punya 3 fase:

| Fase | Analogi | Penjelasan |
|---|---|---|
| **Mount** (lahir) | Menyalakan lampu | Pertama kali ditampilkan ke DOM |
| **Update** (berubah) | Ganti warna lampu | Render ulang karena state/props berubah |
| **Unmount** (mati) | Mematikan lampu | Dihapus dari layar |

> Dulu pakai 3 method terpisah (`componentDidMount`, dll). Sekarang cukup **satu hook**: `useEffect`.

---

## useEffect — Effect Hook

Menjalankan **efek samping** (*side effects*) setelah render:

| Efek Samping | Contoh |
|---|---|
| Ubah judul tab | `document.title = ...` |
| Scroll otomatis | `window.scrollTo(0, 0)` |
| Fetch API | `fetch(url).then(...)` |
| Timer | `setInterval` / `setTimeout` |
| Subscribe event | `addEventListener` |

> **Analogi:** "Hei component, kalau sudah selesai nampil di layar, tolong ubah judul tab browsernya ya."

---

## useEffect — Cara Pakai

```jsx
export function useDocumentTitle(pageName) {
  useEffect(() => {
    document.title = pageName ? `OXIGEN | ${pageName}` : 'OXIGEN';
    window.scrollTo(0, 0);
  }, [pageName]);
}

// Pakai di komponen
function App() {
  const [activePage, setActivePage] = useState('home');
  useDocumentTitle(activePage);
  // ...
}
```

---

## Aturan Dependency Array

Array di akhir `useEffect` menentukan **kapan** efek dijalankan:

| Dependency | Kapan jalan |
|---|---|
| **(tanpa array)** | Setiap selesai render (mount + update) — boros! |
| **`[]`** (kosong) | **Satu kali** — saat mount |
| **`[data]`** | Saat mount + saat `data` berubah |

```jsx
useEffect(() => { ... })           // setiap render
useEffect(() => { ... }, [])       // sekali (mount)
useEffect(() => { ... }, [data])   // mount + saat data berubah
```

---

## Cleanup Function — Fase Unmount

`useEffect` bisa **return fungsi** yang otomatis jalan sebelum efek dijalankan ulang atau saat component **unmount**.

```jsx
function JamDigital() {
  const [waktu, setWaktu] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setWaktu(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup!
  }, []);

  return <p>Waktu sekarang: {waktu.toLocaleTimeString()}</p>;
}
```

> **Wajib cleanup** kalau efek memasang `setInterval`, `addEventListener`, atau subscription — agar tidak terjadi **memory leak**!

---

<!-- quiz -->
## Quiz: useEffect

Pertanyaan 1: Kapan efek di dalam `useEffect(() => {...}, [])` dijalankan?

- [ ] Setiap kali component di-render
- [x] Satu kali saja, saat component pertama kali muncul (mount)
- [ ] Saat component di-unmount
- [ ] Setiap kali state berubah

Pertanyaan 2: Apa fungsi dari *cleanup function* yang di-*return* dari `useEffect`?

- [ ] Membersihkan state component
- [ ] Membatalkan render sebelumnya
- [x] Membersihkan efek samping (seperti interval/event listener) sebelum efek dijalankan ulang atau saat component unmount
- [ ] Menghapus component dari DOM

---

## Latihan 1 — Navigation Master 🥉

**Topik:** Event Handling + Conditional Rendering

```jsx
function NavigasiSederhana() {
  const [activePage, setActivePage] = useState('beranda');
  const menu = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'kontak', label: 'Kontak' },
  ];

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        {/* TODO: map menu → tombol.
            activePage === item.id → bg biru, teks putih
            else → teks abu-abu */}
      </ul>
      <div>
        {/* TODO: tampilkan konten sesuai activePage */}
      </div>
    </nav>
  );
}
```

---

## Latihan 2 — Form Handler 🥈

**Topik:** Event & Forms (Controlled Components)

```jsx
function FormDaftar() {
  // TODO: state form { nama, email, pesan }
  // TODO: state submitted = false
  // TODO: handleChange + handleSubmit
  //       handleSubmit: e.preventDefault(), set submitted true,
  //       reset form, setTimeout reset submitted 3 detik

  return (
    <form>
      {/* TODO: pesan sukses jika submitted true */}
      {/* TODO: input nama, email, textarea (controlled) */}
      {/* TODO: tombol submit */}
    </form>
  );
}
```

---

## Latihan 3 — List Mapper 🥉

**Topik:** List Rendering

```jsx
function DaftarLayanan() {
  const layanan = [
    { id: 1, judul: 'Kursus Bahasa', deskripsi: 'Belajar bahasa Inggris, Mandarin, dan Korea' },
    { id: 2, judul: 'Cultural Exchange', deskripsi: 'Program pertukaran budaya internasional' },
    { id: 3, judul: 'Debat & Diskusi', deskripsi: 'Forum diskusi bahasa Inggris mingguan' },
  ];

  return (
    <section>
      <h2>Layanan Kami</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {/* TODO: map layanan → judul (heading) + deskripsi (paragraf), key={item.id} */}
      </div>
    </section>
  );
}
```

---

## Latihan 4 — Effect Wizard 🥈

**Topik:** useEffect

```jsx
import { useEffect } from 'react';

export function usePageTitle(title) {
  // TODO: useEffect untuk ubah document.title
  //       Format: "OXIGEN | {title}"
  //       Dependency: [title]
}

// Cara pakai:
// usePageTitle('Beranda');
```

---

## Latihan 5 — Lifecycle Guardian 🥇

**Topik:** Cleanup Function

```jsx
function Stopwatch() {
  const [detik, setDetik] = useState(0);
  const [aktif, setAktif] = useState(false);

  // TODO: useEffect tergantung `aktif`
  //       aktif=true → setInterval tiap 1000ms (tambah detik)
  //       return cleanup → clearInterval

  return (
    <div>
      <p>Waktu: {detik} detik</p>
      {/* TODO: tombol toggle `aktif` (Mulai/Berhenti) */}
      {/* TODO: tombol reset → detik = 0 */}
    </div>
  );
}
```

---

## 📚 Referensi

- [React Docs: Responding to Events](https://react.dev/learn/responding-to-events)
- [React Docs: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [React Docs: Rendering Lists](https://react.dev/learn/rendering-lists)
- [React Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React Docs: Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)

---

**Selamat Berlatih!**

Jangan takut *error*, karena *error* adalah cara React mengajakmu berbicara. Jika mentok, lihat kembali kode project OXIGEN sebagai referensi, istirahat sejenak, minum air, dan mari diskusikan kembali!