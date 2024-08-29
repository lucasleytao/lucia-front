// import React, { useEffect, useState } from 'react';
// import styles from "./steps.module.css";
// import { useAuth } from '../../context/useAuth';
// import { Route, Routes } from 'react-router-dom';
// import GridCards from './GridCards';
// import Render from './Render';
// import { useStepList } from '../../context/StepListContext';
// import api from '../../services/api';
// import { Progress } from 'antd';
// const Content2 = () => {
//   const { dispatch, state } = useAuth();
//   const { temas, currentStep, setCurrentStep, ideia, progress, setProgress, render } = useStepList();
//   const { token } = state;
//   const [loading, setLoading] = useState(false);
//   const [renderState, setRenderState] = useState(render);

//   useEffect(() => {
//     console.log(currentStep, ideia);
//   }, [currentStep]);
 
//   useEffect(() => {
//     setRenderState(render);
//   }, [render]);

//   function arredondar(progress,casa){
//     const percent = ((progress + 1) / 24) * 100;
//     const factor = Math.pow(10,casa)
//     return Math.round(percent*factor)/factor
    
    
//     }

//   const checkStep = async (ideiaId) => {
//     try {
//       setLoading(true);
//       const response = await api.post(`checkstep/${ideiaId}`, {}, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       setProgress(response.data.data[0].step);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     console.log("esse são os dados que tenho", currentStep, ideia);
//     checkStep(ideia.id);
//   }, [ideia]);

//   const temasFormated = temas.reduce((acc, current) => {
//     const x = acc.find(item => item.tema === current.tema);
//     if (!x) {
//       return acc.concat([{ tema: current.tema, color: current.color }]);
//     } else {
//       return acc;
//     }
//   }, []);

//   const [selectedCards, setSelectedCards] = useState([1]);
//   const [name, setName] = useState(state ? state.first_name : 'Usuário Desconhecido');

//   const toggleCardSelection = (id) => {
//     setSelectedCards([id]);
//     const selectedTema = temas.find(tema => tema.id === id);
//     setCurrentStep(selectedTema);
//   };

//   return (
//     <div style={{ height: "50vh" }}>
//       <div>
//         <div>
//           <h3>Muito bem, {name}!</h3>
//           <h1>Sua ideia é: {`${ideia.title}`}</h1>
//           {/* <h1>Passo {currentStep.id}: {currentStep.title}</h1> */}
//           {/* <p className={`${styles.paragrafo}`}>{currentStep.desc}</p> */}
//         </div><br />
//         <div>
//           <h5>24 passos do Empreendedor Disciplinado</h5>
//           <div style={{ display: "flex", gap: "1rem", alignContent: "center" }}>
//             {renderState ? 
//               temasFormated.map((item,index) => (
//                 <div key={item.tema} className={`${styles.temas}`} style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: ".5rem", padding: "1rem" }}>
//                   <p>{item.tema}</p>
//                   <div className={`bg-${item.color}`} style={{ height: "20px", width: "40px" }}></div>
//               {console.log(`${index}`,item.color)}
//                 </div>
              
//               ))
//               :  
//               <Progress percent={arredondar(progress,0)} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
//             }
//           </div>
//         </div>
//       </div>
//       <Routes>
//         <Route path='/' element={<GridCards temas={temas} loading={loading} selectedCards={selectedCards} toggleCardSelection={toggleCardSelection} />} />
//         <Route path='/render' element={<Render />} />
//       </Routes>
//     </div>
//   );
// }

// export default Content2;

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GridCards from './GridCards';
import Render from './Render';
import { useStepList } from '../../context/StepListContext';
import api from '../../services/api';
import { Progress } from 'antd';
import styles from "./steps.module.css";
import { useAuth } from '../../context/useAuth';

const Content2 = () => {
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
      <div>
        <div>
          {/* <h3>Muito bem, {name}!</h3> */}
          <h1>Sua ideia é: {`${ideia.title}`}</h1>
        </div>
        <br />
        <div>
          <h5><i class="fa-brands fa-space-awesome"> </i> Vamos aos 24 passos do Empreendedor Disciplinado</h5><br />
          <div style={{ display: "flex", gap: "1rem", alignContent: "center" }}>
            {renderState ? 
              temasFormated.map((item, index) => (
                <div key={item.tema} className={`${styles.temas}`} style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: ".5rem", padding: "1rem" }}>
                  <p>{item.tema}</p>
                  <div className={`bg-${item.color}`} style={{ height: "20px", width: "40px" }}></div>
                </div>
              ))
              :  
              <Progress percent={arredondar(progress, 0)} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
            }
          </div><br />
        </div>
      </div>
      <Routes>
        <Route path='/' element={<GridCards temas={temas} loading={loading} selectedCards={[currentStep.id]} toggleCardSelection={toggleCardSelection} />} />
        <Route path='/render' element={<Render />} />
      </Routes>
    </div>
  );
};

export default Content2;