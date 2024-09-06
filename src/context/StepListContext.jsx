// contexto de cada passo

import React, { createContext, useContext, useState } from 'react';
const StepListContext = createContext();

export const useStepList = () => useContext(StepListContext);

export const StepListProvider = ({ children }) => {
    const temas = [
    { id: 1, title: "Segmentação de Mercado", color: "primary", tema: "Mercado", desc: "Identifique uma lista de mercados em que sua ideia é possível", description:"Vamos iniciar nossa jornada de refinamento da ideia. No Passo 1, iremos pensar em todas as possibilidades de aplicação da sua ideia, pensando em diferentes possíveis usuários finais para que possamos definir uma boa tática de pesquisa.", objective:"Criar uma lista de possíveis mercados candidatos e uma metodologia para investigar eles.", instructions:"Utilize a resposta do gerador para fazer sua própria lista. Adicione mercados que você já sabe que possam fazer sentido à lista gerada.Retire aqueles que você já identifique que não faça nenhum sentido. Faça a pesquisa primária, converse com gente de verdade.", exercise:"Como atividade para este passo, indique os 5 principais mercados que você acredita que façam sentido para sua ideia." },
    { id: 2, title: "Mercado Inicial", color: "primary", tema: "Mercado", desc: "Defina qual que vai ser seu mercado inicial estratégico para dar partida a sua jornada", description:"Agora iremos focar nossas energias em apenas um local para que possamos ser mais estratégicos.Então, a partir da lista de mercados definida anteriormente, iremos avaliar qual faz mais sentido com relação a sua ideia.", objective:"Investigar a lista de mercados candidatos e definir qual o melhor mercado para iniciarmos", instructions:"A partir da lista de mercados entregue no passo anterior, entenda o argumento da minha resposta e pondere se você concorda ou não. Faça suas adaptações no detalhamento do mercado.", exercise:"Indique qual o seu Mercado Inicial de forma detalhada"  },
    { id: 3, title: "Perfil do Usuário Final", color: "secondary", tema: "Cliente", desc: "Entenda quem será seu usuário mais a fundo e encontre suas características" ,description:"Hora de usar o resultado da sua Pesquisa Primária de mercado. Me conte quais são os principais achados da sua pesquisa de mercado, quem é seu cliente? Quais as principais características dele?", objective:"Achar características marcantes, relevantes e comuns entre seus possíveis usuários", instructions:"Utilize sua pesquisa primária e a esquematize em uma tabela. Me conte quais são as principais características, eu te darei algumas dicas de possíveis características para você investigar, e também vou te ajudar como investigar. Pesquise com gente de verdade.", exercise:"Indique os principais achados do perfil do seu usuário." },
    { id: 4, title: "Tamanho do Mercado Inicial", color: "primary", tema: "Mercado", desc: "Estime qual o tamanho da oportunidade que você tem na mesa.",description:"Neste passo iremos definir o tamanho de mercado endereçável do seu Mercado Inicial para avaliarmos o valor que este mercado possui para a sua ideia", objective:"Definir qual o tamanho do bolo que está em cima da mesa", instructions:"Revise a minha resposta Verifique o método de cálculo e fontes para você refazer e chegar em alguma correção de valor", exercise:"Qual o total de clientes endereçáveis do seu mercado inicial e o seu TAM estimado?"  },
    { id: 5, title: "Desenho de Persona", color: "secondary", tema: "Cliente", desc: "Visualize quem é o seu possível cliente a partir das informações coletadas até o momento",description:"Vamos transformar agora seu cliente em uma pessoa real, para que possamos enxergar de forma mais concisa quem é nosso usuário.",objective:"Identificar de forma clara quem é o cliente que eu tenho que atrair",instructions:"Relembre o Perfil do seu Usuário. Materialize este perfil em uma pessoa, utilize minha resposta para ter estas dicas. Utilize tanto minha estrutura quanto minhas dicas de como possa ser esta pessoa, mas lembre-se, baseie-se na sua pesquisa primária.",exercise:"Me conta então quem você imagina que deva ser sua persona."  },
    { id: 6, title: "Ciclo de Vida do Cliente", color: "success", tema: "Produto", desc: "Entenda o contexto completo de como seu cliente se comporta e como seu produto irá encaixar em sua vida" ,description:"Agora que sabemos quem é o nosso cliente, vamos observar e esquematizar como ele se comporta e como iremos nos inserir em sua história para conseguirmos gerar valor.",objective:"Identificar de forma clara quem é o cliente que eu tenho que atrair",instructions:"Observe o ciclo desenhado agora para que você possa se inspirar e ter uma noção inicial de como possa ser este ciclo.Porém, é necessária você ver na prática como que seu cliente irá fazer, visite ele para entender seu dia a dia.",exercise:"Defina o ciclo de vida do seu cliente e como que você irá se encaixar nele." },
    { id: 7, title: "Especificação Alto Nível do Produto", color: "success", tema: "Produto", desc: "Crie uma representação visual do seu produto para que fique claro o que você fará",description:"Descobrimos qual o mercado que iremos entrar, o cliente que iremos atender e qual dor iremos resolver, agora devemos pensar em qual produto que vai gerar a solução para este problema.",objective:"Criar uma representação visual do seu produto",instructions:"Obtenha ideias de possíveis funcionalidades para seu produto.Complete esta ideia a sua maneira, após isto, teste com possíveis clientes que se encaixem com sua persona",exercise:"Descreva seu produto com as funcionalidades que você imagina."  },
    { id: 8, title: "Quantificação da Proposta de Valor", color: "success", tema: "Produto", desc: "Quantifique o benefício total que seu produto gerará de valor ao seu cliente",description:"Este produto que você definiu parece ser interessante, mas devemos avaliar se ele realmente gera valor para o cliente. A melhor maneira que temos de fazer isto é quantificando a proposta de valor!",objective:"Calcular quanto valem as principais dores do seus clientes",instructions:"Relembre quais são as principais dores do seu cliente A partir disto, estime quanto que ele vai ganhar, ou deixar de perder, caso compre seu produto.",exercise:"Quais problemas do cliente você resolve e quanto você gera de valor?"  },
    { id: 9, title: "10 Próximos Clientes", color: "secondary", tema: "Cliente", desc: "Entenda quem serão seus próximos clientes depois da sua persona",description:"Não iremos parar apenas na nossa persona, identificaremos os próximos 10 clientes que tem potencial para serem nossos usuários, que serão nossos próximos alvos.",objective:"Identificar possíveis pontos perdidos com clientes que possuem outras visões",instructions:"Defina uma lista 10 possíveis clientes. Utilize minhas dicas para montar sua lista. Após isto, defina um roteiro de pesquisa com estas personas para preencher uma avaliação dos próximos clientes.",exercise:"Me conte quem são seus 10 próximos clientes e me detalhe os 3 próximos."  },
    { id: 10, title: "Especificações do Produto", color: "success", tema: "Produto", desc: "Defina as especificações claras e detalhadas do seu produto ou serviço.",description:"",objective:"",instructions:"",exercise:""  },
    { id: 11, title: "Prova de Conceito", color: "success", tema: "Produto", desc: "Valide sua ideia inicial por meio de uma prova de conceito." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 12, title: "Plano de Desenvolvimento Tecnológico", color: "success", tema: "Produto", desc: "Planeje todas as etapas do desenvolvimento tecnológico do seu produto.",description:"",objective:"",instructions:"",exercise:""  },
    { id: 13, title: "Estratégia de Go-to-Market", color: "warning", tema: "Venda", desc: "Defina uma estratégia de entrada no mercado para seu produto ou serviço." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 14, title: "Plano de Vendas", color: "warning", tema: "Venda", desc: "Estruture um plano de vendas eficiente e alinhado com seus objetivos de mercado." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 15, title: "Processo de Vendas", color: "warning", tema: "Venda", desc: "Desenvolva e documente um processo de vendas claro e repetível." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 16, title: "Estratégia de Preço", color: "warning", tema: "Venda", desc: "Defina uma estratégia de preço competitiva para maximizar receitas e margens." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 17, title: "Modelo de Receita", color: "dark", tema: "Finanças", desc: "Descreva como sua empresa irá gerar receita e quais são suas fontes principais.",description:"",objective:"",instructions:"",exercise:""  },
    { id: 18, title: "Cálculo do Tamanho do Mercado", color: "dark", tema: "Finanças", desc: "Calcule o tamanho do mercado total disponível para seus produtos ou serviços." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 19, title: "Cálculo de Custos", color: "dark", tema: "Finanças", desc: "Identifique e calcule todos os custos associados ao desenvolvimento e operação.",description:"",objective:"",instructions:"",exercise:""  },
    { id: 20, title: "Margem Bruta", color: "dark", tema: "Finanças", desc: "Calcule a margem bruta para avaliar a lucratividade do seu produto ou serviço.",description:"",objective:"",instructions:"",exercise:""  },
    { id: 21, title: "Break-even", color: "dark", tema: "Finanças", desc: "Determine o ponto de equilíbrio em que suas receitas cobrem seus custos totais." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 22, title: "Plano de Validação", color: "danger", tema: "Testes", desc: "Desenvolva um plano para validar as principais hipóteses do seu negócio." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 23, title: "Medição de Métricas Chave", color: "danger", tema: "Testes", desc: "Identifique e acompanhe as métricas chave para medir o sucesso do seu negócio." ,description:"",objective:"",instructions:"",exercise:"" },
    { id: 24, title: "Análise de Resultados e Iteração", color: "danger", tema: "Testes", desc: "Analise os resultados e itere continuamente para melhorar seu produto ou serviço." ,description:"",objective:"",instructions:"",exercise:"" }
];

    const [progress,setProgress] = useState(null)
    const [render,setRender] = useState()

    const [ideia,setIdeia]= useState({
        ideia:"",
        descricao:""
    })
    const [currentStep, setCurrentStep] = useState(temas[0]);

    const nextStep = () => {
        const index = temas.findIndex(tema => tema.id === currentStep.id);
        if (index < temas.length - 1) {
            setCurrentStep(temas[index + 1]);
        }
    };

    const previousStep = () => {
        const index = temas.findIndex(tema => tema.id === currentStep.id);
        if (index > 0) {
            setCurrentStep(temas[index - 1]);
        }
    };

    return (
        <StepListContext.Provider value={{ temas, currentStep, nextStep, previousStep,setCurrentStep,ideia,setIdeia,progress,setProgress,render,setRender }}>
            {children}
        </StepListContext.Provider>
    );
};