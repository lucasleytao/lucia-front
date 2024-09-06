import React, { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useStepList } from '../../context/StepListContext';

const PaginationComponent = () => {
  const { temas, currentStep, setCurrentStep, nextStep, previousStep,progress } = useStepList();

  const handleSetCurrentStep = (step) => {
    setCurrentStep(temas[step - 1]);
  };

  useEffect(()=>{
    console.log("progresso mudou")
  },[progress])

  return (
    <Pagination>

      {temas.map((tema, index) => (
        <Pagination.Item
          key={tema.id}
          disabled={index>progress}
          active={tema.id === currentStep.id}
          onClick={() => handleSetCurrentStep(tema.id)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

    </Pagination>
  );
};

export default PaginationComponent;
