/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package kasir_app;

import com.formdev.flatlaf.FlatDarkLaf;
import com.formdev.flatlaf.FlatLightLaf;
import javax.swing.UIManager;

/**
 *
 * @author  : Purwa | Andrian M.D
 * 
 * Created  : 26 Apr 2026
 */
public class ThemeManager {
    
    public static void setup(){
        try{
            UIManager.setLookAndFeel(new FlatLightLaf());
            
        }catch(Exception err){
            System.err.println("Gagal Memuat Flatflaf");
        }
    }
}
