package barista;

import database.Database;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;
/**
 *
 * @author yan
 */
public class Kasir {
    
    public static String namaKasir = "";
    public static int pilihanShift = 0;
    
    public static void menuKasir(){
    
        boolean homeKasir = true;
        Scanner user = new Scanner(System.in);
        
        if (namaKasir.isEmpty()) {
            
            while (true) {
                System.out.println("\n=== Pilih Jadwal Shift ===");
                System.out.println("1. Pagi - Sore");
                System.out.println("2. Sore - Malam");
                System.out.print("Pilih (1/2): ");

                if (user.hasNext()) {
                    pilihanShift = user.nextInt();
                    user.nextLine();

                    if (pilihanShift == 1 || pilihanShift == 2) {
                        break;
                    } else {
                        System.err.println("Pilihan ga sesuai masPur");
                    }
                } else {
                    System.err.println("Inpud harus angka MasPur");
                    user.nextLine();
                }
            }
            System.out.print("Masukkan nama kasir: ");
            namaKasir = user.nextLine();
        }
        while (homeKasir) {

            System.out.println("\n=== Menu Kasir ===");
            System.out.println("1. Display Menu");
            System.out.println("2. Transaksi");
            System.out.println("3. Keluar menu kasir");
            System.out.print("Pilih (1/2/3): ");

            if (user.hasNextInt()) {
                int pilihanKasir = user.nextInt();

                switch (pilihanKasir) {

                    case 1:
                        // Display Menu
                        displayMenu();
                        break;

                    case 2:
                        // Transaksi
                        transaksi();
                        break;

                    case 3:
                        // keluar
                        homeKasir = false;
                        break;

                    default:
                        System.err.println("input tolong yg sesuai masPur");
                        break;
                }
            } else {
                System.err.println("Inpud harus angka MasPur");
            }
        }
    }
    public static void displayMenu(){
        
        for(String kategori:Database.semuaMenu.keySet()){
            System.out.println("\nKategori: "+kategori);
            System.out.printf("%-35s %-15s %-10s %-15s %-10s%n", "Nama Menu", "Medium", "stok", "Large", "stok");
            System.out.printf("-----------------------------------------------------------------------------------------%n");
            
            HashMap<String,HashMap<String,Integer>> ambilMenu = Database.semuaMenu.get(kategori);
            for(String namaMenu : ambilMenu.keySet()){
                HashMap<String,Integer> ambilUkuranMenu = ambilMenu.get(namaMenu);
                
                // Skip kalo resep menu ga nemu
                if(!Database.semuaResep.containsKey(namaMenu)){
                    System.out.println("Resep untuk menu "+namaMenu+"Tidak ditemukan!");
                    continue;
                }
                
                HashMap<String,Integer> resep = Database.semuaResep.get(namaMenu);
                int stokMedium = Integer.MAX_VALUE;
                int stokLarge = Integer.MAX_VALUE;
                
                // Hitung stok untuk setiap bahan dalam resep
                for (String bahan : resep.keySet()) {
                    if (!Database.semuaStokBahan.containsKey(bahan)) {
                        stokMedium = 0;
                        stokLarge = 0;
                        break;
                    }
                    
                     ArrayList<Object> stokBahan = Database.semuaStokBahan.get(bahan);
                    int stokTersedia = (int) stokBahan.get(0); 
                    int kebutuhan = resep.get(bahan); 

                    // Hitung stok berdasarkan kebutuhan bahan
                    stokMedium = Math.min(stokMedium, stokTersedia / kebutuhan);
                    stokLarge = Math.min(stokLarge, stokTersedia / (kebutuhan * 2));
                }
                
                int hargaMedium = ambilUkuranMenu.getOrDefault("Medium",0);
                int hargaLarge = ambilUkuranMenu.getOrDefault("Large",0);
                
                System.out.printf("%-35s %-15s %-10s %-15s %-10s%n", namaMenu, hargaMedium, stokMedium, hargaLarge, stokLarge);
                
            }      
        }
        System.out.println();
    }
    
