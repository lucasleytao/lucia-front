import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import Card2 from './Card2';
import CardGrid from './CardGrid';

const steps = [
  { title: "Passo 1: Identificação do Problema" },
  { title: "Passo 2: Pesquisa Preliminar" },
  { title: "Passo 3: Formulação da Hipótese" },
  { title: "Passo 4: Planejamento Experimental" },
  { title: "Passo 5: Coleta de Dados" },
  { title: "Passo 6: Análise dos Dados" },
  { title: "Passo 7: Interpretação dos Resultados" },
  { title: "Passo 8: Documentação e Relatório" },
  { title: "Passo 9: Revisão Crítica" },
  { title: "Passo 10: Publicação dos Resultados" },
  { title: "Passo 11: Replicação do Estudo" },
  { title: "Passo 12: Aplicação Prática dos Resultados" },
  { title: "Passo 13: Reavaliação da Hipótese" },
  { title: "Passo 14: Ajustes no Método Experimental" },
  { title: "Passo 15: Segunda Coleta de Dados" },
  { title: "Passo 16: Segunda Análise dos Dados" },
  { title: "Passo 17: Novas Interpretações" },
  { title: "Passo 18: Novos Documentos e Relatórios" },
  { title: "Passo 19: Crítica e Feedback Adicional" },
  { title: "Passo 20: Ajustes Finais" },
  { title: "Passo 21: Terceira Publicação" },
  { title: "Passo 22: Marketing e Divulgação" },
  { title: "Passo 23: Implementação Comercial" },
  { title: "Passo 24: Avaliação de Impacto e ROI" }

]


const ChooseStep = () => {
  return (
    <>
    <div className="App bg-[#EFF5F5] borda-bottom">
      <div className="container">
        <div className='flex justify-between'>
          <a href="/"><LeftOutlined /> Ideias</a>
          <Image width={50} src="https://nwaypro.com/wp-content/uploads/2021/02/dummy-logo-2b.png" />
        </div>
      </div>
    

    </div>

<div className='container pt-20'>
<CardGrid className=" px-6">
  {steps.map((value, i) => (
    <Card2 key={i}>
      <h2>{value.title}</h2>
    </Card2>
  ))}
</CardGrid>
</div>
</>
  );
}

export default ChooseStep;
