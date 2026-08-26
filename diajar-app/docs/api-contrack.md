# API Contract Specification

**Base URL:** `[https://api.yourdomain.com/api/v1](https://api.yourdomain.com/api/v1)`

**Authentication:** Header `Authorization: Bearer <JWT_TOKEN>`

---

## Standard Response Structure

**Success Response (2xx)**

```json
{
  "success": true,
  "message": "Deskripsi singkat respons",
  "data": {}
}

```

**Error Response (4xx / 5xx)**

```json
{
  "success": false,
  "message": "Pesan error",
  "errors": null
}

```

---

## 1. Categories Module

### `GET /categories`

Mendapatkan daftar seluruh kategori materi.

* **Auth Required:** No
* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Daftar kategori berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Teknologi & Pemrograman",
      "slug": "teknologi-dan-pemrograman",
      "description": "Modul pengembangan perangkat lunak dan IT"
    }
  ]
}

```

---

## 2. Materials Module (Learner & Public)

### `GET /materials`

Mendapatkan daftar materi publik berstatus `approved` dengan pagination, filter, dan pencarian.

* **Auth Required:** No
* **Query Parameters:**
* `category_id` *(optional)*: `1`
* `search` *(optional)*: `react`
* `sort` *(optional)*: `latest` | `popular`
* `page` *(optional, default: 1)*: `1`
* `limit` *(optional, default: 10)*: `10`


* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Katalog materi berhasil diambil",
  "data": {
    "materials": [
      {
        "id": "c39a818d-7e23-4e89-9a22-31d248bf1d21",
        "title": "Belajar React dengan Hooks",
        "slug": "belajar-react-dengan-hooks",
        "cover_image_url": "https://storage.domain.com/covers/react.jpg",
        "author": {
          "id": "u123",
          "name": "Andrian"
        },
        "category": {
          "id": 1,
          "name": "Teknologi & Pemrograman"
        },
        "average_rating": 4.80,
        "ratings_count": 12,
        "created_at": "2026-08-26T10:00:00Z"
      }
    ],
    "pagination": {
      "total_items": 45,
      "total_pages": 5,
      "current_page": 1,
      "limit": 10
    }
  }
}

```

### `GET /materials/:slug`

Mendapatkan detail materi lengkap beserta konten Markdown.

* **Auth Required:** Optional (jika login, akan mengembalikan status `is_completed` pengguna).
* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Detail materi berhasil diambil",
  "data": {
    "id": "c39a818d-7e23-4e89-9a22-31d248bf1d21",
    "title": "Belajar React dengan Hooks",
    "slug": "belajar-react-dengan-hooks",
    "cover_image_url": "https://storage.domain.com/covers/react.jpg",
    "content": "# Intro React Hooks\n\nReact Hooks mempermudah...",
    "author": {
      "id": "u123",
      "name": "Andrian",
      "level": 5
    },
    "category": {
      "id": 1,
      "name": "Teknologi & Pemrograman"
    },
    "average_rating": 4.80,
    "ratings_count": 12,
    "user_progress": {
      "is_completed": false,
      "has_rated": false
    },
    "created_at": "2026-08-26T10:00:00Z"
  }
}

```

---

## 3. Materials Module (Creator Dashboard)

### `POST /materials`

Membuat dan mengajukan materi baru berstatus `pending`.

* **Auth Required:** Yes (`user` role)
* **Request Body:**

```json
{
  "category_id": 1,
  "title": "Dasar SQL Query",
  "cover_image_url": "https://storage.domain.com/covers/sql.jpg",
  "content": "# Pengenalan SQL\n\nUntuk mengambil data, gunakan `/code` berikut:\n```sql\nSELECT * FROM users;\n```"
}

```

* **Response (201 Created):**

```json
{
  "success": true,
  "message": "Materi berhasil diajukan dan menunggu persetujuan admin",
  "data": {
    "id": "f81c9b20-1122-3344-5566-778899aabbcc",
    "status": "pending",
    "created_at": "2026-08-26T12:00:00Z"
  }
}

```

### `GET /users/me/materials`

Mendapatkan daftar materi buatan user yang sedang login beserta status peninjauannya.

* **Auth Required:** Yes
* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Daftar materi user berhasil diambil",
  "data": [
    {
      "id": "f81c9b20-1122-3344-5566-778899aabbcc",
      "title": "Dasar SQL Query",
      "status": "rejected",
      "rejection_reason": "Isi materi terlalu singkat, harap tambahkan contoh studi kasus.",
      "created_at": "2026-08-26T12:00:00Z"
    }
  ]
}

```

### `PUT /materials/:id`

Mengubah materi buatan sendiri (misal untuk perbaikan materi yang di-reject).

* **Auth Required:** Yes (Hanya milik author terkait)
* **Request Body:** Sama seperti `POST /materials`
* **Response (200 OK):** Status otomatis kembali menjadi `pending`.

---

## 4. Gamification & Interactivity Module

### `POST /materials/:id/complete`

Menandai materi telah selesai dibaca dan memberikan imbalan EXP.

* **Auth Required:** Yes
* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Materi selesai dibaca! Kamu mendapatkan +50 EXP",
  "data": {
    "exp_gained": 50,
    "current_total_exp": 350,
    "current_level": 3,
    "is_level_up": true
  }
}

```

### `POST /materials/:id/ratings`

Memberikan rating bintang 1–5 untuk materi tertentu.

* **Auth Required:** Yes
* **Request Body:**

```json
{
  "rating_value": 5
}

```

* **Response (201 Created):**

```json
{
  "success": true,
  "message": "Rating berhasil dikirim! Kamu mendapatkan +10 Points",
  "data": {
    "points_gained": 10,
    "current_total_points": 120,
    "new_average_rating": 4.85
  }
}

```

### `GET /materials/:id/comments` & `POST /materials/:id/comments`

Mengambil dan mengirim komentar pada halaman materi.

* **POST Request Body:**

```json
{
  "comment_text": "Penjelasan mengenai JOIN table sangat mudah dipahami!"
}

```

### `GET /leaderboard`

Mendapatkan peringkat pengguna teratas berdasarkan EXP.

* **Auth Required:** No
* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Papan peringkat berhasil diambil",
  "data": [
    {
      "rank": 1,
      "user_id": "u123",
      "name": "Andrian",
      "level": 8,
      "total_exp": 2450
    }
  ]
}

```

---

## 5. Admin Moderation Module

### `GET /admin/materials`

Mendapatkan daftar materi yang memerlukan moderasi.

* **Auth Required:** Yes (`admin` role)
* **Query Parameters:** `status=pending`
* **Response (200 OK):** Menampilkan daftar materi berstatus `pending`.

### `PATCH /admin/materials/:id/status`

Menyetujui (`approve`) atau menolak (`reject`) pengajuan materi.

* **Auth Required:** Yes (`admin` role)
* **Request Body (Approve):**

```json
{
  "status": "approved"
}

```

* **Request Body (Reject):**

```json
{
  "status": "rejected",
  "rejection_reason": "Format markdown tidak rapi dan contoh kode kurang lengkap."
}

```

* **Response (200 OK):**

```json
{
  "success": true,
  "message": "Status materi berhasil diperbarui menjadi approved. Author mendapatkan +200 EXP.",
  "data": {
    "material_id": "f81c9b20-1122-3344-5566-778899aabbcc",
    "status": "approved",
    "author_exp_rewarded": 200
  }
}

```