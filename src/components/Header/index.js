import React from 'react';
import styles from './index.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.header__nav}>
      <div className={styles.header__heading}>
        Task
        <span className={styles.bold}>Dashboard</span>
      </div>
      {/* <div className={styles.header__separator} /> */}
    </nav>
  </header>
);


export default Header;
