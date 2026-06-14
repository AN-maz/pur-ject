package database;

import static database.Database.semuaStokBahan;
import java.util.ArrayList;

public class StokGudang {
    
    static{
    
        ArrayList<Object> bahanStok = new ArrayList<>();
        
        bahanStok.add(1000);
        bahanStok.add("ml");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("susu cair",bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("kopi bubuk", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("ml");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("air",bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("gula", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("teh bubuk", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("green tea bubuk", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(100);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("pandan", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("teh hijau", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("teh thailand", bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(10_000);
        bahanStok.add("gram");
        bahanStok.add("tidak ada");
        semuaStokBahan.put("es batu",bahanStok);

        bahanStok = new ArrayList<>();
        bahanStok.add(1000);
        bahanStok.add("gram");
        bahanStok.add("12-12-2025");
        semuaStokBahan.put("teh thailand",bahanStok);
    }
}
