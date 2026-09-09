# API Contract Hadiruna

## Aplikasi Absensi Siswa untuk SMA Islam dan Madrasah Aliyah

| Informasi | Keterangan |
|---|---|
| Dokumen | REST API Contract |
| Produk | Hadiruna *(nama sementara)* |
| Backend | Hono.js |
| Database | SQLite 3 |
| Format data | JSON |
| Versi API | v1 |
| Acuan | PRD, Sitemap, User Flow, UI Style Guide, dan Database Schema Hadiruna v1.0 |
| Versi dokumen | 1.0 |
| Tanggal | 8 September 2026 |

## 1. Tujuan

Dokumen ini menetapkan kontrak komunikasi antara frontend React dan backend Hono.js untuk prototype Hadiruna. Kontrak mencakup autentikasi guru, jadwal harian, pembukaan sesi, pengisian kehadiran dengan autosave, penutupan, pembukaan kembali, dan riwayat absensi.

Kontrak tidak menyediakan endpoint CRUD admin, pengelolaan data master, absensi siswa, notifikasi orang tua, atau laporan semester.

## 2. Konvensi Umum

### Base URL

```text
/api/v1
```

Contoh pengembangan lokal:

```text
http://localhost:3000/api/v1
```

### Content Type

Permintaan dan respons JSON menggunakan:

```http
Content-Type: application/json
Accept: application/json
```

### Penamaan

- URL menggunakan bentuk jamak dan `kebab-case`.
- Properti JSON menggunakan `camelCase`.
- Nama tabel/kolom SQLite tetap menggunakan `snake_case`.
- ID dikirim sebagai number karena schema memakai `INTEGER PRIMARY KEY`.

### Waktu dan Tanggal

| Data | Format | Zona |
|---|---|---|
| Tanggal absensi | `YYYY-MM-DD` | Tanggal lokal sekolah |
| Timestamp kejadian | ISO-8601 | UTC |
| Jam jadwal | `HH:MM` | Waktu lokal sekolah |

Contoh timestamp:

```text
2026-09-08T03:15:20.123Z
```

### Response Sukses

Objek tunggal:

```json
{
  "data": {}
}
```

Koleksi:

```json
{
  "data": [],
  "meta": {
    "total": 0
  }
}
```

