// import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
// import styles from "./side.module.css";
// import { FaHome } from 'react-icons/fa';
// import { FaLightbulb } from 'react-icons/fa';
// import { FaRobot } from 'react-icons/fa';
// const Side = () => {
//   return (
//     <Navbar className={`${styles.side}`}  variant="dark">
//       <Navbar.Brand as={Link} className={`${styles.brand}`} style={{fontSize:"2rem"}} to="/">Menu</Navbar.Brand>
//       <Nav className={`${styles.nav}`} style={{display:"flex",flexDirection:"column"}} defaultActiveKey="/">
//         <Nav.Item className={`${styles.navItem}`}>
//           <FaHome style={{color:"#6c757d"}}/> <Nav.Link as={Link} to="component1" className={`${styles.navLink}`}>Inicio</Nav.Link>
//         </Nav.Item >
//       {/*  <Nav.Item  className={`${styles.navItem}`}>
//          <FaLightbulb style={{color:"#6c757d"}} /> <Nav.Link as={Link} to="component2">Nova Ideia</Nav.Link>
//         </Nav.Item>*/}
//         <Nav.Item className={`${styles.navItem}`}>
//          {/*<FaRobot style={{color:"#6c757d"}} /> <Nav.Link as={Link} to="assistente">Assistente</Nav.Link>*/}
//         </Nav.Item>
//       </Nav>
//     </Navbar>
//   )
// }

// export default Side;

// import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
// import styles from "./side.module.css";
// import { FaHome, FaLightbulb, FaRobot } from 'react-icons/fa';

// const Side = () => {
//   return (
//     <Navbar className={styles.side} variant="dark">
//       <h1>LucIA</h1>
      
//       <Nav className={styles.nav} defaultActiveKey="/">
//         <Nav.Item className={styles.navItem}>
//           <FaHome className={styles.navIcon} />
//           <Nav.Link as={Link} to="component1" className={styles.navLink}>Inicio</Nav.Link>
//         </Nav.Item>
//         {/* <Nav.Item className={styles.navItem}>
//           <FaLightbulb className={styles.navIcon} /> <Nav.Link as={Link} to="component2">Nova Ideia</Nav.Link>
//         </Nav.Item> */}
//         <Nav.Item className={styles.navItem}>
//           {/* <FaRobot className={styles.navIcon} /> <Nav.Link as={Link} to="assistente">Assistente</Nav.Link> */}
//         </Nav.Item>
//       </Nav>
//       <Navbar.Brand as={Link} className={`${styles.brand} ${styles.fontSizeLarge}`} to="/">Sair</Navbar.Brand>
//     </Navbar>
//   );
// }

// export default Side;

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from "./side.module.css";
import { FaHome, FaLightbulb, FaRobot } from 'react-icons/fa';

const Side = () => {
  return (
    <Navbar className={styles.side} variant="dark">
      <h1 style={{color:'white'}}>LucIA</h1>
      
      <Nav className={styles.nav} defaultActiveKey="/">
        <Nav.Item className={styles.navItem}>
          {/* <FaHome className={styles.navIcon} /> */}
          <i class="fa-solid fa-code-branch"></i>
          <Nav.Link as={Link} to="component1" className={styles.navLink}>Ideias</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item className={styles.navItem}>
          <FaLightbulb className={styles.navIcon} /> <Nav.Link as={Link} to="component2">Nova Ideia</Nav.Link>
        </Nav.Item> */}
        <Nav.Item className={styles.navItem}>
          {/* <FaRobot className={styles.navIcon} /> <Nav.Link as={Link} to="assistente">Assistente</Nav.Link> */}
        </Nav.Item>
      </Nav>
      <Navbar.Brand as={Link} className={`${styles.brand}`} to="/"><i class="fa-solid fa-right-from-bracket"></i> Sair</Navbar.Brand>
    </Navbar>
  );
}

export default Side;


