package datacaffegui02;

import com.formdev.flatlaf.FlatLightLaf;
import javax.swing.UIManager;

public class DatacaffeGUI02 {

    public static void main(String[] args) {
        // TODO code application logic here
        style();  
        Login p = new Login();
        p.pack();
        p.setLocationRelativeTo(null);
        p.setResizable(false);
        p.setVisible(true);
    }
    
    
    private static void style(){
        
         FlatLightLaf.setup();
         
         UIManager.put("Button.arc", 20); // biar rounded
         
    }
}
