import React, { useRef,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '../../context/useAuth';
import './ModalFullScreen.css';
import { Refresh } from '@mui/icons-material';
import api from '../../services/api';
import { useStepList } from '../../context/StepListContext';
import Spinner from 'react-bootstrap/Spinner';
function ModalFullScreen({ setContent,showState, setShowState, content, step,numeroParaPalavra}) {
  const targetRef = useRef();
  const [hover, setHover] = useState(false);
  const { state } = useAuth();
  const { token } = state;
  const [loading,setLoading] = useState(false)
  const { temas, currentStep, ideia, progress, setProgress, nextStep, setRender } = useStepList();
  const handleDownload = async () => {
    const input = targetRef.current;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // Largura da imagem em mm (A4: 210mm x 297mm)
    const pageHeight = 295; // Altura da página em mm (A4: 210mm x 297mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`exercicio-passo${step}.pdf`);
  };
  const helpMe = async () => {
    setLoading(true);
    try {
      const response = await api.post(`passo/${numeroParaPalavra[currentStep.id]}`, {
        idIdea: ideia.id,
        passoAtual: currentStep.id,
        title: ideia.title,
        forceOpenAI:true,
        description: ideia.description
      }, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      setContent(response.data.response);
    } catch (error) {
      console.error('Erro ao consultar a API:', error.message);
    } finally {
      setLoading(false);
      
    }
  };
  return (
    <Modal show={showState} fullscreen={true} onHide={() => setShowState(false)}>
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '4rem', width: '100vw' }}>
          <span style={{color:"#83adb5"}}>LucIAf</span>
          <Refresh
          onClick={helpMe}
      style={{ color: hover ? '#ff0000' : '#83adb5',cursor: hover ? "pointer": "auto" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
          <Button variant="success" onClick={handleDownload}>Download PDF</Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={targetRef} className="container">
       
      {loading ? <span style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}> <Spinner animation="border" /></span>  :  (<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>)}
    
          <div style={{ height: '20px' }} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalFullScreen;
