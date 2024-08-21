import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import axios from 'axios'; // Assuming you're using axios for API calls
import "./TestTable.css";

const formData = {
  title: "Aplicativo de Divisão de Contas",
  beachHeadMarket: "Grupos de Amigos que Frequentam Restaurantes",
  mercadosAdjacentes: "Famílias, Colegas de Trabalho, Eventos Corporativos",
  linguagemResultados: "português",
  description: "Um aplicativo que ajuda grupos de amigos a dividir a conta de restaurantes de maneira justa e eficiente."
};

const token = "eyJhbGciOiJIUzI1NiIsImtpZCI6InRaYUV4eDQrb0JjVHZDZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3ZyZ2JmenN2YnBocHh5Y3Ftem1qLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4ODkyODhhOC00N2Q0LTRhNGQtYmZiMC0wZGQzNDQ0ZDIwZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzIxMTMzNDM2LCJpYXQiOjE3MjExMjk4MzYsImVtYWlsIjoiYnJlbm9yYW1vbjU1QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJicmVub3JhbW9uNTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6Ijg4OTI4OGE4LTQ3ZDQtNGE0ZC1iZmIwLTBkZDM0NDRkMjBmNiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzIxMTI5ODM2fV0sInNlc3Npb25faWQiOiI2ZTQxODg2NS01OTA2LTRkYjktODkxOS1mYjcxYmQwMDdhOGYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.K47pQ92SvWRiIK6bDki_psrChHa7z95X-_onU8JlRz8";

const TesteTable = () => {
  const [tableStruct, setTableStruct] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.post(`https://your-api-endpoint.com/passo/um`, formData, { headers, timeout: 60000 });
        console.log("resposta", response.data.response);
        const content = response.data.response || "resposta não encontrada";
        console.log("aqui o conteudo", content);
        setTableStruct(content);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ReactMarkdown remarkPlugins={[gfm]}>{tableStruct}</ReactMarkdown>
  );
};

export default TesteTable;
