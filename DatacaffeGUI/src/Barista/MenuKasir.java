package Barista;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.swing.DefaultListModel;
import javax.swing.JOptionPane;

/**
 *
 * @author yan
 */
public class MenuKasir extends javax.swing.JFrame {

    DefaultListModel<String> listModel = new DefaultListModel();
    private String id_transaksiOn = null;

    public MenuKasir() {
        initComponents();
        loadJenisMenu();
    }

    public String generateID_transaksi(Connection conn) {
        String prefix = "TRX";
        String sql = "SELECT * FROM transaksi ORDER BY id_transaksi DESC LIMIT 1";
        String id_baru = "";

        try {
            conn = datacaffegui02.Koneksi.koneksiDb();
            PreparedStatement pst = conn.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                String id_lama = rs.getString("id_transaksi");

                String angka = id_lama.substring(3);
                int nomor = Integer.parseInt(angka);
                id_baru = String.format("%s%03d", prefix, nomor + 1);
            } else {
                id_baru = prefix + "001";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return id_baru;
    }

    public String generateID_detail(Connection conn) {

        String prefix = "PnDTL";
        String sql = "SELECT * FROM transaksi_detail ORDER BY id_detail DESC LIMIT 1";
        String id_baru = "";

        try {

            conn = datacaffegui02.Koneksi.koneksiDb();
            PreparedStatement pst = conn.prepareStatement(sql);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {

                String id_lama = rs.getString("id_detail");

                String nomorStr = id_lama.substring(prefix.length());
                int nomor = Integer.parseInt(nomorStr);
                nomor++;

                id_baru = String.format("%s%05d", prefix, nomor);
            } else {
                id_baru = prefix + "00001";
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return id_baru;
    }

    private void loadMenuByJenis(String nama_jenis) {

        try {
            java.sql.Connection conn = datacaffegui02.Koneksi.koneksiDb();
            String sql = "SELECT menu.nama_menu FROM menu "
                    + "INNER JOIN jenis_menu ON menu.id_jenis = jenis_menu.id_jenis "
                    + "WHERE jenis_menu.nama_jenis = ?";
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, nama_jenis);

            ResultSet rs = pst.executeQuery();

            cbb_menu.removeAllItems();

            while (rs.next()) {
                cbb_menu.addItem(rs.getString("nama_menu"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void loadJenisMenu() {

        try {
            java.sql.Connection conn = datacaffegui02.Koneksi.koneksiDb();
            String sql = "SELECT * FROM jenis_menu";
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);

            ResultSet rs = pst.executeQuery();

            // cbb_jenis.removeAllItems();
            while (rs.next()) {
                String nama_jenis = rs.getString("nama_jenis");
                cbb_jenis.addItem(nama_jenis);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    private void updateTotal() {

        int totalAll = 0;

        for (int i = 0; i < listModel.size(); i++) {

            String item = listModel.get(i);
            String[] parts = item.split("Rp");

            if (parts.length > 1) {
                try {
                    int hargaItem = Integer.parseInt(parts[1].replaceAll("[^\\d]", ""));
                    totalAll += hargaItem;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        tf_total.setText(String.format("Rp%,d", totalAll));

    }

    private int hitungTotal() {

        int totalAll = 0;

        for (int i = 0; i < listModel.size(); i++) {
            String item = listModel.get(i);
            String[] parts = item.split("Rp");

            if (parts.length > 1) {
                try {
                    int hargaItem = Integer.parseInt(parts[1].replace(".", "").replace(",", "").trim());
                    totalAll += hargaItem;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        return totalAll;
    }

    public void setFormBarista(String nama, String shift, String date) {
        label_barista.setText(nama);
        label_shift.setText(shift);
        lb_tanggal.setText(date);
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        buttonGroup1 = new javax.swing.ButtonGroup();
        jPanel1 = new javax.swing.JPanel();
        jPanel3 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        lb_tanggal = new javax.swing.JLabel();
        label_barista = new javax.swing.JLabel();
        btn_gudang = new javax.swing.JButton();
        btn_keluar = new javax.swing.JButton();
        label_barista1 = new javax.swing.JLabel();
        label_shift = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        btn_listMenu = new javax.swing.JButton();
        cbb_jenis = new javax.swing.JComboBox<>();
        cbb_menu = new javax.swing.JComboBox<>();
        btn_add = new javax.swing.JButton();
        btn_del = new javax.swing.JButton();
        jScrollPane1 = new javax.swing.JScrollPane();
        list_pesanan = new javax.swing.JList<>();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        tf_total = new javax.swing.JTextField();
        cbb_bayar = new javax.swing.JComboBox<>();
        btn_bayar = new javax.swing.JButton();
        jPanel5 = new javax.swing.JPanel();
        rb_large = new javax.swing.JRadioButton();
        rb_small = new javax.swing.JRadioButton();
        sp_kuantitas = new javax.swing.JSpinner();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));

        jPanel3.setBackground(new java.awt.Color(0, 0, 0));

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 8, Short.MAX_VALUE)
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 56, Short.MAX_VALUE)
        );

        jLabel1.setBackground(new java.awt.Color(0, 0, 0));
        jLabel1.setFont(new java.awt.Font("Arial", 1, 24)); // NOI18N
        jLabel1.setForeground(new java.awt.Color(0, 0, 0));
        jLabel1.setText("KASIR");

        lb_tanggal.setFont(new java.awt.Font("Arial", 1, 14)); // NOI18N
        lb_tanggal.setForeground(new java.awt.Color(0, 0, 0));
        lb_tanggal.setText("2025 - 12 - 12");

        label_barista.setFont(new java.awt.Font("Arial", 1, 14)); // NOI18N
        label_barista.setForeground(new java.awt.Color(0, 0, 0));
        label_barista.setText("Barista ");

        btn_gudang.setBackground(new java.awt.Color(0, 0, 0));
        btn_gudang.setForeground(new java.awt.Color(255, 255, 255));
        btn_gudang.setText("Gudang");
        btn_gudang.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_gudangActionPerformed(evt);
            }
        });

        btn_keluar.setBackground(new java.awt.Color(0, 0, 0));
        btn_keluar.setForeground(new java.awt.Color(255, 255, 255));
        btn_keluar.setText("Home");
        btn_keluar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_keluarActionPerformed(evt);
            }
        });

        label_barista1.setFont(new java.awt.Font("Arial", 1, 14)); // NOI18N
        label_barista1.setForeground(new java.awt.Color(0, 0, 0));
        label_barista1.setText("|");

        label_shift.setFont(new java.awt.Font("Arial", 1, 14)); // NOI18N
        label_shift.setForeground(new java.awt.Color(0, 0, 0));
        label_shift.setText("Shift");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(24, 24, 24)
                .addComponent(jPanel3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(label_barista)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(label_barista1)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(label_shift)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 210, Short.MAX_VALUE)
                        .addComponent(btn_keluar, javax.swing.GroupLayout.PREFERRED_SIZE, 85, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(btn_gudang, javax.swing.GroupLayout.PREFERRED_SIZE, 85, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addComponent(lb_tanggal)
                        .addGap(21, 21, 21))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(33, 33, 33)
                        .addComponent(jLabel1)
                        .addGap(0, 0, 0)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(lb_tanggal)
                            .addComponent(label_barista)
                            .addComponent(btn_gudang)
                            .addComponent(btn_keluar)
                            .addComponent(label_barista1)
                            .addComponent(label_shift)))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(22, 22, 22)
                        .addComponent(jPanel3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(22, Short.MAX_VALUE))
        );

        getContentPane().add(jPanel1, java.awt.BorderLayout.PAGE_START);

        jPanel2.setBackground(new java.awt.Color(139, 69, 19));
        jPanel2.setForeground(new java.awt.Color(255, 255, 255));

        btn_listMenu.setBackground(new java.awt.Color(0, 0, 0));
        btn_listMenu.setForeground(new java.awt.Color(255, 255, 255));
        btn_listMenu.setText("List Menu");
        btn_listMenu.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_listMenuActionPerformed(evt);
            }
        });