    private static boolean cekDanKurangiStok(String namaMenu, String ukuran){
        if (!Database.semuaResep.containsKey(namaMenu)) {
            System.err.println("Resep untuk menu " + namaMenu + " tidak ditemukan!");
            return false;
        }

        HashMap<String, Integer> resep = Database.semuaResep.get(namaMenu); 
        for (String bahan : resep.keySet()) {
            if (!Database.semuaStokBahan.containsKey(bahan)) {
                System.err.println("Bahan " + bahan + " tidak tersedia di stok gudang!");
                return false;
            }

            ArrayList<Object> stokBahan = Database.semuaStokBahan.get(bahan);
            int stokTersedia = (int) stokBahan.get(0); 
            int kebutuhan = resep.get(bahan) * (ukuran.equalsIgnoreCase("Large") ? 2 : 1);

            if (stokTersedia < kebutuhan) {
                System.err.println("Stok bahan " + bahan + " tidak mencukupi! (Butuh: " + kebutuhan + ", Tersedia: " + stokTersedia + ")");
                return false;
            }
        }

        // Kurangi stok bahan jika validasi berhasil
        for (String bahan : resep.keySet()) {
            ArrayList<Object> stokBahan = Database.semuaStokBahan.get(bahan);
            int stokTersedia = (int) stokBahan.get(0);
            int kebutuhan = resep.get(bahan) * (ukuran.equalsIgnoreCase("Large") ? 2 : 1);

            stokBahan.set(0, stokTersedia - kebutuhan); 
        }

        return true; 
    }
    
    private static void transaksi(){
        
        HashMap<String, Integer> pesanan = new HashMap<>();
        Scanner user = new Scanner(System.in);
        boolean tambahMenu = true;

        System.out.println("\n=== Transaksi ===");
        System.out.print("Masukkan nama pelanggan: ");
        String namaPelanggan = user.nextLine().trim();
        
        if (namaPelanggan.isEmpty()) {
            System.err.println("Nama pelanggan tidak boleh kosong!");
            return;
        }
        while (tambahMenu) {

            // Menampilkan Menu
            displayMenu();

            System.out.print("Masukkan Kode Menu: ");
            String kodeMenuUSer = user.nextLine().toUpperCase().trim();
            boolean menuFound = false;

            for (String kategori : Database.semuaMenu.keySet()) {
                HashMap<String, HashMap<String, Integer>> menu = Database.semuaMenu.get(kategori);
                for (String namaMenu : menu.keySet()) {
                    String kodeMenu = namaMenu.split("\\.")[0];
                    String namaSaja = namaMenu.substring(namaMenu.indexOf('.') + 2);

                    if (kodeMenu.equalsIgnoreCase(kodeMenuUSer)) {
                        System.out.println("Menu ditemukan: " + namaMenu);
                        menuFound = true;

                        HashMap<String, Integer> ukuranHarga = menu.get(namaMenu);
                        System.out.println("Pilih Ukuran:");
                        System.out.println("1. Medium");
                        System.out.println("2. Large");
                        System.out.print("Pilih (1/2): ");

                        int mediumSize = ukuranHarga.getOrDefault("Medium", 0);
                        int largeSize = ukuranHarga.getOrDefault("Large", 0);
                        int harga = 0;
                        String ukuran = "";

                        if (user.hasNextInt()) {
                            int pilihUkuran = user.nextInt();
                            user.nextLine();

                            switch (pilihUkuran) {
                                case 1:
                                    harga = mediumSize;
                                    break;
                                case 2:
                                    harga = largeSize;
                                    break;
                                default:
                                    System.err.println("Pilihan ukuran tidak valid. Silakan coba lagi.");
                                    continue;
                            }
                            // Cek stok dan kurangi
                            if (cekDanKurangiStok(namaMenu, ukuran)) {
                                System.out.println("Pesanan berhasil diproses: " + namaSaja + " | Rp. " + harga);
                                pesanan.put(namaSaja, harga);
                            } else {
                                System.err.println("Pesanan tidak dapat diproses karena stok bahan tidak mencukupi.\n");

                                return;
                            }
                        } else {
                            System.err.println("Input harus berupa angka!");
                            user.nextLine();
                            return;
                        }
                    }
                }
            }

            if (!menuFound) {
                System.err.println("\nMenu dengan kode " + kodeMenuUSer + " tidak ditemukan.");
                return;
            }

            System.out.print("Tambah menu lagi? (y/n): ");
            String tambah = user.nextLine().toLowerCase();
            tambahMenu = tambah.equals("y");
        }

        // Ringkasan Pesanan
        System.out.println("\n=== Ringkasan Pesanan ===");
        System.out.println("Pelanggan: " + namaPelanggan);
        int totalHarga = 0;
        for (String namaMenu : pesanan.keySet()) {
            int harga = pesanan.get(namaMenu);
            System.out.printf("  - %-17s: Rp %d%n", namaMenu, harga);
            totalHarga += harga;
        }
        double ppn = totalHarga * 0.12;
        double totalDenganPPN = totalHarga + ppn;

        System.out.println("------------------------------------------");
        System.out.printf("%-20s: Rp %d%n", "Total Harga", totalHarga);
        System.out.printf("%-20s: Rp %.0f%n", "PPN (12%)", ppn);
        System.out.printf("%-20s: Rp %.0f%n", "Total + PPN", totalDenganPPN);

        // pembayaran:
        System.out.println("\nPilih metode pembayaran");
        System.out.println("1. Cash");
        System.out.println("2. Qris");
        System.out.println("3. Debit");
        System.out.print("Pilih (1/2/3): ");

        if (user.hasNextInt()){
            int pilihBayar = user.nextInt();
            user.nextLine();

            switch (pilihBayar){
                case 1:

                    System.out.print("Masukkan jumlah bayar: ");
                    int jumlahBayar = user.nextInt();
                    user.nextLine();
                    double kembalian = jumlahBayar-totalDenganPPN;

                    if (jumlahBayar >= totalHarga){

                        // konversi dulu:
                        String shift;
                        if (pilihanShift == 1){
                            shift = "Pagi - Sore";
                        } else if (pilihanShift == 2) {
                            shift = "Sore - Malam";
                        }else {
                            shift = "Anomali shift";
                        }

                        // cetakStruk
                        System.out.println();
                        cetakStrukCash(namaPelanggan,pesanan,totalHarga,jumlahBayar,kembalian,namaKasir,shift,totalDenganPPN,ppn);
                    }else {
                        System.err.println("Uang tidak cukup");
                    }
                    break;

                case 2:
                case 3:
                    // konversi dulu:
                    String shift;
                    if (pilihanShift == 1){
                        shift = "Pagi - Sore";
                    } else if (pilihanShift == 2) {
                        shift = "Sore - Malam";
                    }else {
                        shift = "Anomali shift";
                    }

                    System.out.println("1. Sukses");
                    System.out.println("2. Gagal");
                    System.out.print("Masukkan status pembayaran (1/2): ");

                    int status = 0;
                    while (status < 1 || status > 2){

                        if (user.hasNextInt()){
                            status = user.nextInt();
                            user.nextLine();
                        }else {
                            System.err.println("Input tidak valid! Silakan pilih 1 atau 2.");
                            user.nextLine();
                        }
                    }

                    if (status == 1){

                        // struk
                        System.out.println();
                        cetakStrukNonTunai(namaPelanggan,pesanan,totalHarga,namaKasir,shift,totalDenganPPN,ppn);
                    }else {
                        System.out.println("Pembayaran gagal");
                    }
                    break;
                default:
                    System.err.println("Metode pembayaran tidak valid.");
                    user.nextLine();
            }

        }else {
            System.err.println("Inpud yg sesuai masPur");
        }
    }
    
