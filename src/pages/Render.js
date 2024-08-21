import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import { passosEmpreendedor } from '../context/constant';
import { useStepList } from '../context/StepListContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "./TestTable.css";

const mapa = {
    '1': 'um',
    '2': 'dois',
    '3': 'tres',
    '4': 'quatro',
    '5': 'cinco',
    '6': 'seis',
    '7': 'sete',
    '8': 'oito',
    '9': 'nove',
    '10': 'dez',
    '11': 'onze',
    '12': 'doze',
    '13': 'treze',
    '14': 'quatorze',
    '15': 'quinze',
    '16': 'dezesseis',
    '17': 'dezessete',
    '18': 'dezoito',
    '19': 'dezenove',
    '20': 'vinte',
    '21': 'vinteum',
    '22': 'vintedois',
    '23': 'vintetres',
    '24': 'vintequatro',
};

const numeroParaPalavra = (numero) => mapa[numero] || 'numero_invalido';



const Render = () => {
    const { state } = useAuth();
    const {setRender,render} = useStepList();
    const token = state.token;
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [contentAPI, setContentAPI] = useState("");
    const { formData, passo, currentStep} = location.state || {};
    const [content, setContent] = useState("");

    setRender(true)

  

    useEffect(() => {
        if (passo && passo.titulo) {
            
            const numero = passo.titulo.split(' ')[1];
            const passoFormatado = numeroParaPalavra(numero);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const headers = {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    };
                    const response = await api.post(`passo/${passoFormatado}`, formData, { headers, timeout: 60000 });
                    console.log("resposta",response.data.response)
                    const content = response.data.response || "resposta não encontrada";
                    console.log("aqui o conteudo",content)
                    setContentAPI(content);
                } catch (error) {
                    console.error('Erro ao buscar dados da API:', error);
                    setContentAPI('Erro ao carregar dados.');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [passo, formData, token]);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleBack = () => {
        navigate("/step");
    };

    const handleNextStep = () => {
        if (currentStep < 23) {
            navigate('/render', { state: { formData, passo: passosEmpreendedor[currentStep + 1], currentStep: currentStep + 1 } });
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            navigate('/render', { state: { formData, passo: passosEmpreendedor[currentStep - 1], currentStep: currentStep - 1 } });
        }
    };

    const handleHome = () => {
        navigate("/home");
    };

    return (
       <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="voltar">
                <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <a onClick={handleHome} style={{ cursor: "pointer" }}>LucIA</a>
            </Typography>
        </Toolbar>
    </AppBar>
    <Container component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Box sx={{ mb: 4, width: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Bem-vindo ao Caminho do Empreendedor: Os 24 Passos de Bill Aulet
            </Typography>
            <Typography variant="body1">
            {passosEmpreendedor[currentStep].descricao}
            </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, width: '100%', bgcolor: '#f5f5f5', p: 4, borderRadius: 1, display: 'grid', gridTemplateRows: '1fr 1fr 1fr', alignItems: 'stretch', gap: 2 }}>
            {loading ? (
                <img src="https://tjpi-teams-apps-balcao-virtual.azurefd.net/images/typing.gif" alt="Carregando..." />
            ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {contentAPI}
                </ReactMarkdown>
            )}
        </Box>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="contained" onClick={handlePreviousStep} disabled={currentStep === 0}>
                Anterior
            </Button>
            <Button variant="contained" onClick={handleNextStep} disabled={currentStep === 23}>
                Próximo
            </Button>
        </Box>
    </Container>
</Box>

    );
};

export default Render;
