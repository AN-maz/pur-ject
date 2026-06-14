package barista;

import java.util.Scanner;

/**
 *
 * @author yan
 */
public class Barista {
    
    public static void menuBarista(){
        
        Scanner user = new Scanner(System.in);
        boolean menuBarista = true;
        
        while (menuBarista) {
            System.out.println("\n=== Menu Barista ===");
            System.out.println("1. Gudang");
            System.out.println("2. Kasir");
            System.out.println("3. Keluar");
            System.out.print("Pilih (1/2/3): ");

            if (user.hasNextInt()){
                int pilihanBarista = user.nextInt();

                switch (pilihanBarista){
                    case 1:
                        // Gudang
                        Gudang.menuGudang();
                        break;
                    case 2:
                        // Kasir
                        Kasir.menuKasir();
                        break;
                    case 3:
                        menuBarista = false;
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
}
