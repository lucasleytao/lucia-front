import React, { useState } from 'react';
import { Typography, Container, Box, TextField, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [renderedMarkdown, setRenderedMarkdown] = useState('');

  const handleMarkdownChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const handleRenderMarkdown = () => {
    // Substitui cada \n por \n\n para garantir quebras de linha no Markdown
    const formattedText = markdownText.replace(/\n/g, '\n\n');
    setRenderedMarkdown(formattedText);
  };

  return (
    <Container component="main" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Editor de Markdown
      </Typography>
      <Box sx={{ my: 2 }}>
        <TextField
          fullWidth
          label="Digite seu Markdown"
          variant="outlined"
          value={markdownText}
          onChange={handleMarkdownChange}
          multiline
          rows={4}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={handleRenderMarkdown}
        >
          Renderizar Markdown
        </Button>
      </Box>
      <Box sx={{ mt: 4, bgcolor: 'background.paper', p: 3, border: '1px solid #ccc' }}>
        <ReactMarkdown>
          {renderedMarkdown}
        </ReactMarkdown>
      </Box>
    </Container>
  );
};

export default MarkdownEditor;
