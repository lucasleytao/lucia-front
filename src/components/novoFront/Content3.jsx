import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GridCards from './GridCards';
import Render from './Render';
import { useStepList } from '../../context/StepListContext';
import api from '../../services/api';
import { Progress } from 'antd';
import styles from "./steps.module.css";
import { useAuth } from '../../context/useAuth';

const Content3 = () => {
  const { dispatch, state } = useAuth();
  const { temas, currentStep, setCurrentStep, ideia, progress, setProgress, render } = useStepList();
  const { token } = state;
  const [loading, setLoading] = useState(false);
  const [renderState, setRenderState] = useState(render);
  const [name, setName] = useState(state ? state.first_name : 'Usuário Desconhecido');

  // Atualiza o estado de renderização quando o valor muda
  useEffect(() => {
    setRenderState(render);
  }, [render]);

  // Atualiza o progresso do passo e outras informações de estado
  useEffect(() => {
    checkStep(ideia.id);
  }, [ideia]);

  // Checa o passo atual da ideia
  const checkStep = async (ideiaId) => {
    try {
      setLoading(true);
      const response = await api.post(`checkstep/${ideiaId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
      });
      setProgress(response.data.data[0].step);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Formata os temas para exibição
  const temasFormated = temas.reduce((acc, current) => {
    const exists = acc.find(item => item.tema === current.tema);
    if (!exists) {
      return acc.concat([{ tema: current.tema, color: current.color }]);
    } else {
      return acc;
    }
  }, []);

  // Manipula a seleção de cartões
  const toggleCardSelection = (id) => {
    const selectedTema = temas.find(tema => tema.id === id);
    setCurrentStep(selectedTema);
  };

  // Calcula o progresso arredondado
  function arredondar(progress, casa) {
    const percent = ((progress + 1) / 24) * 100;
    const factor = Math.pow(10, casa);
    return Math.round(percent * factor) / factor;
  }

  return (
    <div style={{ height: "50vh" }}>
      <Routes>
        <Route path='/render' element={<Render />} />
      </Routes>
    </div>
  );
};

export default Content3;