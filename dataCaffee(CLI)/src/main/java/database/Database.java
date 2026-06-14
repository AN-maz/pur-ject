package database;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

/**
 *
 * @author yan
 */
public class Database {
    
    public static LinkedHashMap<String,LinkedHashMap<String,HashMap<String,Integer>>> semuaMenu = new LinkedHashMap<>();
    public static HashMap <String,ArrayList<Object>> semuaStokBahan = new HashMap<>();
    public static HashMap <String,HashMap<String,Integer>> semuaResep = new HashMap<>();
    
}
