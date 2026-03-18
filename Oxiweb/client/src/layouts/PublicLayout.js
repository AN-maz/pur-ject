// client/src/layouts/PublicLayout.js
import { Navbar } from '../components/Navbar.js';
// import { Footer } from '../components/Footer.js'; // (Aktifkan kalau sudah punya Footer)

export function PublicLayout(content) {
  return `
    <div class="layout-wrapper">
      ${Navbar()}
      
      <main class="main-content">
        ${content}
      </main>
      
      </div>
  `;
}