    private static void cetakStrukCash(
            String namaPelanggan,
            HashMap<String,Integer> pesanan,
            int totalHarga, int jumlahBayar,
            double kembalian, String namaKasir,
            String pilihanShift,double totalPPN,double ppn
    ){
        LocalDateTime kapingAyeuna = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        String garisAtas = "==========================================";
        String garisTengah = "------------------------------------------";
        String header = "               DATA COFFE           ";
        String subHeader = "Jl. A. Yani No.2, Malabar, Kec. Lengkong," +
                "\n\t  Kota Bandung, Jawa Barat 40112" +
                "\n\t\t     0851-5841-4866";
        String idTransaksi = "TRX" + System.currentTimeMillis();

        System.out.println(garisAtas);
        System.out.println(header);
        System.out.println(subHeader);
        System.out.println(garisAtas);

        System.out.printf("%-20s: %s%n", "Tanggal", kapingAyeuna.format(formatter));
        System.out.printf("%-20s: %s%n", "ID Transaksi", idTransaksi);
        System.out.printf("%-20s: %s%n", "Nama Kasir", namaKasir);
        System.out.printf("%-20s: %s%n", "Shift", pilihanShift);
        System.out.printf("%-20s: %s%n", "Nama Pelanggan", namaPelanggan);
        System.out.println(garisTengah);

        System.out.println("Pesanan:");
        for (String item : pesanan.keySet()) {
            System.out.printf("%-20s Rp %d%n", item, pesanan.get(item));
        }
        System.out.println(garisTengah);
        System.out.printf("%-20s: Rp %d%n", "Total Harga", totalHarga);
        System.out.printf("%-20s: Rp %.0f%n", "PPN",ppn);
        System.out.printf("%-20s: Rp %.0f%n", "Total + PPN", totalPPN);
        System.out.printf("%-20s: Rp %d%n", "Jumlah Bayar", jumlahBayar);
        System.out.printf("%-20s: Rp %.0f%n", "Kembalian", kembalian);
        System.out.println(garisAtas);

        System.out.println("  Terima kasih telah berbelanja!  ");
        System.out.println(garisAtas);

        // Simpan data ke transaksiList
        HashMap<String, Object> transaksi = new HashMap<>();
        transaksi.put("Tanggal", kapingAyeuna.format(formatter));
        transaksi.put("ID Transaksi", idTransaksi);
        transaksi.put("Nama Kasir", namaKasir);
        transaksi.put("Shift", pilihanShift);
        transaksi.put("Nama Pelanggan", namaPelanggan);
        transaksi.put("Pesanan", pesanan);
        transaksi.put("Total Harga", totalHarga);
        transaksi.put("PPN",ppn);
        transaksi.put("Total + PPN", totalPPN);
        transaksi.put("Jumlah Bayar", jumlahBayar);
        transaksi.put("Kembalian", kembalian);

        simpanTransaksi(transaksi);
    }
    