### Response Error

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data yang dikirim belum valid.",
    "fields": [
      {
        "field": "email",
        "message": "Format email tidak valid."
      }
    ],
    "requestId": "req_01J7C8M1D3"
  }
}
```

`fields` bersifat opsional dan hanya dikirim jika error berkaitan dengan input tertentu. Backend mengirim `X-Request-Id` pada setiap respons dan menggunakan nilai yang sama pada `error.requestId`.

## 3. Autentikasi

### Mekanisme

Prototype menggunakan token sesi bertanda tangan yang disimpan dalam cookie:

```http
Set-Cookie: hadiruna_session=<token>; HttpOnly; SameSite=Lax; Path=/
```

Pada production HTTPS, cookie juga wajib memakai `Secure`. JavaScript frontend tidak membaca token secara langsung; browser mengirim cookie pada setiap request.

Frontend yang berjalan pada origin berbeda harus menggunakan `credentials: "include"`. Untuk prototype, frontend dan API disarankan berada pada origin yang sama agar konfigurasi lebih sederhana dan aman.

### Masa Sesi

- Durasi yang direkomendasikan untuk demo: 8 jam.
- Token memuat minimal `userId`, waktu terbit, dan waktu kedaluwarsa.
- Backend tetap memeriksa `users.is_active` saat mengambil identitas pengguna.

### Keamanan Request Mutasi

- Gunakan `SameSite=Lax`.
- Validasi header `Origin` pada `POST`, `PATCH`, `PUT`, dan `DELETE`.
- Batasi CORS pada origin frontend yang diketahui.
- Jangan memasukkan password hash atau token sesi ke response JSON.

## 4. Enum

### Status Sesi

```text
open | closed
```

### Status Jadwal Turunan

```text
not_opened | open | closed
```

`not_opened` tidak disimpan pada database. Nilai tersebut berarti belum ada sesi untuk jadwal dan tanggal yang diminta.

### Status Kehadiran

```text
present | excused | sick | absent | late
```

Pemetaan ke UI:

| API | UI |
|---|---|
| `present` | Hadir |
| `excused` | Izin |
| `sick` | Sakit |
| `absent` | Alpa |
| `late` | Terlambat |

## 5. Model Data Response

### AuthenticatedTeacher

```json
{
  "userId": 1,
  "teacherId": 1,
  "email": "ahmad.fauzan@hadiruna.test",
  "employeeNumber": "NIP-DEMO-01",
  "fullName": "Ahmad Fauzan, S.Pd."
}
```

### ScheduleSummary

```json
{
  "id": 12,
  "subject": {
    "id": 3,
    "code": "INF",
    "name": "Informatika"
  },
  "class": {
    "id": 5,
    "name": "XI IPA 2",
    "gradeLevel": 11,
    "major": "IPA"
  },
  "dayOfWeek": 2,
  "startTime": "10:00",
  "endTime": "11:30",
  "room": "Lab Komputer",
  "timingStatus": "in_progress",
  "attendance": {
    "status": "not_opened",
    "sessionId": null
  }
}
```

`timingStatus` merupakan nilai presentasi waktu dan memiliki enum:

```text
upcoming | in_progress | finished
```

Nilai ini tidak membatasi pembukaan sesi pada mode prototype.

### AttendanceSummary

```json
{
  "totalStudents": 25,
  "presentCount": 21,
  "excusedCount": 1,
  "sickCount": 1,
  "absentCount": 1,
  "lateCount": 1,
  "attendancePercentage": 84
}
```

Sesuai keputusan schema v1.0, persentase dihitung dari `presentCount / totalStudents × 100`. Status `late` ditampilkan terpisah dan tidak masuk pembilang.

### AttendanceRecord

```json
{
  "id": 201,
  "student": {
    "id": 51,
    "studentNumber": "S001",
    "fullName": "Aisyah Rahma"
  },
  "status": "present",
  "note": null,
  "version": 1,
  "updatedAt": "2026-09-08T03:02:10.200Z"
}
```

### AttendanceSessionDetail

```json
{
  "id": 81,
  "attendanceDate": "2026-09-08",
  "status": "open",
  "openedAt": "2026-09-08T03:00:00.000Z",
  "closedAt": null,
  "schedule": {
    "id": 12,
    "subjectName": "Informatika",
    "className": "XI IPA 2",
    "startTime": "10:00",
    "endTime": "11:30",
    "room": "Lab Komputer"
  },
  "summary": {
    "totalStudents": 25,
    "presentCount": 25,
    "excusedCount": 0,
    "sickCount": 0,
    "absentCount": 0,
    "lateCount": 0,
    "attendancePercentage": 100
  },
  "records": [],
  "reopenLogs": []
}
```

## 6. Ringkasan Endpoint

| Method | Endpoint | Auth | Tujuan |
|---|---|---:|---|
| GET | `/health` | Tidak | Memeriksa kesiapan API |
| POST | `/auth/login` | Tidak | Login guru |
| GET | `/auth/me` | Ya | Mengambil identitas guru aktif |
| POST | `/auth/logout` | Ya | Logout guru |
| GET | `/schedules/today` | Ya | Jadwal guru pada tanggal tertentu |
| GET | `/schedules/:scheduleId` | Ya | Detail jadwal dan status sesi |
| POST | `/schedules/:scheduleId/attendance-sessions` | Ya | Membuka atau mengambil sesi |
| GET | `/attendance-sessions/:sessionId` | Ya | Detail sesi, record, dan ringkasan |
| GET | `/attendance-sessions` | Ya | Riwayat sesi guru |
| PATCH | `/attendance-records/:recordId` | Ya | Autosave status/catatan siswa |
| POST | `/attendance-sessions/:sessionId/close` | Ya | Menutup sesi |
| POST | `/attendance-sessions/:sessionId/reopen` | Ya | Membuka kembali sesi |

## 7. Health Check

### GET `/health`

Memastikan proses API dan koneksi database siap digunakan.

#### Response `200 OK`

```json
{
  "data": {
    "status": "ok",
    "database": "connected",
    "timestamp": "2026-09-08T03:00:00.000Z"
  }
}
```

#### Response `503 Service Unavailable`

```json
{
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Layanan sementara tidak tersedia.",
    "requestId": "req_01J7C8M1D3"
  }
}
```

Endpoint tidak mengungkap versi dependency, path database, atau detail error internal.

## 8. Authentication Endpoints

### 8.1 POST `/auth/login`

Memverifikasi email dan kata sandi guru.

#### Request

```json
{
  "email": "ahmad.fauzan@hadiruna.test",
  "password": "demo-password"
}
```

#### Validasi

| Field | Aturan |
|---|---|
| `email` | Wajib, format email, maksimal 254 karakter |
| `password` | Wajib, string |

#### Response `200 OK`

Mengirim cookie sesi dan data guru.

```json
{
  "data": {
    "userId": 1,
    "teacherId": 1,
    "email": "ahmad.fauzan@hadiruna.test",
    "employeeNumber": "NIP-DEMO-01",
    "fullName": "Ahmad Fauzan, S.Pd."
  }
}
```

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 400 | `INVALID_JSON` | Body bukan JSON valid |
| 422 | `VALIDATION_ERROR` | Input kosong atau format salah |
| 401 | `INVALID_CREDENTIALS` | Email atau kata sandi salah |
| 403 | `ACCOUNT_INACTIVE` | Akun dinonaktifkan |
| 429 | `TOO_MANY_ATTEMPTS` | Percobaan login terlalu banyak |

Pesan untuk email yang tidak ditemukan dan kata sandi salah harus sama.

### 8.2 GET `/auth/me`

Mengambil pengguna yang sedang login. Endpoint digunakan ketika aplikasi dimuat ulang.

#### Response `200 OK`

```json
{
  "data": {
    "userId": 1,
    "teacherId": 1,
    "email": "ahmad.fauzan@hadiruna.test",
    "employeeNumber": "NIP-DEMO-01",
    "fullName": "Ahmad Fauzan, S.Pd."
  }
}
```

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Cookie hilang, tidak valid, atau kedaluwarsa |
| 403 | `ACCOUNT_INACTIVE` | Akun sudah dinonaktifkan |

### 8.3 POST `/auth/logout`

Menghapus cookie sesi.

#### Response `204 No Content`

Tidak memiliki response body. Backend mengirim cookie dengan nilai kosong dan masa berlaku yang telah berakhir.

## 9. Schedule Endpoints

### 9.1 GET `/schedules/today`

Mengambil jadwal milik guru untuk tanggal lokal sekolah tertentu.

#### Query Parameter

| Parameter | Wajib | Format | Default |
|---|---:|---|---|
| `date` | Tidak | `YYYY-MM-DD` | Tanggal lokal sekolah hari ini |

Contoh:

```http
GET /api/v1/schedules/today?date=2026-09-08
```

#### Response `200 OK`

```json
{
  "data": [
    {
      "id": 12,
      "subject": {
        "id": 3,
        "code": "INF",
        "name": "Informatika"
      },
      "class": {
        "id": 5,
        "name": "XI IPA 2",
        "gradeLevel": 11,
        "major": "IPA"
      },
      "dayOfWeek": 2,
      "startTime": "10:00",
      "endTime": "11:30",
      "room": "Lab Komputer",
      "timingStatus": "in_progress",
      "attendance": {
        "status": "not_opened",
        "sessionId": null
      }
    }
  ],
  "meta": {
    "date": "2026-09-08",
    "total": 1,
    "notOpenedCount": 1,
    "openCount": 0,
    "closedCount": 0
  }
}
```

Daftar diurutkan berdasarkan `startTime` menaik.

#### Empty Response

```json
{
  "data": [],
  "meta": {
    "date": "2026-09-08",
    "total": 0,
    "notOpenedCount": 0,
    "openCount": 0,
    "closedCount": 0
  }
}
```

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login |
| 422 | `VALIDATION_ERROR` | Format tanggal tidak valid |

### 9.2 GET `/schedules/:scheduleId`

Mengambil detail jadwal, jumlah siswa, pratinjau siswa, dan sesi untuk tanggal yang dipilih.

#### Path dan Query

| Parameter | Lokasi | Wajib | Keterangan |
|---|---|---:|---|
| `scheduleId` | Path | Ya | ID jadwal |
| `date` | Query | Tidak | Default tanggal lokal hari ini |

#### Response `200 OK`

```json
{
  "data": {
    "id": 12,
    "subject": {
      "id": 3,
      "code": "INF",
      "name": "Informatika"
    },
    "class": {
      "id": 5,
      "name": "XI IPA 2",
      "gradeLevel": 11,
      "major": "IPA"
    },
    "date": "2026-09-08",
    "dayOfWeek": 2,
    "startTime": "10:00",
    "endTime": "11:30",
    "room": "Lab Komputer",
    "studentCount": 25,
    "studentPreview": [
      {
        "id": 51,
        "studentNumber": "S001",
        "fullName": "Aisyah Rahma"
      }
    ],
    "attendance": {
      "status": "not_opened",
      "sessionId": null
    }
  }
}
```

`studentPreview` maksimal lima siswa dan diurutkan berdasarkan nama.

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login |
| 403 | `FORBIDDEN` | Jadwal bukan milik guru |
| 404 | `SCHEDULE_NOT_FOUND` | ID tidak ditemukan |
| 422 | `VALIDATION_ERROR` | ID atau tanggal tidak valid |

## 10. Attendance Session Endpoints

### 10.1 POST `/schedules/:scheduleId/attendance-sessions`

Membuka sesi baru atau mengembalikan sesi yang sudah ada untuk jadwal dan tanggal yang sama.

#### Request

```json
{
  "attendanceDate": "2026-09-08"
}
```

#### Proses Atomik

Dalam satu transaksi `BEGIN IMMEDIATE`, backend:

1. memverifikasi guru sebagai pemilik jadwal;
2. memeriksa sesi berdasarkan `scheduleId + attendanceDate`;
3. jika belum ada, membuat sesi `open`;
4. mengambil seluruh siswa aktif dalam kelas; dan
5. membuat record `present` untuk setiap siswa.

#### Response Sesi Baru `201 Created`

```json
{
  "data": {
    "created": true,
    "session": {
      "id": 81,
      "scheduleId": 12,
      "attendanceDate": "2026-09-08",
      "status": "open",
      "openedAt": "2026-09-08T03:00:00.000Z",
      "recordCount": 25
    }
  }
}
```

Response menyertakan header:

```http
Location: /api/v1/attendance-sessions/81
```

#### Response Sesi Sudah Ada `200 OK`

```json
{
  "data": {
    "created": false,
    "session": {
      "id": 81,
      "scheduleId": 12,
      "attendanceDate": "2026-09-08",
      "status": "open",
      "openedAt": "2026-09-08T03:00:00.000Z",
      "recordCount": 25
    }
  }
}
```

Frontend membuka Sesi Absensi jika status `open` atau Hasil Absensi jika status `closed`.

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login |
| 403 | `FORBIDDEN` | Jadwal bukan milik guru |
| 404 | `SCHEDULE_NOT_FOUND` | Jadwal tidak ditemukan |
| 409 | `CLASS_HAS_NO_STUDENTS` | Tidak ada siswa aktif dalam kelas |
| 422 | `VALIDATION_ERROR` | Tanggal tidak valid |
| 500 | `SESSION_CREATE_FAILED` | Transaksi gagal |

### 10.2 GET `/attendance-sessions/:sessionId`

Mengambil detail lengkap untuk halaman Sesi Absensi maupun Hasil Absensi. Frontend menentukan mode edit berdasarkan `data.status`.

#### Response `200 OK`

```json
{
  "data": {
    "id": 81,
    "attendanceDate": "2026-09-08",
    "status": "open",
    "openedAt": "2026-09-08T03:00:00.000Z",
    "closedAt": null,
    "schedule": {
      "id": 12,
      "subjectName": "Informatika",
      "className": "XI IPA 2",
      "startTime": "10:00",
      "endTime": "11:30",
      "room": "Lab Komputer"
    },
    "summary": {
      "totalStudents": 25,
      "presentCount": 21,
      "excusedCount": 1,
      "sickCount": 1,
      "absentCount": 1,
      "lateCount": 1,
      "attendancePercentage": 84
    },
    "records": [
      {
        "id": 201,
        "student": {
          "id": 51,
          "studentNumber": "S001",
          "fullName": "Aisyah Rahma"
        },
        "status": "present",
        "note": null,
        "version": 1,
        "updatedAt": "2026-09-08T03:02:10.200Z"
      }
    ],
    "reopenLogs": [
      {
        "id": 7,
        "reason": "Memperbaiki status kehadiran siswa.",
        "priorClosedAt": "2026-09-08T03:40:00.000Z",
        "reopenedAt": "2026-09-08T03:45:00.000Z"
      }
    ]
  }
}
```

`records` diurutkan berdasarkan nama siswa. `reopenLogs` diurutkan dari yang terbaru.

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login |
| 403 | `FORBIDDEN` | Sesi bukan milik guru |
| 404 | `SESSION_NOT_FOUND` | Sesi tidak ditemukan |
| 422 | `VALIDATION_ERROR` | ID tidak valid |

### 10.3 GET `/attendance-sessions`

Mengambil riwayat sesi milik guru yang sedang login.

#### Query Parameter

| Parameter | Wajib | Nilai | Default |
|---|---:|---|---|
| `status` | Tidak | `open`, `closed` | Semua |
| `q` | Tidak | Maks. 100 karakter | Kosong |
| `limit` | Tidak | 1–50 | 20 |

`q` mencari nama kelas atau mata pelajaran secara case-insensitive.

#### Response `200 OK`

```json
{
  "data": [
    {
      "id": 81,
      "attendanceDate": "2026-09-08",
      "status": "closed",
      "subjectName": "Informatika",
      "className": "XI IPA 2",
      "startTime": "10:00",
      "endTime": "11:30",
      "totalStudents": 25,
      "attendancePercentage": 84,
      "openedAt": "2026-09-08T03:00:00.000Z",
      "closedAt": "2026-09-08T03:40:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 20
  }
}
```

Urutan default: `attendanceDate` terbaru, lalu `startTime` terbaru.

Prototype tidak memakai pagination kompleks. Jika jumlah data melebihi `limit`, UI cukup menampilkan data sesuai batas; pengembangan production dapat menambahkan cursor pagination tanpa mengubah model item.

#### Error

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login |
| 422 | `VALIDATION_ERROR` | Status, query, atau limit tidak valid |

## 11. Attendance Record Endpoint

### PATCH `/attendance-records/:recordId`

Menyimpan perubahan status atau catatan siswa secara otomatis.

#### Request

```json
{
  "status": "late",
  "note": "Datang pukul 10.12",
  "version": 1
}
```

Semua properti wajib dikirim agar hasil akhir deterministik. `note` dapat bernilai `null`.

#### Validasi

| Field | Aturan |
|---|---|
| `status` | Salah satu enum status kehadiran |
| `note` | `null` atau string maksimal 500 karakter |
| `version` | Integer minimal 1 |

#### Update Database

```sql
UPDATE attendance_records
SET status = ?,
    note = ?,
    version = version + 1,
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE id = ?
  AND version = ?;
```

Backend lebih dahulu memverifikasi bahwa record berasal dari sesi milik guru dan sesi masih `open`.

#### Response `200 OK`

```json
{
  "data": {
    "record": {
      "id": 201,
      "studentId": 51,
      "status": "late",
      "note": "Datang pukul 10.12",
      "version": 2,
      "updatedAt": "2026-09-08T03:12:05.000Z"
    },
    "summary": {
      "totalStudents": 25,
      "presentCount": 21,
      "excusedCount": 1,
      "sickCount": 1,
      "absentCount": 1,
      "lateCount": 1,
      "attendancePercentage": 84
    }
  }
}
```

Ringkasan berasal dari data yang berhasil disimpan, sesuai keputusan User Flow.

#### Version Conflict `409 Conflict`

```json
{
  "error": {
    "code": "VERSION_CONFLICT",
    "message": "Data kehadiran telah berubah. Gunakan data terbaru.",
    "requestId": "req_01J7C8M1D3",
    "currentRecord": {
      "id": 201,
      "status": "present",
      "note": null,
      "version": 2,
      "updatedAt": "2026-09-08T03:11:58.000Z"
    }
  }
}
```

Frontend mengganti data lokal dengan `currentRecord`, memberi tahu guru bahwa data diperbarui, lalu membiarkan guru memilih ulang jika diperlukan.

#### Error Lain

| Status | Code | Kondisi |
|---:|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login |
| 403 | `FORBIDDEN` | Record bukan bagian sesi milik guru |
| 404 | `ATTENDANCE_RECORD_NOT_FOUND` | Record tidak ditemukan |
| 409 | `SESSION_CLOSED` | Sesi telah ditutup |
| 422 | `VALIDATION_ERROR` | Status, catatan, atau version tidak valid |

## 12. Session Action Endpoints

### 12.1 POST `/attendance-sessions/:sessionId/close`

Menutup dan mengunci sesi absensi.

#### Request

Tidak membutuhkan body.

```http
POST /api/v1/attendance-sessions/81/close
```

#### Proses Atomik

Dalam satu transaksi, backend:

1. memverifikasi kepemilikan sesi;
2. memastikan status masih `open`;
3. memastikan sesi memiliki record;
4. menghitung ringkasan dari database;
5. mengubah status menjadi `closed`;
6. mengisi `closedByUserId` dan `closedAt`; dan
7. memperbarui `updatedAt`.

#### Response `200 OK`

```json
{
  "data": {
    "id": 81,
    "status": "closed",
    "closedAt": "2026-09-08T03:40:00.000Z",
    "summary": {
      "totalStudents": 25,
      "presentCount": 21,
      "excusedCount": 1,
      "sickCount": 1,
      "absentCount": 1,
      "lateCount": 1,
      "attendancePercentage": 84
    }
  }
}
```

#### Error

| Status | Code | Kondisi | Tindakan Frontend |
|---:|---|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login | Ke Login |
| 403 | `FORBIDDEN` | Sesi bukan milik guru | Ke Dashboard |
| 404 | `SESSION_NOT_FOUND` | Sesi tidak ditemukan | Not Found |
| 409 | `SESSION_ALREADY_CLOSED` | Sesi sudah ditutup | Buka Hasil Absensi |
| 409 | `SESSION_HAS_NO_RECORDS` | Sesi tidak memiliki siswa | Tetap di halaman dan tampilkan error |

Frontend hanya mengirim request setelah seluruh indikator autosave berstatus Tersimpan. Backend tetap menghitung ringkasan ulang dan tidak mempercayai angka dari frontend.

### 12.2 POST `/attendance-sessions/:sessionId/reopen`

Membuka kembali sesi yang sudah ditutup.

#### Request

```json
{
  "reason": "Memperbaiki status kehadiran siswa."
}
```

#### Validasi

| Field | Aturan |
|---|---|
| `reason` | Wajib, setelah trim panjangnya 10–250 karakter |

#### Proses Atomik

Dalam satu transaksi, backend:

1. memverifikasi kepemilikan sesi;
2. memastikan status masih `closed`;
3. membuat `attendance_reopen_logs` dengan waktu penutupan sebelumnya;
4. mengubah status menjadi `open`;
5. mengosongkan `closedByUserId` dan `closedAt`; dan
6. memperbarui `updatedAt`.

#### Response `200 OK`

```json
{
  "data": {
    "id": 81,
    "status": "open",
    "closedAt": null,
    "reopenLog": {
      "id": 7,
      "reason": "Memperbaiki status kehadiran siswa.",
      "priorClosedAt": "2026-09-08T03:40:00.000Z",
      "reopenedAt": "2026-09-08T03:45:00.000Z"
    }
  }
}
```

#### Error

| Status | Code | Kondisi | Tindakan Frontend |
|---:|---|---|---|
| 401 | `AUTHENTICATION_REQUIRED` | Belum login | Ke Login |
| 403 | `FORBIDDEN` | Sesi bukan milik guru | Ke Dashboard |
| 404 | `SESSION_NOT_FOUND` | Sesi tidak ditemukan | Not Found |
| 409 | `SESSION_ALREADY_OPEN` | Sesi sudah dibuka | Buka Sesi Absensi |
| 422 | `VALIDATION_ERROR` | Alasan tidak valid | Tampilkan error input |

## 13. HTTP Status Code

| Status | Penggunaan |
|---:|---|
| 200 | Request berhasil dan memiliki response body |
| 201 | Resource sesi berhasil dibuat |
| 204 | Logout berhasil tanpa response body |
| 400 | JSON atau bentuk request rusak |
| 401 | Belum terautentikasi atau kredensial salah |
| 403 | Terautentikasi tetapi tidak berhak mengakses resource |
| 404 | Resource tidak ditemukan |
| 409 | Konflik status, unique constraint, atau version |
| 422 | Input JSON terbaca tetapi tidak lolos validasi |
| 429 | Terlalu banyak request tertentu |
| 500 | Kesalahan internal yang tidak diharapkan |
| 503 | Layanan atau database belum siap |

## 14. Daftar Error Code

| Code | Status | Makna |
|---|---:|---|
| `INVALID_JSON` | 400 | Body bukan JSON valid |
| `AUTHENTICATION_REQUIRED` | 401 | Sesi login tidak tersedia/valid |
| `INVALID_CREDENTIALS` | 401 | Login gagal |
| `ACCOUNT_INACTIVE` | 403 | Akun dinonaktifkan |
| `FORBIDDEN` | 403 | Resource bukan milik guru |
| `SCHEDULE_NOT_FOUND` | 404 | Jadwal tidak ditemukan |
| `SESSION_NOT_FOUND` | 404 | Sesi tidak ditemukan |
| `ATTENDANCE_RECORD_NOT_FOUND` | 404 | Record tidak ditemukan |
| `VERSION_CONFLICT` | 409 | Version autosave sudah berubah |
| `SESSION_CLOSED` | 409 | Record tidak dapat diedit |
| `SESSION_ALREADY_CLOSED` | 409 | Aksi close diulang |
| `SESSION_ALREADY_OPEN` | 409 | Aksi reopen diulang |
| `SESSION_HAS_NO_RECORDS` | 409 | Sesi tidak memiliki record |
| `CLASS_HAS_NO_STUDENTS` | 409 | Kelas tidak memiliki siswa aktif |
| `VALIDATION_ERROR` | 422 | Input tidak lolos schema validasi |
| `TOO_MANY_ATTEMPTS` | 429 | Batas percobaan terlampaui |
| `INTERNAL_ERROR` | 500 | Kesalahan internal umum |
| `SESSION_CREATE_FAILED` | 500 | Transaksi pembukaan gagal |
| `SERVICE_UNAVAILABLE` | 503 | API/database belum siap |

Pesan response tidak mengandung SQL, stack trace, path file, password hash, atau detail internal lainnya.

## 15. Authorization Matrix

| Endpoint/Resource | Pemeriksaan Kepemilikan |
|---|---|
| Jadwal | `schedules.teacher_id = authenticatedTeacher.id` |
| Sesi | Sesi → jadwal → guru terautentikasi |
| Record | Record → sesi → jadwal → guru terautentikasi |
| Reopen log | Log → sesi → jadwal → guru terautentikasi |

Frontend tidak boleh dianggap sebagai pengaman. Mengubah ID melalui URL tetap harus ditolak oleh backend.

Untuk mengurangi kebocoran informasi, implementasi boleh mengembalikan `404` alih-alih `403` pada resource milik pengguna lain. Pilih satu kebijakan dan gunakan secara konsisten; untuk prototype ini, kontrak menggunakan `403` agar alur demo lebih mudah diuji.

## 16. Validasi dan Sanitasi

- Validasi seluruh path parameter sebagai integer positif.
- Tolak properti JSON yang tidak dikenal pada request mutasi.
- Trim email dan alasan; jangan otomatis mengubah isi catatan selain aturan yang didokumentasikan.
- Normalisasi email menjadi lowercase sebelum query, meskipun database menggunakan `COLLATE NOCASE`.
- Batasi ukuran body JSON, misalnya maksimal 16 KB untuk endpoint prototype.
- Jangan menyisipkan HTML dari input `note` atau `reason`; React menampilkan sebagai teks biasa.
- Gunakan parameter binding/prepared statement untuk seluruh query SQLite.

## 17. Aturan Autosave

1. Perubahan status langsung memicu request `PATCH`.
2. Perubahan catatan dikirim setelah jeda singkat atau ketika input kehilangan fokus.
3. Hanya satu request aktif per record; request berikutnya diantrikan atau menggantikan nilai lokal yang belum dikirim.
4. Frontend mengirim `version` terakhir yang berhasil diterima.
5. Backend memperbarui record hanya jika version cocok.
6. Ringkasan UI diganti dengan ringkasan dari response berhasil.
7. Jika gagal, nilai input tetap terlihat dan indikator berubah menjadi Gagal disimpan.
8. Tombol Tutup Absensi dinonaktifkan selama ada request aktif atau gagal.

Rekomendasi debounce catatan: sekitar 500–800 ms. Status pilihan tidak memerlukan debounce.

## 18. Idempotensi dan Request Bersamaan

### Buka Sesi

Endpoint pembukaan bersifat aman untuk diulang secara fungsional:

- request pertama membuat sesi dan mengembalikan `201`;
- request berikutnya mengembalikan sesi yang sama dengan `200`;
- unique constraint tetap menjadi perlindungan terakhir.

### Autosave

`version` mencegah request lama menimpa request yang lebih baru.

### Tutup/Buka Kembali

Backend memeriksa status terkini dalam transaksi:

- close pada sesi `closed` → `409 SESSION_ALREADY_CLOSED`;
- reopen pada sesi `open` → `409 SESSION_ALREADY_OPEN`.

Frontend menggunakan error tersebut untuk mengarahkan guru ke halaman yang sesuai.

## 19. Logging

Log backend minimal memuat:

- `requestId`;
- method dan route template;
- status HTTP;
- durasi request;
- `userId` jika sudah login; dan
- jenis tindakan sesi: open, close, atau reopen.

Log tidak memuat kata sandi, token, password hash, atau seluruh isi cookie. Catatan siswa dan alasan pembukaan kembali sebaiknya tidak dicatat ke application log karena sudah tersimpan dalam database.

## 20. Rate Limit Prototype

| Endpoint | Rekomendasi |
|---|---|
| Login | 5 percobaan per 15 menit per IP/email |
| Autosave | Batas longgar, misalnya 120 request/menit per pengguna |
| Endpoint lainnya | 60 request/menit per pengguna |

Angka dapat disesuaikan saat pengujian. Rate limit login lebih penting daripada rate limit endpoint pembacaan.

## 21. Cache

- Response data pribadi menggunakan `Cache-Control: no-store`.
- Health check dapat menggunakan `Cache-Control: no-store`.
- Frontend boleh menyimpan hasil query di memory untuk pengalaman navigasi, tetapi melakukan revalidation ketika halaman kembali aktif.
- Endpoint mutasi tidak boleh di-cache.

## 22. Pemetaan Endpoint ke Halaman

| Halaman Frontend | Endpoint Utama |
|---|---|
| Login | `POST /auth/login`, `GET /auth/me` |
| Dashboard | `GET /schedules/today` |
| Detail Jadwal | `GET /schedules/:scheduleId` |
| Sesi Absensi | `POST /schedules/:scheduleId/attendance-sessions`, `GET /attendance-sessions/:sessionId`, `PATCH /attendance-records/:recordId`, `POST .../close` |
| Hasil Absensi | `GET /attendance-sessions/:sessionId`, `POST .../reopen` |
| Riwayat | `GET /attendance-sessions` |
| Menu Akun | `GET /auth/me`, `POST /auth/logout` |

## 23. Pemetaan Endpoint ke Tabel

| Endpoint | Tabel/View Utama |
|---|---|
| Login / Me | `users`, `teachers` |
| Jadwal Hari Ini | `v_schedule_details`, `attendance_sessions` |
| Detail Jadwal | `v_schedule_details`, `students`, `attendance_sessions` |
| Buka Sesi | `attendance_sessions`, `students`, `attendance_records` |
| Detail Sesi | `attendance_sessions`, `attendance_records`, `students`, `attendance_reopen_logs`, `v_attendance_summary` |
| Riwayat | `attendance_sessions`, `v_schedule_details`, `v_attendance_summary` |
| Autosave | `attendance_records`, `attendance_sessions`, `v_attendance_summary` |
| Tutup Sesi | `attendance_sessions`, `attendance_records`, `v_attendance_summary` |
| Buka Kembali | `attendance_sessions`, `attendance_reopen_logs` |

## 24. Urutan Implementasi Backend

1. Middleware request ID dan error handler.
2. Koneksi SQLite dengan `PRAGMA foreign_keys = ON` dan busy timeout.
3. Validasi request.
4. Login, autentikasi cookie, `me`, dan logout.
5. Middleware kepemilikan guru.
6. Jadwal hari ini dan detail jadwal.
7. Transaksi pembukaan sesi.
8. Detail sesi dan ringkasan.
9. Autosave record dengan optimistic concurrency.
10. Transaksi tutup dan buka kembali.
11. Riwayat absensi.
12. Rate limit, logging, dan health check.

## 25. Checklist API Contract

- [ ] Semua endpoint berada di bawah `/api/v1`.
- [ ] Endpoint private menolak request tanpa sesi valid.
- [ ] Cookie autentikasi memakai `HttpOnly` dan `SameSite=Lax`.
- [ ] Production HTTPS memakai cookie `Secure`.
- [ ] Jadwal, sesi, dan record diverifikasi kepemilikannya.
- [ ] Tanggal absensi dan timestamp menggunakan konvensi berbeda yang terdokumentasi.
- [ ] Pembukaan sesi aman saat request terkirim dua kali.
- [ ] Pembukaan sesi membuat seluruh record dalam satu transaksi.
- [ ] Autosave memakai `version` dan dapat menghasilkan `409 VERSION_CONFLICT`.
- [ ] Ringkasan response dihitung dari database.
- [ ] Sesi `closed` menolak perubahan record.
- [ ] Close dan reopen menggunakan transaksi.
- [ ] Reopen selalu menyimpan alasan dan waktu penutupan sebelumnya.
- [ ] Error tidak membocorkan SQL atau detail internal.
- [ ] Semua contoh JSON valid.
- [ ] Response pribadi memakai `Cache-Control: no-store`.
- [ ] Endpoint dan enum konsisten dengan schema SQLite.

## 26. Di Luar Scope v1

- Endpoint CRUD admin.
- Registrasi dan lupa kata sandi.
- Refresh token kompleks.
- API siswa dan orang tua.
- QR code, GPS, atau biometrik.
- Ekspor Excel/PDF.
- Rekap semester.
- Webhook dan notifikasi.
- Integrasi sistem akademik.
- Upload berkas izin atau surat sakit.
- API multi-sekolah.

---

Kontrak ini menjaga API Hadiruna tetap kecil tetapi lengkap untuk alur demo: guru login, melihat jadwal, membuka sesi, memperbarui kehadiran dengan autosave, menutup sesi, melihat hasil, membuka kembali koreksi, dan mengakses riwayat.
