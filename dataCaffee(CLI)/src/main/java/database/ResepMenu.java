package database;

import static database.Database.semuaResep;
import java.util.HashMap;

public class ResepMenu {
    
    static{
        
         // Asiatino
        HashMap<String, Integer> latte = new HashMap<>();
        latte.put("kopi bubuk", 10);
        latte.put("susu cair", 100);
        latte.put("gula", 5);
        semuaResep.put("1A. Latte", latte);

        HashMap<String, Integer> kleponLatte = new HashMap<>();
        kleponLatte.put("kopi bubuk", 12);
        kleponLatte.put("susu cair", 90);
        kleponLatte.put("gula", 7);
        kleponLatte.put("pandan", 5);
        semuaResep.put("2A. Klepon Latte", kleponLatte);

        HashMap<String, Integer> kleponMacchiato = new HashMap<>();
        kleponMacchiato.put("kopi bubuk", 15);      
        kleponMacchiato.put("susu cair", 120);      
        kleponMacchiato.put("gula", 10);            
        kleponMacchiato.put("pandan", 8);           
        semuaResep.put("3A. Klepon Macchiato", kleponMacchiato);

        // Milk tea & Choco
        HashMap<String, Integer> greenTeaLatte = new HashMap<>();
        greenTeaLatte.put("teh hijau", 10);    
        greenTeaLatte.put("susu cair", 100);   
        greenTeaLatte.put("gula", 5);        
        semuaResep.put("1B. Green tea latte (hot/cold)", greenTeaLatte);

        HashMap<String, Integer> thaiTeaLatte = new HashMap<>();
        thaiTeaLatte.put("teh thailand", 12); 
        thaiTeaLatte.put("susu cair", 100);     
        thaiTeaLatte.put("gula", 7);            
        semuaResep.put("2B. Thai Tea Latte (Hot/Cold)", thaiTeaLatte);

        HashMap<String, Integer> javaChocoLatte = new HashMap<>();
        javaChocoLatte.put("kakao bubuk", 15); 
        javaChocoLatte.put("susu cair", 100);   
        javaChocoLatte.put("gula", 5);          
        semuaResep.put("3B. Java Choko latte (Hot/Cold)", javaChocoLatte);

        HashMap<String, Integer> chocoHazelnutLatte = new HashMap<>();
        chocoHazelnutLatte.put("coklat bubuk", 12);  
        chocoHazelnutLatte.put("hazelnut syrup", 15);   
        chocoHazelnutLatte.put("susu cair", 100);       
        chocoHazelnutLatte.put("gula", 7);            
        semuaResep.put("4B. Choco Hazelnut Latte", chocoHazelnutLatte);

        // Tea Selection:
        HashMap<String, Integer> lycheeTea = new HashMap<>();
        lycheeTea.put("teh hitam", 10);       
        lycheeTea.put("sirup lychee", 30);    
        lycheeTea.put("es batu", 100);         
        lycheeTea.put("gula", 5);            
        semuaResep.put("1C. Shaken Iced Lychee Tea", lycheeTea);

        HashMap<String, Integer> lemonTea = new HashMap<>();
        lemonTea.put("teh hitam", 10);      
        lemonTea.put("sirup lemon", 25);    
        lemonTea.put("es batu", 100);        
        lemonTea.put("gula", 5);            
        semuaResep.put("2C. Shaken Iced Lemon Tea", lemonTea);

        HashMap<String, Integer> hotLemonTea = new HashMap<>();
        hotLemonTea.put("teh Hitam", 10);    
        hotLemonTea.put("air", 200);         
        hotLemonTea.put("gula", 5);          
        semuaResep.put("3C. Hot Lemon Tea", hotLemonTea);

        HashMap<String, Integer> hotGreenTea = new HashMap<>();
        hotGreenTea.put("teh Hijau", 10);    
        hotGreenTea.put("air", 200);        
        hotGreenTea.put("gula", 5);          
        semuaResep.put("4C. Hot The Hijau", hotGreenTea);

        // Ice Cream
        HashMap<String, Integer> afogato = new HashMap<>();
        afogato.put("es krim vanila", 1);     
        afogato.put("espresso", 50);        
        semuaResep.put("1D. Afogato", afogato);

        HashMap<String, Integer> extraFloat = new HashMap<>();
        extraFloat.put("es krim vanila", 1);  
        extraFloat.put("soda", 150);        
        extraFloat.put("sirup gula", 10);    
        semuaResep.put("2D. Extra Float", extraFloat);

        // Manual Brew
        HashMap<String, Integer> tubruk = new HashMap<>();
        tubruk.put("kopi bubuk", 15);        
        tubruk.put("air panas", 200);     
        semuaResep.put("1E. Tubruk", tubruk);

        HashMap<String, Integer> pourOver = new HashMap<>();
        pourOver.put("kopi bubuk", 15);     
        pourOver.put("air panas", 250);    
        pourOver.put("filter", 1);         
        semuaResep.put("2E. Pour Over", pourOver);

        HashMap<String, Integer> vietnamDrip = new HashMap<>();
        vietnamDrip.put("kopi bubuk", 10); 
        vietnamDrip.put("susu kental manis", 30);
        vietnamDrip.put("air Panas", 100);  
        vietnamDrip.put("vietnam drip filter", 1);
        semuaResep.put("3E. Vietnam Drip", vietnamDrip);

        HashMap<String, Integer> frenchPress = new HashMap<>();
        frenchPress.put("kopi bubuk", 15);   
        frenchPress.put("air panas", 200);   
        frenchPress.put("french press", 1); 
        semuaResep.put("4E. French Press", frenchPress);

        // Espresso Classic
        HashMap<String, Integer> espresso = new HashMap<>();
        espresso.put("espresso", 30);       
        semuaResep.put("1F. Espresso", espresso);

        HashMap<String, Integer> americano = new HashMap<>();
        americano.put("espresso", 30);      
        americano.put("air panas", 120);  
        semuaResep.put("2F. Americano", americano);

        HashMap<String, Integer> caffeLatte = new HashMap<>();
        caffeLatte.put("espresso", 30);      
        caffeLatte.put("susu cair", 150);    
        caffeLatte.put("foam susu", 20);     
        semuaResep.put("3F. Caffe Latte", caffeLatte);

        HashMap<String, Integer> capucino = new HashMap<>();
        capucino.put("espresso", 30);        
        capucino.put("susu cair", 100);     
        capucino.put("foam susu", 50);       
        semuaResep.put("4F. Capucino", capucino);

        HashMap<String, Integer> marochino = new HashMap<>();
        marochino.put("espresso", 30);     
        marochino.put("susu cair", 100); 
        marochino.put("coklat bubuk", 5);   
        marochino.put("foam susu", 20);    
        semuaResep.put("5F. Marochino", marochino);

        HashMap<String, Integer> arangeLatte = new HashMap<>();
        arangeLatte.put("espresso", 30);  
        arangeLatte.put("susu cair", 150);  
        arangeLatte.put("sirup jeruk", 20); 
        semuaResep.put("6F. Arange Latte", arangeLatte);

        HashMap<String, Integer> dualLatte = new HashMap<>();
        dualLatte.put("espresso", 30);       
        dualLatte.put("susu cair", 150);    
        dualLatte.put("foam susu", 20);      
        dualLatte.put("es batu", 100);       
        semuaResep.put("7F. Dual Latte (cold)", dualLatte);

        HashMap<String, Integer> bruleeLatte = new HashMap<>();
        bruleeLatte.put("espresso", 30);    
        bruleeLatte.put("susu cair", 150);  
        bruleeLatte.put("foam susu", 20);    
        bruleeLatte.put("caramel", 10);      
        semuaResep.put("8F. Brulee Latte", bruleeLatte);

        HashMap<String, Integer> cafeHalnutLatte = new HashMap<>();
        cafeHalnutLatte.put("espresso", 30); 
        cafeHalnutLatte.put("susu cair", 150); 
        cafeHalnutLatte.put("sirup hazelnut", 10); 
        semuaResep.put("9F. Cafe Halnut Latte", cafeHalnutLatte);

        // Coffee Breeze
        HashMap<String, Integer> gembiraCoffee = new HashMap<>();
        gembiraCoffee.put("espresso", 30);   
        gembiraCoffee.put("susu cair", 150); 
        gembiraCoffee.put("susu kental manis", 20);
        gembiraCoffee.put("es batu", 100);  
        semuaResep.put("1G. Gembira Coffe", gembiraCoffee);

        HashMap<String, Integer> sweetSourLimeCoffee = new HashMap<>();
        sweetSourLimeCoffee.put("espresso", 30);  
        sweetSourLimeCoffee.put("sirup lemon", 20); 
        sweetSourLimeCoffee.put("susu cair", 150);  
        sweetSourLimeCoffee.put("es batu", 100);
        semuaResep.put("2G. Sweet Sour Lime Coffe", sweetSourLimeCoffee);

    }
}
