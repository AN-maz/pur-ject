import { getPosts } from '../api/endPoint.js';

export function HomePage() {

  loadData();

  return /* html */ `
    <section class="home-container" style="padding: 2rem;">
      <h1>Data Dari Backend</h1>
      <p>Menguji koneksi ke server...</p>
      
      <div id="posts-list" style="margin-top: 20px; display: grid; gap: 15px;">
        <div class="loading">Sedang memuat data...</div>
      </div>
    </section>
  `;
}

async function loadData() {
  try {

    const posts = await getPosts();

    setTimeout(() => {
      const container = document.getElementById("posts-list");


      if (container) {
        container.innerHTML = "";

        posts.forEach((post) => {
          const card = `
            <div class="card" style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; background: white;">
              <h3 style="color: var(--primary-color); margin-bottom: 5px;">${post.title}</h3>
              <p>${post.body}</p>
              <small style="color: grey;">ID: ${post.id}</small>
            </div>
          `;
          container.innerHTML += card;
        });
      }
    }, 100); 
  } catch (error) {
    console.error("Gagal ambil data:", error);
    const container = document.getElementById("posts-list");
    if (container) {
      container.innerHTML = `<p style="color: red;">Gagal mengambil data dari server. Pastikan backend nyala!</p>`;
    }
  }
}