        cbb_jenis.setBackground(new java.awt.Color(255, 255, 255));
        cbb_jenis.setForeground(new java.awt.Color(0, 0, 0));
        cbb_jenis.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cbb_jenisActionPerformed(evt);
            }
        });

        cbb_menu.setBackground(new java.awt.Color(255, 255, 255));
        cbb_menu.setForeground(new java.awt.Color(0, 0, 0));

        btn_add.setBackground(new java.awt.Color(0, 0, 0));
        btn_add.setForeground(new java.awt.Color(255, 255, 255));
        btn_add.setText("Add");
        btn_add.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_addActionPerformed(evt);
            }
        });

        btn_del.setBackground(new java.awt.Color(0, 0, 0));
        btn_del.setForeground(new java.awt.Color(255, 255, 255));
        btn_del.setText("Del");
        btn_del.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_delActionPerformed(evt);
            }
        });

        list_pesanan.setBackground(new java.awt.Color(139, 69, 19));
        list_pesanan.setForeground(new java.awt.Color(255, 255, 255));
        jScrollPane1.setViewportView(list_pesanan);

        jLabel4.setBackground(new java.awt.Color(0, 0, 0));
        jLabel4.setFont(new java.awt.Font("Arial", 1, 18)); // NOI18N
        jLabel4.setForeground(new java.awt.Color(0, 0, 0));
        jLabel4.setText("List pesanan");

        jLabel5.setBackground(new java.awt.Color(0, 0, 0));
        jLabel5.setFont(new java.awt.Font("Arial", 1, 14)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(255, 255, 255));
        jLabel5.setText("total");

        tf_total.setBackground(new java.awt.Color(139, 69, 19));
        tf_total.setForeground(new java.awt.Color(255, 255, 255));

        cbb_bayar.setBackground(new java.awt.Color(255, 255, 255));
        cbb_bayar.setForeground(new java.awt.Color(0, 0, 0));
        cbb_bayar.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Metode Pembayaran", "1. Cash", "2. Qris", "3. Debit" }));

        btn_bayar.setBackground(new java.awt.Color(0, 204, 0));
        btn_bayar.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        btn_bayar.setForeground(new java.awt.Color(255, 255, 255));
        btn_bayar.setText("Bayar");
        btn_bayar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_bayarActionPerformed(evt);
            }
        });

        jPanel5.setBackground(new java.awt.Color(255, 153, 0));

        rb_large.setBackground(new java.awt.Color(255, 153, 0));
        buttonGroup1.add(rb_large);
        rb_large.setForeground(new java.awt.Color(255, 255, 255));
        rb_large.setText("Large");

        rb_small.setBackground(new java.awt.Color(255, 153, 0));
        buttonGroup1.add(rb_small);
        rb_small.setForeground(new java.awt.Color(255, 255, 255));
        rb_small.setText("Small");

        javax.swing.GroupLayout jPanel5Layout = new javax.swing.GroupLayout(jPanel5);
        jPanel5.setLayout(jPanel5Layout);
        jPanel5Layout.setHorizontalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel5Layout.createSequentialGroup()
                .addGap(28, 28, 28)
                .addComponent(rb_small)
                .addGap(28, 28, 28)
                .addComponent(rb_large)
                .addContainerGap(40, Short.MAX_VALUE))
        );
        jPanel5Layout.setVerticalGroup(
            jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel5Layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(jPanel5Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(rb_small)
                    .addComponent(rb_large))
                .addGap(16, 16, 16))
        );

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(39, 39, 39)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addComponent(btn_add, javax.swing.GroupLayout.DEFAULT_SIZE, 98, Short.MAX_VALUE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(btn_del, javax.swing.GroupLayout.PREFERRED_SIZE, 96, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(51, 51, 51))
                    .addGroup(javax.swing.GroupLayout.Alignment.LEADING, jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                            .addComponent(btn_listMenu, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(cbb_jenis, 0, 200, Short.MAX_VALUE)
                            .addComponent(cbb_menu, 0, 200, Short.MAX_VALUE)
                            .addComponent(jPanel5, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(sp_kuantitas, javax.swing.GroupLayout.Alignment.LEADING))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                        .addComponent(cbb_bayar, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addGap(18, 18, 18)
                        .addComponent(jLabel5)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(tf_total, javax.swing.GroupLayout.PREFERRED_SIZE, 130, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 339, Short.MAX_VALUE)
                    .addComponent(jLabel4)
                    .addComponent(btn_bayar, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addGap(42, 42, 42))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(37, 37, 37)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(btn_listMenu, javax.swing.GroupLayout.DEFAULT_SIZE, 39, Short.MAX_VALUE)
                    .addComponent(jLabel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 166, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addComponent(cbb_jenis, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addComponent(cbb_menu, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jPanel5, javax.swing.GroupLayout.PREFERRED_SIZE, 31, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(11, 11, 11)))
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(25, 25, 25)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel5)
                            .addComponent(tf_total)
                            .addComponent(cbb_bayar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addComponent(btn_bayar, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(0, 0, Short.MAX_VALUE)
                        .addComponent(sp_kuantitas, javax.swing.GroupLayout.PREFERRED_SIZE, 26, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(btn_del, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 47, Short.MAX_VALUE)
                            .addComponent(btn_add, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
                .addContainerGap(24, Short.MAX_VALUE))
        );

        getContentPane().add(jPanel2, java.awt.BorderLayout.CENTER);

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btn_gudangActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_gudangActionPerformed
        // TODO add your handling code here:
        Gudang p = new Gudang();
        p.pack();
        p.setLocationRelativeTo(null);
        p.setResizable(false);
        p.setVisible(true);
        this.dispose();
    }//GEN-LAST:event_btn_gudangActionPerformed

    private void btn_listMenuActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_listMenuActionPerformed
        // TODO add your handling code here:
        MenuList p = new MenuList(this, true);
        p.setLocationRelativeTo(null);
        p.setResizable(false);
        p.setVisible(true);
    }//GEN-LAST:event_btn_listMenuActionPerformed

    private void cbb_jenisActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cbb_jenisActionPerformed
        // TODO add your handling code here:
        String selectedJenis = cbb_jenis.getSelectedItem().toString();
        loadMenuByJenis(selectedJenis);
    }//GEN-LAST:event_cbb_jenisActionPerformed

    private void btn_addActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_addActionPerformed
        // TODO add your handling code here:
        String getMenu = cbb_menu.getSelectedItem().toString();
        String ukuran = rb_large.isSelected() ? "large" : "small";
        int qty = (int) sp_kuantitas.getValue();

        if (qty <= 0) {
            JOptionPane.showMessageDialog(
                    this,
                    "Kuantitas tidak boleh 0 atau negatif!",
                    "Peringatan",
                    JOptionPane.WARNING_MESSAGE
            );
            return;
        }

        try {
            java.sql.Connection conn = datacaffegui02.Koneksi.koneksiDb();
            String sql = "SELECT harga FROM ukuran_menu "
                    + "JOIN menu on ukuran_menu.id_menu = menu.id_menu "
                    + "WHERE menu.nama_menu = ? AND ukuran_menu.ukuran = ?";
            java.sql.PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, getMenu);
            pst.setString(2, ukuran);

            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                int harga = rs.getInt("harga");
                int total = harga * qty;
                String itemPesanan = getMenu + "- " + ukuran + " - Qty: " + qty + " - Rp" + total;
                listModel.addElement(itemPesanan);
                list_pesanan.setModel(listModel);

                if (id_transaksiOn == null) {

                    id_transaksiOn = generateID_transaksi(conn);

                    String CekTransaksi = "SELECT COUNT(*) FROM transaksi WHERE id_transaksi = ?";
                    PreparedStatement pstCek = conn.prepareStatement(CekTransaksi);
                    pstCek.setString(1, id_transaksiOn);
                    ResultSet rsCek = pstCek.executeQuery();

                    boolean sudahAda = false;

                    if (rsCek.next()) {
                        sudahAda = rsCek.getInt(1) > 0;
                    }
                    pstCek.close();
                    rsCek.close();

                    if (!sudahAda) {
                        String sqlID_transaksi = "INSERT INTO transaksi(id_transaksi) VALUES(?)";
                        PreparedStatement pstID_transaksi = conn.prepareStatement(sqlID_transaksi);
                        pstID_transaksi.setString(1, id_transaksiOn);
                        pstID_transaksi.executeUpdate();
                        pstID_transaksi.close();
                    }
                }
                // Detail Pesanan: 
                String sqlID_detail
                        = "INSERT INTO transaksi_detail "
                        + "(id_detail,id_transaksi,id_menu,id_ukuran, jumlah,total_harga) "
                        + "VALUES (?,?,?,?,?,?)";

                PreparedStatement pst_detail = conn.prepareStatement(sqlID_detail);

                // ngisi value detail transaksi
                String id_detail = generateID_detail(conn);

                // ID Menu
                PreparedStatement pstMenu = conn.prepareStatement("SELECT id_menu FROM menu WHERE nama_menu = ?");
                pstMenu.setString(1, getMenu);
                ResultSet rsMenu = pstMenu.executeQuery();

                String id_menu = "";
                if (rsMenu.next()) {
                    id_menu = rsMenu.getString("id_menu");
                }

                pstMenu.close();
                rsMenu.close();

                if (id_menu.isEmpty()) {
                    JOptionPane.showMessageDialog(this, "Id Menu tidak ditemukan!");
                    return;
                }

                // ID Ukuran
                PreparedStatement pstUkuran = conn.prepareStatement(
                        "SELECT id_ukuran FROM ukuran_menu WHERE id_menu = ? AND ukuran = ?");
                pstUkuran.setString(1, id_menu);
                pstUkuran.setString(2, ukuran);
                ResultSet rsUkuran = pstUkuran.executeQuery();

                String id_ukuran = "";
                if (rsUkuran.next()) {
                    id_ukuran = rsUkuran.getString("id_ukuran");
                }

                pstUkuran.close();
                rsUkuran.close();

                // Memasukan Nilai ke database
                pst_detail.setString(1, id_detail);
                pst_detail.setString(2, id_transaksiOn);
                pst_detail.setString(3, id_menu);
                pst_detail.setString(4, id_ukuran);
                pst_detail.setInt(5, qty);
                pst_detail.setInt(6, total);

                pst_detail.executeUpdate();
                pst_detail.close();

                int totalAll = 0;

                for (int i = 0; i < listModel.size(); i++) {

                    String item = listModel.get(i);
                    String[] parts = item.split("Rp");

                    if (parts.length > 1) {
                        try {
                            int hargaItem = Integer.parseInt(parts[1].replaceAll("[^\\d]", ""));
                            totalAll += hargaItem;
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }

                tf_total.setText(String.format("Rp%,d", totalAll));

            } else {
                JOptionPane.showMessageDialog(this, "Harga tidak ditemukan!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }//GEN-LAST:event_btn_addActionPerformed

    private void btn_delActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_delActionPerformed
        // TODO add your handling code here:
        int selectedItem = list_pesanan.getSelectedIndex();

        if (selectedItem != -1) {
            listModel.remove(selectedItem);
            updateTotal();
        } else {
            JOptionPane.showMessageDialog(this, "Pilih item yang ingin dihapus!");
        }
    }//GEN-LAST:event_btn_delActionPerformed

    private void btn_bayarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_bayarActionPerformed
        // TODO add your handling code here:
        int subTotal = hitungTotal();

        double ppn = subTotal * 0.12;
        int totalAll = subTotal + (int) ppn;

        String metode = cbb_bayar.getSelectedItem() != null ? cbb_bayar.getSelectedItem().toString() : "";

        String barista = label_barista.getText();

        switch (metode) {

            case "1. Cash":
                CashForm cf = new CashForm(subTotal, (int) ppn, totalAll, barista, id_transaksiOn);
                cf.pack();
                cf.setLocationRelativeTo(null);
                cf.setVisible(true);

                id_transaksiOn = null;
                listModel.clear();
                sp_kuantitas.setValue(0);
                buttonGroup1.clearSelection();
                tf_total.setText("");

                break;
            case "2. Qris":
                break;
            case "3. Debit":
                Debitform df = new Debitform(subTotal, (int) ppn, totalAll, barista, id_transaksiOn);
                df.pack();
                df.setLocationRelativeTo(null);
                df.setVisible(true);

                id_transaksiOn = null;
                listModel.clear();
                sp_kuantitas.setValue(0);
                buttonGroup1.clearSelection();
                tf_total.setText("");

                break;
            default:
                JOptionPane.showMessageDialog(this, "Silakan pilih metode pembayaran.");
        }
    }//GEN-LAST:event_btn_bayarActionPerformed

    private void btn_keluarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_keluarActionPerformed
        // TODO add your handling code here:
        MenuBarista p = new MenuBarista();
        p.pack();
        p.setLocationRelativeTo(null);
        p.setResizable(false);
        p.setVisible(true);
        this.dispose();
    }//GEN-LAST:event_btn_keluarActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btn_add;
    private javax.swing.JButton btn_bayar;
    private javax.swing.JButton btn_del;
    private javax.swing.JButton btn_gudang;
    private javax.swing.JButton btn_keluar;
    private javax.swing.JButton btn_listMenu;
    private javax.swing.ButtonGroup buttonGroup1;
    private javax.swing.JComboBox<String> cbb_bayar;
    private javax.swing.JComboBox<String> cbb_jenis;
    private javax.swing.JComboBox<String> cbb_menu;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;
    private javax.swing.JPanel jPanel5;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JLabel label_barista;
    private javax.swing.JLabel label_barista1;
    private javax.swing.JLabel label_shift;
    private javax.swing.JLabel lb_tanggal;
    private javax.swing.JList<String> list_pesanan;
    private javax.swing.JRadioButton rb_large;
    private javax.swing.JRadioButton rb_small;
    private javax.swing.JSpinner sp_kuantitas;
    private javax.swing.JTextField tf_total;
    // End of variables declaration//GEN-END:variables
}
