import React from 'react';
import CardGen from './CardGen';

const ideias = [
    { titulo: "Healthy App", descricao: "For healthy people looking to maintain a balanced diet.", data: "20/09/2001" },
    { titulo: "Travel Planner", descricao: "An app to help users plan their trips with suggestions for sightseeing and accommodations.", data: "15/03/2022" },    
  ];
  

const Corpo = () => {
  return (
    <div>
        <div className=' mt-3 flex flex-col gap-4'>
      {ideias.map(value => (
        <CardGen 
          key={value.titulo} // Adicionando uma chave única para cada componente
          titulo={value.titulo} 
          descricao={value.descricao}
        />
      ))}
      </div>
    </div>
  );
}

export default Corpo;
