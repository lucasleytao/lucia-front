import React, { useState, useEffect, useRef} from 'react';
import {
  AppBar, Toolbar, Typography, TextField, Button, List, ListItem, CssBaseline, Box, Container, CircularProgress, IconButton
} from '@mui/material';
import { Send as SendIcon, ArrowBack } from '@mui/icons-material';
import api from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import styles from "./assistant.module.css";
import { Avatar } from 'antd';
const Inicial = () => {
  const [inputValue, setInputValue] = useState('');
  const { state } = useAuth();
  const token = state.token;
  console.log("esse é o token: ",token)
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: 'Olá, sou seu assistente de ideias! Estou aqui para ajudar você, empreendedor, a explorar novas ideias e oportunidades de negócio. Como posso ajudá-lo hoje?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const endOfMessagesRef = useRef(null);

  const formatarResposta = (texto) => {
    return texto
        .replace(/\*\*(.*?)\*\*/g, '<Typography variant="body1">$1</Typography>')  
        .replace(/\. /g, '<br><br>'); 
};

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = { role: 'user', content: inputValue };
      setChatHistory(currentHistory => [...currentHistory, newMessage]);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (chatHistory.length > 1 && chatHistory.slice(-1)[0].role === 'user') {
      const fetchData = async () => {
        setIsTyping(true);
        const userMessages = chatHistory.filter(msg => msg.role === 'user');
        const response = await api.post('getResponse', { chatHistory: userMessages }, {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          timeout: 20000});
        const { content } = response.data.response.choices[0].message;
        setIsTyping(false);

        const formatedContent = formatarResposta(content)
        console.log("res",formatedContent)
        setChatHistory(currentHistory => [...currentHistory, { role: 'system', content }]);
      };
      fetchData();
    }
    scrollToBottom();
  }, [chatHistory]);

  return (
    <Box sx={{ display: 'flex',flexDirection: 'column', marginBottom:"0px", height: '80%' }}>
      <CssBaseline />
     
      
        <Container maxWidth="sm" sx={{ height: 'calc(100% - 64px)', display: 'flex', flexDirection: 'column' }}>
        
      
          <List sx={{ overflow: 'auto', flexGrow: 1 }}>
          <div className={`${styles.header}`}>
            <div className={styles.container}>
        <Avatar size="large" src="/profile.png"/>
        <h3 style={{color:"#FFF"}}>Lucia</h3>
        <p style={{color:"#FFF"}}> vamos conversar e desenvolver uma idéia inovadora </p>
        </div>
      </div>
            {chatHistory.map((message, index) => (
              <ListItem key={index}  sx={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <Typography
                  sx={{
                    p: 1,
                    bgcolor: message.role === 'user' ? '#DCF8C6' : '#FFFFFF',
                    borderRadius: 2,
                    maxWidth: '75%',
                    wordWrap: 'break-word',
                  }}
                >
                  {message.content}
                </Typography>
              </ListItem>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                <CircularProgress size={20} />
                <Typography sx={{ ml: 1 }}>Digitando...</Typography>
              </Box>
            )}
            <div ref={endOfMessagesRef} />
          </List>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Digite uma mensagem"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
              sx={{ mr: 1 }}
            />
            <Button variant="contained" onClick={handleSend} startIcon={<SendIcon />}>
              Enviar
            </Button>
          </Box>
        </Container>
     
    </Box>
  );
};

export default Inicial;
