package barista;

import database.Database;

import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeMap;

public class Gudang {
    
    public static void menuGudang(){
        
        boolean menuGudang = true;
        Scanner user = new Scanner(System.in);
        
        while (menuGudang){

            System.out.println("\n=== Menu Gudang ===");
            System.out.println("1. Display Stok");
            System.out.println("2. Tambah Stok");
            System.out.println("3. keluar Menu Gudang");
            System.out.print("Pilih (1/2/3): ");

            if (user.hasNextInt()){
                int pilihanGudang = user.nextInt();

                switch (pilihanGudang){
                    case 1:
                        // Display
                        displayStok();
                        break;
                    case 2:
                        // Tambah
                        tambahStok();
                        break;
                    case 3:
                        // keluar gudang
                        menuGudang = false;
                        break;
                    default:
                        System.err.println("Tolong inpud sesuai pilihan MasPur!");
                }
            }else {
                System.err.println("Inpud Harus Angka MasPur");
            }
        }

    
    }
    
    public static void displayStok(){
   
        System.out.printf("\n%-20s %-15s %-15s %-15s%n", "Nama bahan", "Jumlah", "satuan", "Kadaluarsa");
        System.out.printf("---------------------------------------------------------------%n");

        // Mengurutkan: Default
        TreeMap<String, ArrayList<Object>> sortedMap = new TreeMap<>(Database.semuaStokBahan);

        for (String stokBahan : sortedMap.keySet()) {

            ArrayList<Object> ambilDetailBahan = Database.semuaStokBahan.get(stokBahan);

            int jumlahBahan = (int) ambilDetailBahan.get(0);
            String satuanBahan = (String) ambilDetailBahan.get(1);
            String kadaluarsa = (String) ambilDetailBahan.get(2);


            System.out.printf("%-20s %-15s %-15s %-15s%n", stokBahan, jumlahBahan, satuanBahan, kadaluarsa);
        }
        System.out.println();
    
    }
    
    private static void tambahStok(){
        
        Scanner user = new Scanner(System.in);
        boolean menuTambahBahan = true;
        
        System.out.println("\n====== Tambah Bahan ======\t");

        while (menuTambahBahan) {

            System.out.print("Nama bahan: ");
            String namaBahan = user.nextLine().toLowerCase().trim();

            if (Database.semuaStokBahan.containsKey(namaBahan)) {

                System.out.print("Bahan: " + namaBahan + " sudah ada, ingin menambah jumlah? (y/n): ");
                String pilihanTambah = user.nextLine().trim().toLowerCase();

                if (pilihanTambah.equals("y")) {
                    ArrayList<Object> tambahJumlah = Database.semuaStokBahan.get(namaBahan);

                    int jumlahBaru = (int) tambahJumlah.get(0);
                    System.out.print("Jumlah tambahan: ");
                    int tambahanJumlah = Integer.parseInt(user.nextLine().trim());

                    tambahJumlah.set(0, jumlahBaru + tambahanJumlah);

                    Database.semuaStokBahan.put(namaBahan, tambahJumlah);

                    System.out.println("Jumlah bahan: " + namaBahan + " berhasil ditambahkan menjadi " + (jumlahBaru + tambahanJumlah));
                } else {
                    System.err.println("Proses menambah bahan dibatalkan.");
                }
                break;
            }

            int jumlahBahan = 0;
            
            while (true) {
                System.out.print("Jumlah: ");
                try {
                    jumlahBahan = Integer.parseInt(user.nextLine().trim());
                    break;
                } catch (NumberFormatException e) {
                    System.err.println("Input tidak valid. Masukkan angka!");
                }
            }

            System.out.print("Satuan: ");
            String satuanBahan = user.nextLine().trim();

            System.out.print("Kadaluarsa: ");
            String kadaluarsaBahan = user.nextLine().trim();

            ArrayList<Object> tambahBarang = new ArrayList<>();
            tambahBarang.add(jumlahBahan);
            tambahBarang.add(satuanBahan);
            tambahBarang.add(kadaluarsaBahan);

            Database.semuaStokBahan.put(namaBahan,tambahBarang);
            System.out.println("Barang: " + namaBahan + " Berhasil ditambahkan ke stok");

            break;
        }
    }
}
