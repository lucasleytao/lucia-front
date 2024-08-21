import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardActionArea, CardContent, Box, Modal, Button, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useAuth } from '../context/useAuth';
import { passosEmpreendedor } from '../context/constant';

const languageOptions = [
  { code: 'en', name: 'Inglês' },
  { code: 'es', name: 'Espanhol' },
  { code: 'zh', name: 'Chinês' },
  { code: 'hi', name: 'Hindi' },
  { code: 'pt', name: 'Português' }
];

const formFields = [
  { label: "Título", stateKey: "title" },
  { label: "Descrição", stateKey: "description" },
  { label: "Mercados Adjacentes", stateKey: "mercadosAdjacentes" },
  { label: "BeachHead Market", stateKey: "beachHeadMarket" },
  { label: "Perfil de Usuário", stateKey: "resumoPerfilUsuario" },
  { label: "Persona", stateKey: "persona" },
  { label: "Prioridades da sua Persona", stateKey: "prioridadesPersona" },
  { label: "Produto", stateKey: "produto" },
  { label: "Proposta de Valor", stateKey: "propostaValor" },
  { label: "Clientes", stateKey: "clientes" },
  { label: "Linguagem de saída dos resultados", stateKey: "idioma" }
];

const StepPage = () => {
  const { state } = useAuth();
  const token = state.token;
  console.log("Token:", token); // Log para verificar o token
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [idIdea, setIdIdea] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.idea) {
      console.log("Idea from location:", location.state.idea); // Log para verificar os dados da localização
      setFormData(location.state.idea);
      setIdIdea(location.state.idea.id)
    }
  }, [location]);

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login..."); // Log para verificar redirecionamento
      navigate("/");
    } else if (location.state && location.state.idea) {
      setFormData(location.state.idea);
      console.log("setei no form data:",formData); 

    }
  }, [token, navigate, location]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e, key) => {
    console.log(`Changing ${key} to ${e.target.value}`); // Log para verificar mudanças no formData
    setFormData({ ...formData, [key]: e.target.value,idIdea });
  };

  const handleSaveChanges = () => {
    console.log('Ideia salva:', formData);
    handleCloseModal();
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCardClick = (passo, index) => {
    console.log("Card clicked:", passo, index); // Log para verificar clique no card
    setCurrentStep(index);
    console.log("formulario mandado",formData)
    navigate('/render', { state: { formData, passo, currentStep: index } });
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
    <Container component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom style={{ color: '#000' }}>
        LucIA
      </Typography>
      <Button variant="contained" style={{ marginBottom: "24px" }} color="primary" onClick={handleOpenModal}>
        Editar Ideia
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {passosEmpreendedor.map((passo, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Card sx={{ bgcolor: index >= 9 && index <= 23 ? '#bdbdbd' : '#2196f3', height: '100%' }}>
              <CardActionArea
                disabled={index >= 9 && index <= 23}
                onClick={() => { if (!(index >= 9 && index <= 23)) handleCardClick(passo, index); }}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="h6" component="h2" sx={{ color: index >= 9 && index <= 23 ? '#757575' : '#FFF', textAlign: 'center' }}>
                    {passo.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                    {passo.descricao}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle} style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Editar Ideia
          </Typography>
          {formFields.map((field) => {
            if (field.stateKey === 'idioma') {
              return (
                <FormControl fullWidth sx={{ mt: 2, mb: 2 }} key={field.stateKey}>
                  <InputLabel id="idioma-label">Linguagem de saída dos resultados</InputLabel>
                  <Select
                    labelId="idioma-label"
                    id="idioma"
                    label="Linguagem de saída dos resultados"
                    value={formData[field.stateKey] || ''}
                    onChange={(e) => handleChange(e, field.stateKey)}
                  >
                    {languageOptions.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else {
              return (
                <TextField
                  key={field.stateKey}
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  value={formData[field.stateKey] || ''}
                  onChange={(e) => handleChange(e, field.stateKey)}
                  sx={{ mt: 2, mb: 2 }}
                />
              );
            }
          })}
          <Button variant="contained" onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
        </Box>
      </Modal>
    </Container>
  </Box>
  );
};

export default StepPage;
