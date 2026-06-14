package dataCaffee;

import CEO.CEO;
import barista.Barista;
import database.Menu;
import database.ResepMenu;
import java.util.Scanner;
import database.StokGudang;
import finance.Finance;

/**
 *
 * @author yan
 */
public class DataCaffee {

    public static void main(String[] args) {
        
        Scanner user = new Scanner(System.in);
        boolean loginMenu = true;
        new StokGudang();
        new Menu();
        new ResepMenu();
        
      
        while (loginMenu){
            System.out.println("================================");
            System.out.println("| Selamat datang di Data Caffe |");
            System.out.println("======== Hallaman Login ========");

            System.out.print("Username: ");
            String username = user.nextLine();
            System.out.print("Password: ");
            String password = user.nextLine();

            if (username.equals("ceo") && password.equals("ceo123")){
                CEO.menuCEO();
            } else if (username.equals("Barista") && password.equals("Barista123")) {
                Barista.menuBarista();
            } else if (username.equals("Finance") && password.equals("Finance123")) {
                Finance.menuFinance();
           
            }else {
                System.err.println("Username atau Password salah MasPur!");
            }

            System.out.println("--------------------------------");
            System.out.println("--------------------------------");

            System.out.print("Tekan 'n' untuk keluar program: ");
            String pilihanKeluar = user.nextLine().toLowerCase().trim();

            if (pilihanKeluar.equalsIgnoreCase("n")){
                loginMenu = false;
                System.out.println("Sekian dan Terima Kasih!");
            }
        }
    }
}
