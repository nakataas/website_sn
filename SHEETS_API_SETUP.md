# Google Sheets API Setup

## Cara Setup API Key untuk Live Letters Update

Website ini menggunakan Google Sheets API untuk mengambil data letters secara real-time. Ikuti langkah berikut:

### 1. Create Google Cloud Project & Enable API

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project atau pilih existing project
3. Di sidebar, pilih **APIs & Services** > **Library**
4. Cari "Google Sheets API" dan klik **Enable**

### 2. Create API Key

1. Di sidebar, pilih **APIs & Services** > **Credentials**
2. Klik **+ CREATE CREDENTIALS** > **API key**
3. Copy API key yang di-generate
4. Klik **Edit API key** untuk restrict:
   - **Application restrictions**: HTTP referrers (web sites)
   - Tambahkan domain website kamu (atau `*` untuk testing)
   - **API restrictions**: Restrict key > Pilih "Google Sheets API"
5. Save

### 3. Make Spreadsheet Public

1. Buka spreadsheet: https://docs.google.com/spreadsheets/d/1on00N1aSNpnf7xJ_usC4GLQCn_NWztm3kB6bvZG8ACA/edit
2. Klik **Share** button
3. Set visibility ke: **Anyone with the link** → **Viewer**
4. Save

### 4. Update API Key di Code

Buka file `letters-loader.js` dan replace API key:

```javascript
const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE'; // Replace this
```

### 5. Testing

1. Open `letters.html` di browser
2. Letters akan otomatis load dari Google Sheets
3. Setiap kali ada submission baru di form, refresh page untuk lihat update

---

## Spreadsheet Format

Pastikan spreadsheet punya kolom berikut (di row 1):

| Timestamp | For | Subject / Judul | Content / Isi |
|-----------|-----|----------------|---------------|
| 12/30/2025 0:36:25 | Silvia | My Red Flags | Dear... |

- **For**: Harus isi "Silvia" atau "Nakata" (case-insensitive)
- **Subject**: Judul letter yang akan ditampilkan
- **Content**: Isi full letter

---

## Alternative: Using Public CSV (Simpler but Less Secure)

Jika tidak mau setup API key, bisa juga publish sheet sebagai CSV:

1. **File** > **Share** > **Publish to web**
2. Pilih sheet "Form Responses 1"
3. Format: **Comma-separated values (.csv)**
4. Click **Publish**
5. Copy link yang di-generate

Lalu update `letters-loader.js` untuk fetch dari CSV instead of API.

---

## Troubleshooting

**Error: "Failed to fetch data"**
- Check API key sudah benar
- Pastikan spreadsheet visibility = "Anyone with the link"
- Check browser console untuk detail error

**Letters tidak muncul**
- Pastikan sheet name = "Form Responses 1" 
- Check kolom sesuai format
- Pastikan ada minimal 1 row data (selain header)

**CORS Error**
- Check API restrictions di Google Cloud Console
- Pastikan allowed HTTP referrers sudah di-set
