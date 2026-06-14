package datacaffegui02;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.DriverManager;

public class Koneksi {
    
    public static Connection mysqlkonek;
    
    public static Connection koneksiDb()throws SQLException{
        if(mysqlkonek == null){
            try{
                String DB = "jdbc:mysql://localhost:3306/db_datacaffe";
                String user = "root";
                String pass = "";
                DriverManager.registerDriver(new com.mysql.jdbc.Driver());
                mysqlkonek = (Connection)DriverManager.getConnection(DB,user,pass);
                
            }catch(Exception e){
                
          
            }
        }
        return mysqlkonek;
    }
}
