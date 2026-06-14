package damkar02;

import java.util.UUID;
import javax.swing.DefaultListModel;
import javax.swing.JOptionPane;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Proses_laporan extends javax.swing.JFrame {

    private String id_laporan;
    private DefaultListModel<String> listModel;

    public Proses_laporan(String id_laporan) {
        initComponents();

        this.id_laporan = id_laporan;

        listModel = new DefaultListModel<String>();
        li_regu.setModel(listModel);

        pangkat_regu();
        isi_cbbUnit();
    }

    private void pangkat_regu() {
        cbb_pangkat.removeAllItems();

        cbb_pangkat.addItem("Komandan Regu");
        cbb_pangkat.addItem("Operator");
        cbb_pangkat.addItem("Anggota PNS");
        cbb_pangkat.addItem("Anggota Non-PNS");
        cbb_pangkat.addItem("Driver");
    }

    private void isi_cbbUnit() {
        String sql = "SELECT id_unit,jenis_unit from unit_damkar where status = 'Tersedia'";

        try {
            Connection conn = damkar02.Koneksi.dB_koneksi();
            PreparedStatement pst = conn.prepareCall(sql);
            ResultSet rs = pst.executeQuery();

            cbb_unit.removeAllItems();

            while (rs.next()) {
                String id = rs.getString("id_unit");
                String jenis = rs.getString("jenis_unit");
                cbb_unit.addItem(id + " - " + jenis);
            }
        } catch (Exception e) {

            JOptionPane.showMessageDialog(this, "Gagal memuat data unit: " + e.getMessage(), "Error Database", JOptionPane.ERROR_MESSAGE);
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        cbb_pangkat = new javax.swing.JComboBox<>();
        jLabel4 = new javax.swing.JLabel();
        tf_petugas = new javax.swing.JTextField();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        cbb_unit = new javax.swing.JComboBox<>();
        jLabel7 = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        li_regu = new javax.swing.JList<>();
        btn_tambah = new javax.swing.JButton();
        btn_kirim = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jPanel1.setBackground(new java.awt.Color(0, 0, 51));

        jLabel1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/icons/arrow_upload_progress_50.png"))); // NOI18N

        jLabel2.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(255, 255, 255));
        jLabel2.setText("PROSES LAPORAN");

        jLabel3.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(255, 255, 255));
        jLabel3.setText("SinaranDamkar");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(24, 24, 24)
                .addComponent(jLabel1)
                .addGap(18, 18, 18)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel3)
                    .addComponent(jLabel2))
                .addContainerGap(399, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(21, 21, 21)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jLabel1)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel2)
                        .addGap(0, 0, 0)
                        .addComponent(jLabel3)))
                .addContainerGap(24, Short.MAX_VALUE))
        );

        getContentPane().add(jPanel1, java.awt.BorderLayout.PAGE_START);

        jPanel2.setBackground(new java.awt.Color(51, 0, 0));

        cbb_pangkat.setBackground(new java.awt.Color(51, 0, 0));
        cbb_pangkat.setForeground(new java.awt.Color(255, 255, 255));

        jLabel4.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel4.setForeground(new java.awt.Color(255, 255, 255));
        jLabel4.setText("PANGKAT");

        tf_petugas.setBackground(new java.awt.Color(51, 0, 0));
        tf_petugas.setForeground(new java.awt.Color(255, 255, 255));
        tf_petugas.setCaretColor(new java.awt.Color(255, 255, 255));

        jLabel5.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(255, 255, 255));
        jLabel5.setText("PETUGAS");

        jLabel6.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel6.setForeground(new java.awt.Color(255, 255, 255));
        jLabel6.setText("UNIT");

        cbb_unit.setBackground(new java.awt.Color(51, 0, 0));
        cbb_unit.setForeground(new java.awt.Color(255, 255, 255));
        cbb_unit.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cbb_unitActionPerformed(evt);
            }
        });

        jLabel7.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel7.setForeground(new java.awt.Color(255, 255, 255));
        jLabel7.setText("REGU  YG DIKIRIM");

        li_regu.setBackground(new java.awt.Color(51, 0, 0));
        li_regu.setForeground(new java.awt.Color(255, 255, 255));
        jScrollPane1.setViewportView(li_regu);

        btn_tambah.setBackground(new java.awt.Color(102, 0, 0));
        btn_tambah.setForeground(new java.awt.Color(255, 255, 255));
        btn_tambah.setText("TAMBAH");
        btn_tambah.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_tambahActionPerformed(evt);
            }
        });

        btn_kirim.setBackground(new java.awt.Color(0, 102, 0));
        btn_kirim.setForeground(new java.awt.Color(255, 255, 255));
        btn_kirim.setText("KIRIM REGU");
        btn_kirim.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btn_kirimActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(43, 43, 43)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(jLabel4)
                            .addComponent(jLabel5)
                            .addComponent(jLabel6))
                        .addGap(22, 22, 22)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(cbb_unit, javax.swing.GroupLayout.PREFERRED_SIZE, 176, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(tf_petugas, javax.swing.GroupLayout.PREFERRED_SIZE, 176, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(cbb_pangkat, javax.swing.GroupLayout.PREFERRED_SIZE, 176, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addComponent(btn_tambah, javax.swing.GroupLayout.PREFERRED_SIZE, 285, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(31, 31, 31)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 300, Short.MAX_VALUE)
                    .addComponent(jLabel7)
                    .addComponent(btn_kirim, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap(41, Short.MAX_VALUE))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(28, 28, 28)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addComponent(jLabel7)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 97, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(cbb_unit, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel6))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel5)
                            .addComponent(tf_petugas, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel4)
                            .addComponent(cbb_pangkat, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE))))
                .addGap(20, 20, 20)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btn_tambah, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btn_kirim, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(27, Short.MAX_VALUE))
        );

        getContentPane().add(jPanel2, java.awt.BorderLayout.CENTER);

        pack();
    }// </editor-fold>//GEN-END:initComponents


    private void btn_tambahActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_tambahActionPerformed
        // TODO add your handling code here:
        String nama_petugas = tf_petugas.getText();

        if (nama_petugas.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Nama petugas tidak boleh kosong!", "Peringatan", JOptionPane.WARNING_MESSAGE);
            return;
        }

        String pangkat = cbb_pangkat.getSelectedItem().toString();

        String data_regu = nama_petugas + " - " + pangkat;

        listModel.addElement(data_regu);

        tf_petugas.setText("");
        tf_petugas.requestFocus();
    }//GEN-LAST:event_btn_tambahActionPerformed

    private void btn_kirimActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btn_kirimActionPerformed
        // TODO add your handling code here:

        // validasi
        if (cbb_unit.getSelectedItem() == null) {
            JOptionPane.showMessageDialog
        (this, "Pilih unit terlebih dahulu MasPur!","Peringatan", JOptionPane.WARNING_MESSAGE);
            return;
        }
        if (listModel.isEmpty()) {
            JOptionPane.showMessageDialog
        (this, "Tambahkan minimal satu petugas ke dalam regu MasPur!", "Peringatan", JOptionPane.WARNING_MESSAGE);
            return;
        }

        int konfirmasi = JOptionPane.showConfirmDialog(this, "Anda yakin ingin mengirim regu ini? ",
                 "PERINGATAN", JOptionPane.YES_NO_OPTION);

        if (konfirmasi == JOptionPane.NO_OPTION) {
            return;
        }
        
        

        try {
            Connection conn = damkar02.Koneksi.dB_koneksi();

            String unit_terpilih = cbb_unit.getSelectedItem().toString();
            String id_unit = unit_terpilih.split(" - ")[0];

            for (int i = 0; i < listModel.getSize(); i++) {

                String data_regu = listModel.getElementAt(i);

                String[] parts = data_regu.split(" - ");
                String nama_petugas = parts[0].trim();
                String pangkat = parts[1].trim();

                String id_petugas = "PTG-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

                String sql_petugas 
                        = "INSERT INTO petugas "
                        + "(id_petugas,nama_petugas,pangkat) "
                        + "VALUES (?,?,?)";
                
                PreparedStatement pst_petugas = conn.prepareStatement(sql_petugas);
                pst_petugas.setString(1, id_petugas);
                pst_petugas.setString(2, nama_petugas);
                pst_petugas.setString(3, pangkat);
                pst_petugas.executeUpdate();
                pst_petugas.close();

                String sql_penugasan 
                        = "INSERT INTO penugasan"
                        + "(id_penugasan,id_laporan,id_petugas,id_unit) "
                        + "VALUES (?,?,?,?)";
                
                PreparedStatement pst_penugasan = conn.prepareStatement(sql_penugasan);
                String id_penugasan = "TGS-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
                pst_penugasan.setString(1, id_penugasan);
                pst_penugasan.setString(2, this.id_laporan);
                pst_penugasan.setString(3, id_petugas);
                pst_penugasan.setString(4, id_unit);
                pst_penugasan.executeUpdate();

                String sql_updateLaporan 
                        = "UPDATE laporan "
                        + "SET status_laporan = 'diproses' "
                        + "where id_laporan = ?;";
                
                PreparedStatement pst_updateLaporan = conn.prepareStatement(sql_updateLaporan);
                pst_updateLaporan.setString(1, this.id_laporan);
                pst_updateLaporan.executeUpdate();

                String sql_updateUnit 
                        = "UPDATE unit_damkar "
                        + "SET status = 'Bertugas' "
                        + "where id_unit = ?";
                PreparedStatement pst_updateUnit = conn.prepareCall(sql_updateUnit);
                pst_updateUnit.setString(1, id_unit);
                pst_updateUnit.executeUpdate();

                this.dispose();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        Menu_laporan2 p = new Menu_laporan2();
        p.pack();
        p.setLocationRelativeTo(null);
        p.setVisible(true);
        this.dispose();
    }//GEN-LAST:event_btn_kirimActionPerformed

    private void cbb_unitActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cbb_unitActionPerformed
        // TODO add your handling code here:


    }//GEN-LAST:event_cbb_unitActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btn_kirim;
    private javax.swing.JButton btn_tambah;
    private javax.swing.JComboBox<String> cbb_pangkat;
    private javax.swing.JComboBox<String> cbb_unit;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JList<String> li_regu;
    private javax.swing.JTextField tf_petugas;
    // End of variables declaration//GEN-END:variables
}
