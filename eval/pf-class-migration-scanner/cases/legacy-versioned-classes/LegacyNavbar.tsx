import React from 'react';

interface NavbarProps {
  items: { label: string; href: string; isActive?: boolean }[];
  onLogout: () => void;
}

export const LegacyNavbar: React.FC<NavbarProps> = ({ items, onLogout }) => (
  <div className="pf-c-page">
    <nav className="pf-v5-c-nav" aria-label="Main navigation">
      <ul className="pf-v5-c-nav__list">
        {items.map((item) => (
          <li
            key={item.href}
            className={`pf-v5-c-nav__item ${item.isActive ? 'pf-v5-c-nav__item--current' : ''}`}
          >
            <a href={item.href} className="pf-v5-c-nav__link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <div className="pf-u-mt-md pf-u-text-align-right">
      <button
        className="pf-v5-c-button pf-m-secondary"
        onClick={onLogout}
        type="button"
      >
        Log out
      </button>
    </div>
  </div>
);
