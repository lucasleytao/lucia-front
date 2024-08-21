import React, { useEffect, useState } from 'react';
import PaginationComponent from './PaginationComponent';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Fade from 'react-bootstrap/Fade';
import styles from "./render.module.css";
import { useStepList } from '../../context/StepListContext';
import ModalFullScreen from './ModalFullScreen';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';
import Spinner from 'react-bootstrap/Spinner';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import Form from 'react-bootstrap/Form';

const numeroParaPalavra = {
  1: "um", 2: "dois", 3: "tres", 4: "quatro", 5: "cinco",
  6: "seis", 7: "sete", 8: "oito", 9: "nove", 10: "dez",
  11: "onze", 12: "doze", 13: "treze", 14: "quatorze", 15: "quinze",
  16: "dezesseis", 17: "dezessete", 18: "dezoito", 19: "dezenove",
  20: "vinte", 21: "vinteeum", 22: "vinteedois", 23: "vinteetres", 24: "vinteequatro"
};

const Render = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(true);
  const { temas, currentStep, ideia, progress, setProgress, nextStep, setRender } = useStepList();
  const [show, setShow] = useState(false);
  const { state } = useAuth();
  const { token } = state;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [description, setDescription] = useState(null);
  const [objective, setObjective] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [formData2, setFormData2] = useState({ conclusao: "" });
  const [modalShow3, setModalShow3] = useState(false);
  const [responses, setResponses] = useState([]);
  const [changedResponses, setChangedResponses] = useState([]);
  // Fetch progress for a given step
  const checkStep = async (ideiaId) => {
    try {
      const response = await api.post(`checkstep/${ideiaId}`, {}, {
        headers: { 'Content-Type': 'application/json' }
      });
      setProgress(response.data.data[0].step);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Set initial step details when component mounts
  useEffect(() => {
    const tema = temas[currentStep.id - 1];
    setDescription(tema.description);
    setObjective(tema.objective);
    setExercise(tema.exercise);
    setInstructions(tema.instructions);
    handleButtonClick(tema.description);
  }, [currentStep, temas]);

  // Set render to false initially
  useEffect(() => { setRender(false); }, []);

  // Handle API call for help
  const helpMe = async () => {
    setLoading(true);
    try {
      const response = await api.post(`passo/${numeroParaPalavra[currentStep.id]}`, {
        idIdea: ideia.id,
        passoAtual: currentStep.id,
        title: ideia.title,
        description: ideia.description
      }, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      setContent(response.data.response);
    } catch (error) {
      console.error('Erro ao consultar a API:', error.message);
    } finally {
      setLoading(false);
      setShow(true);
    }
  };

  // Handle button clicks to change text with fade effect
  const handleButtonClick = (newText) => {
    setOpen(false);
    setTimeout(() => {
      setText(newText);
      setOpen(true);
    }, 300);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleChange2 = (e, index,id,label) => {
    const { name, value } = e.target;
    setFormData2(prevState => ({ ...prevState, [name]: value }));
    setChangedResponses(prevState => {
      const newResponses = [...prevState];
      newResponses[index] = { ...newResponses[index], response: `${label}:${value}`,id };
      return newResponses;
    });
  };


  const getOldResponses = async () => {
    try {
      const response = await api.post('getOldResponses', { ideaId: ideia.id }, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      setResponses(response.data.respostas);
      console.log("array de respostsas",responses)
      setModalShow3(true);
    } catch (error) {
      console.error("Error fetching old responses", error.message);
    }
  };

  const updateResponses = async () => {
    try {

      setModalShow3(false); 
      const response = await api.put('updateResponse', {changedResponses}, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      setChangedResponses([]);
    } catch (error) {
      console.error("Error fetching update responses", error.message);
    }finally{

    }
  }

  useEffect(()=>{
    console.log(changedResponses)
  },[changedResponses])

  // Submit user response
  const handleSubmitResponse = async () => {
    setLoading2(true);
    try {
      const response = await api.post("userresponse", {
        ideaId: ideia.id,
        step: currentStep.id,
        response: `${currentStep.title}:${formData2.conclusao}`
      }, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      checkStep(ideia.id);
      setModalShow2(false);
      nextStep();
      setFormData2({ conclusao: "" });
      
    } catch (error) {
      console.error('Erro ao enviar resposta:', error.message);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PaginationComponent />
      </div>
      <div className={styles.container}>
        <h5>{ideia ? `${ideia.title} ${ideia.description}` : " "}</h5>
        <div style={{ display: "flex", gap: "2rem" }}>
          <ButtonGroup vertical>
            <Button onClick={() => handleButtonClick(description)}>Descrição</Button>
            <Button onClick={() => handleButtonClick(objective)}>Objetivo</Button>
            <Button onClick={() => handleButtonClick(instructions)}>Instruções</Button>
            <Button onClick={() => handleButtonClick(exercise)}>Atividade</Button>
          </ButtonGroup>
          <div>
            <Fade in={open}>
              <div style={{ width: "700px",fontSize:"1.3rem" }}>{text}</div>
            </Fade>
          </div>
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        <h5>Me Ajuda Lucia</h5>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Button variant='info' size='lg' onClick={helpMe} disabled={loading}>
            {loading ? <Spinner animation="border" /> : 'Me Ajuda'}
          </Button>
          <Button size='lg' variant='success' onClick={() => setModalShow2(true)}>
            {loading2 ? <Spinner animation="border" /> : "Concluir!"}
          </Button>
          <Button size='lg' variant='warning' onClick={getOldResponses}>Editar Ideia</Button>
        </div>
      </div>
      <ModalFullScreen numeroParaPalavra={numeroParaPalavra} setContent={setContent} step={currentStep.id} showState={show} setShowState={setShow} content={content} />

      <MyVerticallyCenteredModal
        addIdeia={handleSubmitResponse}
        title="Digite o que você concluiu sobre o passo..."
        textButton="ENVIAR"
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Sua Conclusão...</Form.Label>
            <Form.Control
              type="text"
              name="conclusao"
              onChange={handleChange2}
              value={formData2.conclusao}
            />
          </Form.Group>
        </Form>
      </MyVerticallyCenteredModal>

      <MyVerticallyCenteredModal
        addIdeia={updateResponses}
        title="Suas Respostas Até Agora"
        textButton="Editar"
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formGroupTitle">
            {responses.map((item, index) => {
              const [label, value] = item.response.split(":");
              return (
                <div key={index} className={`${styles.inputs}`}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                  className={`${styles.muted}`}
                    type="text"
                    name={`conclusao-${index}`}
                    onChange={(e) => handleChange2(e, index,item.id,label)}
                    value={formData2[`conclusao-${index}`] !== undefined ? formData2[`conclusao-${index}`] : value}

                  />
                </div>
              );
            })}
          </Form.Group>
        </Form>
      </MyVerticallyCenteredModal>

      <MyVerticallyCenteredModal
        title="Quero saber mais sobre sua ideia..."
        textButton="ADICIONAR IDEIA"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Título da Ideia</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label>Descrição da Ideia</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </Form.Group>
        </Form>
      </MyVerticallyCenteredModal>
    </div>
  );
};

export default Render;
