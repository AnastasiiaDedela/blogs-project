import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="container">
      <header>
        <h1 className="logo">Glossa</h1>
        <nav>
          <ul className="navigation-list">
            <li>home</li>
            <li>Sign in</li>
            <li>Sign up</li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
