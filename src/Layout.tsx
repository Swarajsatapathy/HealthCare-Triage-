
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Stethoscope, LayoutDashboard, UserPlus, ClipboardList, Settings } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Stethoscope color="var(--primary)" size={28} />
          <span>SwasthyaFlow</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/intake" className={`nav-item ${location.pathname === '/intake' ? 'active' : ''}`}>
            <UserPlus size={20} />
            <span>Patient Intake Demo</span>
          </Link>
          <Link to="/review/PAT-1042" className={`nav-item ${location.pathname.includes('/review') ? 'active' : ''}`}>
            <ClipboardList size={20} />
            <span>Case Review</span>
          </Link>
          
          <div style={{ marginTop: 'auto' }}>
            <div className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </div>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="font-semibold text-muted">Multimodal Healthcare Triage Assistant</div>
          <div className="flex items-center gap-4">
            <div className="badge badge-warning" style={{ fontSize: '0.65rem' }}>
              PROTOTYPE
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              Dr
            </div>
          </div>
        </header>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
