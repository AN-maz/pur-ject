package database;

import static database.Database.semuaMenu;
import java.util.HashMap;
import java.util.LinkedHashMap;

public class Menu {
    
    static{
   
        LinkedHashMap<String,HashMap<String,Integer>> daftarMenuAsiatino = new LinkedHashMap<>();
        LinkedHashMap <String,HashMap<String,Integer>> daftarMenuMilkTeaChoco = new LinkedHashMap<>();
        LinkedHashMap <String,HashMap<String,Integer>> daftarMenuTeaSelection = new LinkedHashMap<>();
        LinkedHashMap <String,HashMap<String,Integer>> daftarMenuIceCream = new LinkedHashMap<>();
        LinkedHashMap <String,HashMap<String,Integer>> daftarMenuManualBrew = new LinkedHashMap<>();
        LinkedHashMap <String,HashMap<String,Integer>> daftarMenuExpressoClassic = new LinkedHashMap<>();
        LinkedHashMap <String,HashMap<String,Integer>> daftarMenuCoffeBrezze = new LinkedHashMap<>();
        
        
        HashMap<String,Integer> ukuranMenu = new HashMap<>();
        
          // Menu AsiaTino:
        ukuranMenu.put("Medium",20000);
        ukuranMenu.put("Large",28000);
        daftarMenuAsiatino.put("1A. Latte",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",20000);
        ukuranMenu.put("Large",28000);
        daftarMenuAsiatino.put("2A. Klepon Latte",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",20_000);
        ukuranMenu.put("Large",28_000);
        daftarMenuAsiatino.put("3A. Klepon Macchiato",new HashMap<>(ukuranMenu));
        semuaMenu.put("Asiatino",daftarMenuAsiatino);

        // Milktea & choco
        ukuranMenu.put("Medium",17_000);
        ukuranMenu.put("Large",25_000);
        daftarMenuMilkTeaChoco.put("1B. Green tea latte (hot/cold)",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",17_000);
        ukuranMenu.put("Large",25_000);
        daftarMenuMilkTeaChoco.put("2B. Thai Tea Latte (Hot/Cold)",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",17_000);
        ukuranMenu.put("Large",25_000);
        daftarMenuMilkTeaChoco.put("3B. Java Choko latte (Hot/Cold)",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",17_000);
        ukuranMenu.put("Large",25_000);
        daftarMenuMilkTeaChoco.put("4B. Choco Hazelnut Latte",new HashMap<>(ukuranMenu));
        semuaMenu.put("Milk Tea & Choco",daftarMenuMilkTeaChoco);

        // Tea Selection
        ukuranMenu.put("Medium",18_000);
        daftarMenuTeaSelection.put("1C. Shaken Iced Lychee Tea",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",16_000);
        daftarMenuTeaSelection.put("2C. Shaken Iced Lemon Tea",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",9_000);
        daftarMenuTeaSelection.put("3C. Hot Lemon Tea",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",9_000);
        daftarMenuTeaSelection.put("4C. Hot The Hijau",new HashMap<>(ukuranMenu));
        semuaMenu.put("Tea Seletion",daftarMenuTeaSelection);

        // Ice Cream:
        ukuranMenu.put("Medium",18_000);
        daftarMenuIceCream.put("1D. Afogato",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",9_000);
        daftarMenuIceCream.put("2D. Extra Float",new HashMap<>(ukuranMenu));
        semuaMenu.put("Ice Cream",daftarMenuIceCream);

        // Manual brew:
        ukuranMenu.put("Medium",8_000);
        ukuranMenu.put("Large",9_000);
        daftarMenuManualBrew.put("1E. Tubruk",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",12_000);
        ukuranMenu.put("Large",14_000);
        daftarMenuManualBrew.put("2E. Pour Over",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",12_000);
        ukuranMenu.put("Large",14_000);
        daftarMenuManualBrew.put("3E. Vietnam Drip",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",12_000);
        ukuranMenu.put("Large",14_000);
        daftarMenuManualBrew.put("4E. French Press",new HashMap<>(ukuranMenu));
        semuaMenu.put("Manual Brew",daftarMenuManualBrew);

        // Espresso Clasic:
        ukuranMenu.put("Medium",9_000);
        ukuranMenu.put("Large",14_000);
        daftarMenuExpressoClassic.put("1F. Espresso",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",9_000);
        ukuranMenu.put("Large",14_000);
        daftarMenuExpressoClassic.put("2F. Americano",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",18_000);
        ukuranMenu.put("Large",26_000);
        daftarMenuExpressoClassic.put("3F. Caffe Latte",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",18_000);
        ukuranMenu.put("Large",26_000);
        daftarMenuExpressoClassic.put("4F. Capucino",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",18_000);
        ukuranMenu.put("Large",26_000);
        daftarMenuExpressoClassic.put("5F. Marochino",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",18_000);
        ukuranMenu.put("Large",26_000);
        daftarMenuExpressoClassic.put("6F. Arange Latte",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",20_000);
        ukuranMenu.put("Large",28_000);
        daftarMenuExpressoClassic.put("7F. Dual Latte (cold)",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",20_000);
        ukuranMenu.put("Large",28_000);
        daftarMenuExpressoClassic.put("8F. Brulee Latte",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",20_000);
        ukuranMenu.put("Large",28_000);
        daftarMenuExpressoClassic.put("9F. Cafe Halnut Latte",new HashMap<>(ukuranMenu));
        semuaMenu.put("Expressco Clasic",daftarMenuExpressoClassic);

        // Coffe Brezze:
        ukuranMenu.put("Medium",20_000);
        ukuranMenu.put("Large",28_000);
        daftarMenuCoffeBrezze.put("1G. Gembira Coffe",new HashMap<>(ukuranMenu));

        ukuranMenu.put("Medium",20_000);
        ukuranMenu.put("Large",28_000);
        daftarMenuCoffeBrezze.put("2G. Sweet Sour Lime Coffe",new HashMap<>(ukuranMenu));
        semuaMenu.put("Cofee Brezze",daftarMenuCoffeBrezze);
        
        
    
    }
}
