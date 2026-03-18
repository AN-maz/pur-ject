// client/src/components/Navbar.js
export function Navbar() {
  return /* html */ `
    <nav class="navbar">
        <div class="logo">OXIGEN</div>
        <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
        </ul>
        <div class="auth">
            <button class="btn btn-primary">Login</button>
        </div>
    </nav>
  `;
}
