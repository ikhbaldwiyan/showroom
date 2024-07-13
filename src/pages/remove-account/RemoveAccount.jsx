import MainLayout from "pages/layout/MainLayout";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RemoveAccount = () => {
  return (
    <MainLayout title="Remove Account">
      <div className="layout">
        <h3>Cara Menghapus Akun Showroom</h3>
        <p>
          Menghapus akun Anda akan secara permanen menghapus akun pengguna dan
          semua data terkait. Tindakan ini tidak dapat dibatalkan, jadi pastikan
          untuk mencadangkan informasi penting apa pun sebelum melanjutkan.
          Ikuti langkah-langkah di bawah ini untuk menghapus akun Anda dengan
          aman:
        </p>

        <h4>1. Masuk ke akun Anda</h4>
        <p>
          Silahkan buka web offical showroom disini{" "}
          <a href="https://www.showroom-live.com/" target="_blank">
            https://www.showroom-live.com
          </a>{" "}
          klik tombol login lalu masukkan account id dan password, kemudian
          tekan tombol login untuk Masuk.
        </p>

        <h4>2. Penghapusan Akun</h4>
        <p>
          Buka link ini{" "}
          <a
            href="https://www.showroom-live.com/user/account_delete_confirm"
            target="_blank"
          >
            https://www.showroom-live.com/user/account_delete_confirm
          </a>{" "}
          lalu klik tombol <b>"Agree and delete account"</b> yang terletak di
          bagian bawah.{" "}
        </p>

        <h4>3. Konfirmasi Penghapusan Akun</h4>
        <p>
          Ketika Anda menekan tombol <b>"Agree and delete account"</b>, sebuah
          dialog konfirmasi akan muncul. Jika Anda memilih <b>"Ok"</b>, akun
          showroom Anda akan dihapus. Perlu diingat bahwa penghapusan ini
          bersifat permanen dan tidak dapat dibatalkan. Pastikan Anda telah
          menyimpan semua informasi penting sebelum melanjutkan dengan
          penghapusan akun.
        </p>
        <h4>4. Penghapusan log aktivitas di platform JKT48 Showroom</h4>
        <p>
          <ul>
            <li>
              {" "}
              Silahkan login ke website JKT48 Showroom{" "}
              <Link to="/login">Disini</Link>
            </li>
            <li>
              Klik avatar profile di bawah sidebar atau di menu header jika kamu
              membuka di handphone
            </li>
            <li>
              Tekan tombol <b>Delete Account</b> di bawah avatar profile{" "}
            </li>
            <li>
              Ketika dialog konfirmasi muncul, pilih tombol <b>Yes</b> dan akun
              Anda serta log aktivitas di platform kami akan dihapus.
            </li>
          </ul>
        </p>

        <h4>Data yang Dihapus</h4>
        <span>
          Saat Anda menghapus akun, data pribadi berikut akan dihapus secara
          permanen:
        </span>
        <ul>
          <li>Nama</li>
          <li>Avatar</li>
          <li>Foto profil</li>
          <li>Log Aktivitas</li>
          <li>History Menonton</li>
        </ul>
        <p>
          Data ini akan dihapus sepenuhnya dari sistem kami dan tidak dapat
          dipulihkan.
        </p>
      </div>
    </MainLayout>
  );
};

export default RemoveAccount;
