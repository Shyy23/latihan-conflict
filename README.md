# sobat-payment

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Git Conflict Simulation

Pada tahap ini, tim melanjutkan pengembangan project sebelumnya dengan membuat API untuk data users.  
Adapun pembagian tugas dalam tim adalah sebagai berikut:

- **Syahrul** — Initialize repository dan melakukan code review
- **Andhika** — Membuat controller API untuk endpoint seluruh users beserta routing
- **Revan** — Membuat controller API untuk endpoint detail user beserta routing

### Proses Terjadinya Konflik

Konflik terjadi ketika Revan lebih dahulu menyelesaikan pekerjaannya dan melakukan merge ke branch utama.  
Kemudian Andhika melakukan push perubahan pada bagian kode yang sama sehingga Git mendeteksi adanya konflik.

Konflik tersebut diselesaikan secara kolaboratif dengan menggabungkan kedua perubahan (**both changes**) dan melakukan penyesuaian kode agar tetap konsisten dan dapat berjalan dengan baik.
