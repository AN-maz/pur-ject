/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author  : Purwa | Andrian M.D
 * 
 * Created  : 7 May 2026
 */
public class Koneksi {
    
     public static Connection mySql_konek;
    
    public static Connection dB_koneksi()throws SQLException{
        
        if(mySql_konek == null){
            
            String dB = "jdbc:mysql://localhost:3306/db_kasir";
            String user = "root";
            String pass = "";
            
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            mySql_konek = (Connection) DriverManager.getConnection(dB,user,pass);      
        }
        return mySql_konek;
    }

}
