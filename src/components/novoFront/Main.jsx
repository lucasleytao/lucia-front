import React from 'react';
import Side from "./Side";
import { Route,Routes } from 'react-router-dom';
import styles from "./main.module.css";
import Content from './Content';
import Content2 from './Content2';
import Content3 from './Content3';
import Inicial from '../../pages/Inicial';
import { StepListProvider} from '../../context/StepListContext';

// * wildcar: 'caminho coringa' que captura todas as sub-rotas ou caminhos apos o prefixo

const Main = () => {
  return ( 
        
      <div className={`${styles.main}`}>
    <Side />
    <div className={`${styles.flexGrow}`} >
      <StepListProvider>
    <Routes>
    <Route path="assistente"  element={<Inicial />} />
    <Route path="component1"  element={<Content  />} />
    <Route path="component2/*"  element={<Content2 />} />
    <Route path="component3/*" element={<Content3  />} />
    </Routes>
    </StepListProvider>
    </div>
    </div> 
   
);
};

export default Main;
