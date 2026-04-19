package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author  : Purwa | Andrian M.D
 * Created  : 13 Apr 2026
 */


public class KoneksiDatabase {
    
     public static Connection mySql_konek;
    
    public static Connection dB_koneksi()throws SQLException{
        
        if(mySql_konek == null){
            
            String dB = "jdbc:mysql://localhost:3306/db_krs_kampus";
            String user = "root";
            String pass = "";
            
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            mySql_konek = (Connection) DriverManager.getConnection(dB,user,pass);      
        }
        return mySql_konek;
    }

}
