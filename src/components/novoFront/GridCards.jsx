import React, { useEffect } from 'react';
import Card from './Card/Card';
import styles from "./disable.module.css";
import { useStepList } from '../../context/StepListContext';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Progress } from 'antd';

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};
const GridCards = ({ temas, selectedCards, toggleCardSelection, loading, }) => {

  const { progress, render, setRender } = useStepList();


  useEffect(() => { setRender(true) }, [])

  function arredondar(progress, casa) {
    const percent = ((progress + 1) / 24) * 100;
    const factor = Math.pow(10, casa)
    return Math.round(percent * factor) / factor


  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }} className={`${styles.container}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink to="render">
            <Button variant='primary' size='lg' style={{ marginBottom: "1rem" }}><i className="fa-solid fa-arrow-right"></i> Continuar</Button>
          </NavLink>
          <NavLink to="/home/component1">
          <Button variant='outline-danger' size='lg' style={{ marginBottom: "1rem", marginLeft: "1rem" }}><i class="fa-solid fa-delete-left"></i> Voltar</Button>
          </NavLink>
        </div>
        {/* <Progress type="circle" strokeColor={twoColors} percent={arredondar(progress, 0)} size={80} style={{ marginRight: "1rem" }} className={`${styles.progress}`} /> */}
      </div>

      <div style={{ display: "flex", gap: "1rem", maxWidth: "100vw", flexWrap: "wrap", maxHeight: "700px", overflowY: "scroll" }}>

        {temas.map((tema, index) => (
          <Card
            loading={loading}
            functionOnclick={index <= progress ? () => toggleCardSelection(tema.id) : null}
            key={tema.id}
            bg={selectedCards.includes(tema.id) ? `${tema.color}` : 'light'}
            color={selectedCards.includes(tema.id) ? 'light' : `${tema.color}`}
            header={`Passo ${index + 1}`}
            title={tema.title}
            isDisabled={index > progress}


            className={index > progress ? `${styles.disabled}` : ''}
            text={index > progress ? 'muted' : ''}

          >

            {tema.desc}

          </Card>
        ))}
      </div>
    </>
  );
}

export default GridCards;