    private static void cetakStrukNonTunai(
            String namaPelanggan,
            HashMap<String,Integer> pesanan,
            int totalHarga, String namaKasir,
            String pilihanShift, double totalPPN,double ppn
    ){
        LocalDateTime kapingAyeuna = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        String garisAtas = "==========================================";
        String garisTengah = "------------------------------------------";
        String header = "               DATA COFFE           ";
        String subHeader = "Jl. A. Yani No.2, Malabar, Kec. Lengkong," +
                "\n\t  Kota Bandung, Jawa Barat 40112" +
                "\n\t\t     0851-5841-4866";
        String idTransaksi = "TRX" + System.currentTimeMillis();

        System.out.println(garisAtas);
        System.out.println(header);
        System.out.println(subHeader);
        System.out.println(garisAtas);

        System.out.printf("%-20s: %s%n", "Tanggal", kapingAyeuna.format(formatter));
        System.out.printf("%-20s: %s%n", "ID Transaksi", idTransaksi);
        System.out.printf("%-20s: %s%n", "Nama Kasir", namaKasir);
        System.out.printf("%-20s: %s%n", "Shift", pilihanShift);
        System.out.printf("%-20s: %s%n", "Nama Pelanggan", namaPelanggan);
        System.out.println(garisTengah);

        System.out.println("Pesanan:");
        for (String item : pesanan.keySet()) {
            System.out.printf("%-20s Rp %d%n", item, pesanan.get(item));
        }
        System.out.println(garisTengah);
        System.out.printf("%-20s: Rp %d%n", "Total Harga", totalHarga);
        System.out.printf("%-20s: Rp %.0f%n","PPN",ppn);
        System.out.printf("%-20s: Rp %.0f%n", "Total + PPN", totalPPN);
        System.out.println("  Terima kasih telah berbelanja!  ");
        System.out.println(garisAtas);

        // Simpan data ke transaksiList
        HashMap<String, Object> transaksi = new HashMap<>();
        transaksi.put("Tanggal", kapingAyeuna.format(formatter));
        transaksi.put("ID Transaksi", idTransaksi);
        transaksi.put("Nama Kasir", namaKasir);
        transaksi.put("Shift", pilihanShift);
        transaksi.put("Nama Pelanggan", namaPelanggan);
        transaksi.put("Pesanan", pesanan);
        transaksi.put("Total Harga", totalHarga);
        transaksi.put("PPN",ppn);
        transaksi.put("Total + PPN", totalPPN);

        simpanTransaksi(transaksi);

    }


    
    // hasil transaksi ke finance:
    public static final ArrayList<HashMap<String,Object>> transaksiList  = new ArrayList<>();
    
    public static void simpanTransaksi(HashMap<String,Object> transaksi){
        transaksiList.add(transaksi);
    }
    public static ArrayList<HashMap<String,Object>> getTransaksiList(){
        return transaksiList;
    }
}