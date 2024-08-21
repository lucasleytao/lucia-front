import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, List,Button, ListItem, ListItemText, Box, Modal, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, PlayArrow, Add, HelpOutline as HelpOutlineIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import { useAuth } from '../context/useAuth';
import api from '../services/api';
import "./Ideas.css";
import { useFormData } from '../context/FormDataContext';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '400px',
    overflowY: 'scroll'
};

const IdeasPage = () => {
    console.log("esse é o orm",useFormData)
    const { state } = useAuth();
    const token = state.token;
    const [ideas, setIdeas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const titleInputRef = useRef(null);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchIdeas();
        }
    }, [token, navigate]);

    const fetchIdeas = async () => {
        try {
            const response = await api.get('/ideas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIdeas(response.data);
        } catch (error) {
            console.error('Erro ao buscar ideias:', error);
        }
    };

    const handleAddIdea = async () => {
        if (formData.title) {
            try {
                const response = await api.post('/ideas', { title: formData.title, description: formData.description }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIdeas([...ideas, response.data]);
                fetchIdeas();
                setFormData({
                    title: '',
                    description: ''
                });
                titleInputRef.current.focus();
            } catch (error) {
                console.error('Erro ao adicionar ideia:', error);
            }
        }
    };

    const handleChange = (event, key) => {
        setFormData({ ...formData, [key]: event.target.value });
    };

    const handleOpenModal = (idea, index) => {
        setEditIndex(index);
        setFormData(cloneDeep({ title: idea.title, description: idea.description }));
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditIndex(null);
        setFormData({
            title: '',
            description: ''
        });
    };

    const handleEditIdea = async () => {
        if (editIndex !== null) {
            try {
                const response = await api.put(`/ideas`, { title: formData.title, description: formData.description, id_idea: ideas[editIndex].id }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const updatedIdeas = ideas.map((idea, index) => index === editIndex ? response.data : idea);
                setIdeas(updatedIdeas);
                handleCloseModal();
                fetchIdeas();
            } catch (error) {
                console.error('Erro ao editar ideia:', error);
            }
        }
    };

    const handleDeleteIdea = async (id) => {
        try {
            await api.delete(`/ideas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { idIdea: id }
            });
            fetchIdeas();
        } catch (error) {
            console.error('Erro ao deletar ideia:', error);
        }
    };

    const handleAccessTimeClick = (index) => {
        navigate('/step', { state: { idea: ideas[index] } });
    };

    const handleNavigateToAssistant = () => {
        navigate('/assistente');
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}   >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">LucIA</Typography>
                </Toolbar>
            </AppBar>
            <Container  component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, overflow: 'auto', pt: '10px' }}>
                <TextField
                    label="Digite sua ideia aqui"
                    variant="outlined"
                    value={formData.title}
                    onChange={(e) => handleChange(e, 'title')}
                    inputRef={titleInputRef}
                    autoFocus
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Descrição"
                    variant="outlined"
                    value={formData.description}
                    onChange={(e) => handleChange(e, 'description')}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <IconButton
                    size='large'
                    onClick={handleAddIdea}
                    edge="end"
                    aria-label="add"
                    sx={{
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 255, 0, 0.6)',
                        },
                        transition: 'background-color 0.3s ease',
                        width: '64px',
                        height: '64px',
                    }}
                >
                    <Add sx={{ color: 'inherit' }} />
                </IconButton>
                <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto' }}>
                    {ideas.map((idea, index) => (
                        <ListItem key={index} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {idea && <ListItemText primary={idea.title} />}
                            <Box>
                                <IconButton onClick={() => handleAccessTimeClick(index,idea)} edge="end" aria-label="access-time" sx={{
                                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 255, 0, 0.6)',
                                    },
                                    transition: 'background-color 0.3s ease',
                                    mr: '1px'
                                }}>
                                    <PlayArrow sx={{ color: 'inherit' }} />
                                </IconButton>
                                <IconButton onClick={() => handleOpenModal(idea, index)} edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteIdea(idea.id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="outlined"
                    startIcon={<HelpOutlineIcon />}
                    onClick={handleNavigateToAssistant}
                    sx={{ m: 3, position: 'fixed', bottom: 20, left: 0, right: 0, mx: 'auto' }}
                >
                    Ainda não tem uma ideia? Assistente
                </Button>
            </Container>
            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Editar Ideia</Typography>
                    <TextField
                        fullWidth
                        label="Titulo"
                        variant="outlined"
                        value={formData.title}
                        onChange={(e) => handleChange(e, 'title')}
                        sx={{ mt: 2, mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        variant="outlined"
                        value={formData.description}
                        onChange={(e) => handleChange(e, 'description')}
                        sx={{ mt: 2, mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleEditIdea}>Salvar Alterações</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default IdeasPage;
