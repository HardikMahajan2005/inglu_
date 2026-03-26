import React, { useState, useEffect } from 'react';
import { Layers, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <div className="navbar-brand">
          <div style={{
            background: 'var(--accent-gradient)',
            padding: '0.4rem',
            borderRadius: '0.5rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={24} />
          </div>
          <span>INGLU<span style={{ color: 'var(--text-tertiary)', fontWeight: '400' }}> HQ</span></span>
        </div>
        
        <div className="flex-center gap-3">
          <span className="badge badge-inglu" style={{ display: 'none' }}>Placement Assignment</span>
          <button 
            onClick={toggleTheme} 
            className="btn-icon" 
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a 
            href="https://ingluglobal.com" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary"
            style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline-flex' } }}
          >
            INGLU Portal
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
