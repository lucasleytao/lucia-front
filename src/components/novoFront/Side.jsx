// Sidebar

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from "./side.module.css";

const Side = () => {
  return (
    <Navbar className={styles.side} variant="dark">
      <h1 style={{ color: 'white' }}>LucIA</h1>

      <Nav className={styles.nav} defaultActiveKey="/">
        <Nav.Item className={styles.navItem}>
          <i class="fa-solid fa-code-branch"></i>
          <Nav.Link as={Link} to="component1" style={{ color: '#fff' }} className={styles.navLink}>Ideias</Nav.Link>
        </Nav.Item>
        <Nav.Item className={styles.navItem}>
        </Nav.Item>
      </Nav>

      <Navbar.Brand as={Link} className={`${styles.brand}`} to="/"><i class="fa-solid fa-right-from-bracket"></i> Sair</Navbar.Brand>
      
    </Navbar>
  );
}

export default Side;


