package finance;

import static barista.Kasir.transaksiList;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.HashMap;
import java.util.Scanner;

public class Finance {
    
   public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
   public static void menuFinance(){

       Scanner user = new Scanner(System.in);
       boolean finance = true;
       
        while (finance){

            System.out.println("\n=== Menu Finance ===");
            System.out.println("1. Riwayat Transaksi");
            System.out.println("2. Rekap keuangan");
            System.out.println("3. keluar");
            System.out.print("Pilih (1/2/3): ");

            if (user.hasNextInt()){

                int pilihanFinance = user.nextInt();
                user.nextLine();

                switch (pilihanFinance){
                    case 1:
                        // Riwayat Transaksi
                       riwayatTransaksi();
                        break;
                    case 2:
                        // rekap keuangan
                        rekapPendapatan();
                        break;
                    case 3:
                        finance = false;
                        break;
                    default:
                        System.err.println("Inpud yg sesuai MasPur");
                        break;
                }
            }else {
                System.err.println("Input tolong yg sesuai (1/2) MasPur");
                return;
            }
        }
   }
   private static void riwayatTransaksi(){

        Scanner user = new Scanner(System.in);
        boolean kembaliFinance = true;
        
        tambahContohData();
        tampilkanRiwayatStruk();
        
        while (kembaliFinance) {
            System.out.print("\nMasukkan ID Transaksi untuk melihat detail pesanan (atau ketik 'exit' untuk keluar): ");
            String idInput = user.nextLine().trim();

            if (idInput.equalsIgnoreCase("exit")) {
                kembaliFinance = false;
            } else {
                tampilkanDetailPesanan(idInput);
            }
        }

        System.out.println("Terima kasih telah menggunakan sistem ini!");
   }
   private static void tampilkanRiwayatStruk(){
        System.out.println("\n=== Riwayat Transaksi ===");

        if (transaksiList.isEmpty()){
            System.out.println("Belum ada transaksi yang tersimpan");
            return;
        }

        // Header tabel
        String garisAtas = "+----------------------+------------------+-------------+-------------+--------------------+" +
                "--------------+---------------+---------------+";
        String header = String.format("| %-20s | %-16s | %-11s | %-11s | %-18s | %-10s  | %-12s  | %-12s  |",
                "Tanggal & waktu", "ID Transaksi", "Nama Kasir", "Shift", "Nama Pelanggan", "Total Harga","PPN", "Total + PPN");

        System.out.println(garisAtas);
        System.out.println(header);
        System.out.println(garisAtas);

        for (HashMap<String,Object> transaksi : transaksiList){
            System.out.printf("| %-20s | %-16s | %-11s | %-11s | %-18s | Rp%-10d | Rp%-12.0f| Rp%-12.0f|%n",
                    transaksi.get("Tanggal"),
                    transaksi.get("ID Transaksi"),
                    transaksi.get("Nama Kasir"),
                    transaksi.get("Shift"),
                    transaksi.get("Nama Pelanggan"),
                    ((Number) transaksi.get("Total Harga")).intValue(),
                    ((Number) transaksi.get("PPN")).doubleValue(),
                    ((Number) transaksi.get("Total + PPN")).doubleValue());
        }
        System.out.println(garisAtas);
   }
   private static void tampilkanDetailPesanan(String idTransaksi) {
        boolean ditemukan = false;


        for (HashMap<String, Object> transaksi : transaksiList) {
            if (transaksi.get("ID Transaksi").equals(idTransaksi)) {
                ditemukan = true;

                System.out.println("\n=== Detail Pesanan ===");
                System.out.println("ID Transaksi\t: " + transaksi.get("ID Transaksi"));
                System.out.println("Tanggal\t\t\t: " + transaksi.get("Tanggal"));
                System.out.println("Nama Kasir\t\t: " + transaksi.get("Nama Kasir"));
                System.out.println("Shift\t\t\t: " + transaksi.get("Shift"));
                System.out.println("Nama Pelanggan\t: " + transaksi.get("Nama Pelanggan"));

                System.out.println("\nPesanan:");
                HashMap<String, Integer> pesanan = (HashMap<String, Integer>) transaksi.get("Pesanan");
                for (String item : pesanan.keySet()) {
                    System.out.printf("  - %-17s: Rp %d%n", item, pesanan.get(item));
                }

                System.out.println("------------------------------------------");
                break;
            }
        }

        if (!ditemukan) {
            System.err.println("ID Transaksi " + idTransaksi + " tidak ditemukan.");
        }
    }
   private static void tambahContohData() {

        HashMap<String, Integer> pesanan1 = new HashMap<>();
        pesanan1.put("Latte", 28000);
        pesanan1.put("Klepon Macchiato", 20000);
        pesanan1.put("Klepon Latte", 20000);

        HashMap<String, Object> transaksi1 = new HashMap<>();
        transaksi1.put("Tanggal", "2025-01-03 :18.09.11");
        transaksi1.put("ID Transaksi", "TRX1234567890");
        transaksi1.put("Nama Kasir", "Adit");
        transaksi1.put("Shift", "Pagi - Sore");
        transaksi1.put("Nama Pelanggan", "Egi");
        transaksi1.put("Total Harga", 60_000);
        transaksi1.put("PPN",8_160);
        transaksi1.put("Total + PPN", 68_160);
        transaksi1.put("Pesanan", pesanan1);
        transaksiList.add(transaksi1);
        
        HashMap<String, Integer> pesanan2 = new HashMap<>();
        pesanan2.put("Green tea latte (hot/cold) ", 25000);
        pesanan2.put("Thai Tea Latte (Hot/Cold)", 17000);
        pesanan2.put("Java Choko latte (Hot/Cold)", 25000);
        pesanan2.put("Choco Hazelnut Latte  (Hot/Cold)", 17000);
        
        HashMap<String, Object> transaksi2 = new HashMap<>();
        transaksi2.put("Tanggal", "2025-01-08 :09.00.12");
        transaksi2.put("ID Transaksi", "TRX123456789012");
        transaksi2.put("Nama Kasir", "Purwa");
        transaksi2.put("Shift", "Pagi - Sore");
        transaksi2.put("Nama Pelanggan", "Akane");
        transaksi2.put("Total Harga", 100000);
        transaksi2.put("PPN",3100);
        transaksi2.put("Total + PPN", 112000);
        transaksi2.put("Pesanan", pesanan1);
        transaksiList.add(transaksi1); 
    }
   
   private static void rekapPendapatan(){
       
       Scanner user = new Scanner(System.in);
       HashMap<String, Double[]> pendapatanHari = new HashMap<>();
       boolean rekap = true;
       
       while (rekap){

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


            System.out.print("\nKeluar rekap pendapatan 'y': ");
            String keluar = user.nextLine().toLowerCase().trim();

            if (keluar.equals("y")){
                rekap = false;
                return;

            }else {
                System.err.println("Input yang sesuai adalah 'y' untuk keluar.");

            }
        }
    }


}
