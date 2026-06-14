package CEO;

import barista.Gudang;
import barista.Kasir;
import static barista.Kasir.transaksiList;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.HashMap;
import java.util.Scanner;


import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.LineSeparator;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;



import java.io.FileOutputStream;

public class CEO {
    
    public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
     
    public static void menuCEO(){
    
        Scanner user = new Scanner(System.in);
        boolean menuCEO = true;

        while (menuCEO) {
            System.out.println("\n=== Menu CEO ===");
            System.out.println("1. Display Stok");
            System.out.println("2. Display Menu");
            System.out.println("3. Rekap Pendapatan");
            System.out.println("4. Keluar");
            System.out.print("Pilih: ");

            if (user.hasNextInt()){
                int pilihanCEO = user.nextInt();

                switch (pilihanCEO){
                    case 1:
                        // Gudang
                        Gudang.displayStok();
                        break;
                    case 2:
                        // Kasir
                        Kasir.displayMenu();
                        break;
                    case 3:
                        rekapCeo();
                        break;
                    case 4:
                        menuCEO = false;
                        break;
                    default:
                        System.err.println("Pilih Inpud yg sesuai MasPur");
                        break;
                }

            } else {
                System.err.println("Inpud harus Angka MasPur");
                user.nextLine();
            }
        }
    }
    private static void rekapCeo(){
        
        Scanner user = new Scanner(System.in);
        HashMap<String, Double[]> pendapatanHari = new HashMap<>();
        boolean rekap = true;
        
        while (rekap) {

            for (HashMap<String, Object> transaksiHari : transaksiList) {
                String tanggal = transaksiHari.get("Tanggal").toString().substring(0, 10); // jeung candak kapingna
                double totalHarga = ((Number) transaksiHari.get("Total Harga")).doubleValue();
                double totalPPN = ((Number) transaksiHari.get("Total + PPN")).doubleValue();
                double laba = totalHarga * 0.2;

                // mun geus kapanggih , nambah omset,laba,PPN
                pendapatanHari.put(tanggal, pendapatanHari.getOrDefault(tanggal, new Double[]{0.0, 0.0, 0.0}));
                Double[] data = pendapatanHari.get(tanggal);
                data[0] += totalHarga;
                data[1] += laba;
                data[2] += totalPPN;
            }


            System.out.println("\n=== Rekap Pendapatan Per Hari ===");
            System.out.printf("%-15s | %-15s | %-15s | %-15s%n", "Tanggal", "Omset (Rp)", "Laba (Rp)", "PPN (Rp)");
            System.out.println("---------------------------------------------------------------------");

            for (String tanggal : pendapatanHari.keySet()) {
                Double[] data = pendapatanHari.get(tanggal);
                System.out.printf("%-15s | %-15.0f | %-15.0f | %-15.0f%n",
                        tanggal, data[0], data[1], data[2]);
            }

            // Minggu:
            HashMap<String, Double[]> pendapatanMinggu = new HashMap<>();

            for (HashMap<String, Object> transaksi : transaksiList) {
                String tanggal = transaksi.get("Tanggal").toString().substring(0, 10);
                LocalDate date = LocalDate.parse(tanggal, formatter);

                int mingguTahun = date.getYear() * 100 + date.get(WeekFields.ISO.weekOfYear());

                double totalHarga = ((Number) transaksi.get("Total Harga")).doubleValue();
                double totalPPN = ((Number) transaksi.get("Total + PPN")).doubleValue();
                double laba = totalHarga * 0.2;

                pendapatanMinggu.put(String.valueOf(mingguTahun), pendapatanMinggu.getOrDefault(String.valueOf(mingguTahun), new Double[]{0.0, 0.0, 0.0}));
                Double[] data = pendapatanMinggu.get(String.valueOf(mingguTahun));
                data[0] += totalHarga;
                data[1] += laba;
                data[2] += totalPPN;
            }

            // Menampilkan hasil rekap pendapatan per minggu sebagai tabel
            System.out.println("\n=== Rekap Pendapatan Per Minggu ===");
            System.out.printf("%-15s | %-15s | %-15s | %-15s%n", "Minggu", "Omset (Rp)", "Laba (Rp)", "PPN (Rp)");
            System.out.println("---------------------------------------------------------------------");

            for (String minggu : pendapatanMinggu.keySet()) {
                Double[] data = pendapatanMinggu.get(minggu);
                System.out.printf("%-15s | %-15.0f | %-15.0f | %-15.0f%n",
                        minggu, data[0], data[1], data[2]);
            }

            // Bulan:
            HashMap<String, Double[]> pendapatanBulan = new HashMap<>();

            for (HashMap<String, Object> transaksi : transaksiList) {
                String tanggal = transaksi.get("Tanggal").toString().substring(0, 7); // Ambil hanya bulan (yyyy-MM)
                double totalHarga = ((Number) transaksi.get("Total Harga")).doubleValue();
                double totalPPN = ((Number) transaksi.get("Total + PPN")).doubleValue();
                double laba = totalHarga * 0.2;

                pendapatanBulan.put(tanggal, pendapatanBulan.getOrDefault(tanggal, new Double[]{0.0, 0.0, 0.0}));
                Double[] data = pendapatanBulan.get(tanggal);
                data[0] += totalHarga;
                data[1] += laba;
                data[2] += totalPPN;
            }

            // Menampilkan hasil rekap pendapatan per bulan sebagai tabel
            System.out.println("\n=== Rekap Pendapatan Per Bulan ===");
            System.out.printf("%-15s | %-15s | %-15s | %-15s%n", "Bulan", "Omset (Rp)", "Laba (Rp)", "PPN (Rp)");
            System.out.println("---------------------------------------------------------------------");

            for (String bulan : pendapatanBulan.keySet()) {
                Double[] data = pendapatanBulan.get(bulan);
                System.out.printf("%-15s | %-15.0f | %-15.0f | %-15.0f%n",
                        bulan, data[0], data[1], data[2]);
            }


            System.out.println("\nPilihan opsi");
            System.out.println("1. cetak laporan (PDF)");
            System.out.println("2. keluar menu CEO");
            System.out.print("Pilih (1/2): ");

            if (user.hasNextInt()) {
            int pilihanCEO = user.nextInt();
                user.nextLine();

                switch (pilihanCEO) {
                    case 1:
                        // print to pdf
                        try {
                            // Nama file PDF
                            String fileName = "LaporanPendapatan.pdf";

                            // Inisialisasi PDF
                            PdfWriter writer = new PdfWriter(new FileOutputStream(fileName));
                            PdfDocument pdf = new PdfDocument(writer);
                            Document document = new Document(pdf);

                            // Asumsi lebar halaman A4 adalah 595 pt (sudah standar di iText)
                            float lebarHalaman = 595.28f; // Lebar A4 dalam point
                            int jumlahKolom = 4; // Jumlah kolom dalam tabel
                            float margin = 20f; // Margin kiri dan kanan (misalnya 10pt di kiri dan kanan)

                            // Menghitung lebar per kolom
                            float lebarPerKolom = (lebarHalaman - margin * 2) / jumlahKolom; // Lebar per kolom setelah margin

                            // Menambahkan Cop di bagian atas, tengah, dan garis
                            Paragraph cop = new Paragraph("DATA COFFE\n")
                                .setBold().setFontSize(14)
                                .setTextAlignment(com.itextpdf.layout.properties.TextAlignment.CENTER); // Set tengah
                            cop.add("Jl. A. Yani No.2, Malabar, Kec. Lengkong\n");
                            cop.add("Kota Bandung, Jawa Barat 40112\n");
                            cop.add("0851-5841-4866\n");

                            // Menambahkan garis setelah cop
                            document.add(cop);
                            document.add(new Paragraph("-------------------------------------------------------------------------"
                                    + "---------------------------------------------------------"));

                            // Judul Dokumen
                            document.add(new Paragraph("Laporan Pendapatan").setBold().setFontSize(18).setTextAlignment(com.itextpdf.layout.properties.TextAlignment.CENTER)); // Set tengah
                            

                            // Rekap per hari
                            document.add(new Paragraph("Rekap Pendapatan Per Hari").setBold());
                            Table tableHari = new Table(new float[]{lebarPerKolom, lebarPerKolom, lebarPerKolom, lebarPerKolom}); // Menggunakan lebar kolom yang dihitung
                            tableHari.addCell("Tanggal");
                            tableHari.addCell("Omset (Rp)");
                            tableHari.addCell("Laba (Rp)");
                            tableHari.addCell("PPN (Rp)");

                            for (String tanggal : pendapatanHari.keySet()) {
                                Double[] data = pendapatanHari.get(tanggal);
                                tableHari.addCell(tanggal);
                                tableHari.addCell(String.format("%.0f", data[0]));
                                tableHari.addCell(String.format("%.0f", data[1]));
                                tableHari.addCell(String.format("%.0f", data[2]));
                            }
                            document.add(tableHari);

                            // Rekap per minggu
                            document.add(new Paragraph("\nRekap Pendapatan Per Minggu").setBold());
                            Table tableMinggu = new Table(new float[]{lebarPerKolom, lebarPerKolom, lebarPerKolom, lebarPerKolom}); // Menggunakan lebar kolom yang dihitung
                            tableMinggu.addCell("Minggu");
                            tableMinggu.addCell("Omset (Rp)");
                            tableMinggu.addCell("Laba (Rp)");
                            tableMinggu.addCell("PPN (Rp)");

                            for (String minggu : pendapatanMinggu.keySet()) {
                                Double[] data = pendapatanMinggu.get(minggu);
                                tableMinggu.addCell(minggu);
                                tableMinggu.addCell(String.format("%.0f", data[0]));
                                tableMinggu.addCell(String.format("%.0f", data[1]));
                                tableMinggu.addCell(String.format("%.0f", data[2]));
                            }
                            document.add(tableMinggu);

                            // Rekap per bulan
                            document.add(new Paragraph("\nRekap Pendapatan Per Bulan").setBold());
                            Table tableBulan = new Table(new float[]{lebarPerKolom, lebarPerKolom, lebarPerKolom, lebarPerKolom}); // Menggunakan lebar kolom yang dihitung
                            tableBulan.addCell("Bulan");
                            tableBulan.addCell("Omset (Rp)");
                            tableBulan.addCell("Laba (Rp)");
                            tableBulan.addCell("PPN (Rp)");

                            for (String bulan : pendapatanBulan.keySet()) {
                                Double[] data = pendapatanBulan.get(bulan);
                                tableBulan.addCell(bulan);
                                tableBulan.addCell(String.format("%.0f", data[0]));
                                tableBulan.addCell(String.format("%.0f", data[1]));
                                tableBulan.addCell(String.format("%.0f", data[2]));
                            }
                            document.add(tableBulan);

                            // Tutup dokumen
                            document.close();

                            System.out.println("\nLaporan berhasil dicetak ke file: " + fileName);
                        } catch (Exception e) {
                            System.err.println("\nGagal mencetak laporan: " + e.getMessage());
                        }
                        break;
                    case 2:

                        rekap = false;
                        break;
                }
            } else {
                System.err.println("Input yang sesuai masPur");
            }

        }
        
    }
    
 
}
