import React, { useEffect, useState } from 'react';
import PaginationComponent from './PaginationComponent';
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
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "./render.css";

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
  const [activeButton, setActiveButton] = useState('description'); // Novo estado para o botão ativo

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

  useEffect(() => {
    const tema = temas[currentStep.id - 1];
    setDescription(tema.description);
    setObjective(tema.objective);
    setExercise(tema.exercise);
    setInstructions(tema.instructions);
    handleButtonClick(tema.description);
  }, [currentStep, temas]);

  useEffect(() => {
    setRender(false);
  }, []);

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

  const handleButtonClick = (newText, buttonType) => {
    setActiveButton(buttonType); // Definir o botão ativo
    setOpen(false);
    setTimeout(() => {
      setText(newText);
      setOpen(true);
    }, 300);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleChange2 = (e, index, id, label) => {
    const { name, value } = e.target;
    setFormData2(prevState => ({ ...prevState, [name]: value }));
    setChangedResponses(prevState => {
      const newResponses = [...prevState];
      newResponses[index] = { ...newResponses[index], response: `${label}:${value}`, id };
      return newResponses;
    });
  };

  const getOldResponses = async () => {
    try {
      const response = await api.post('getOldResponses', { ideaId: ideia.id }, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      setResponses(response.data.respostas);
      setModalShow3(true);
    } catch (error) {
      console.error("Error fetching old responses", error.message);
    }
  };

  const updateResponses = async () => {
    try {
      setModalShow3(false);
      await api.put('updateResponse', { changedResponses }, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      setChangedResponses([]);
    } catch (error) {
      console.error("Error updating responses", error.message);
    }
  };

  useEffect(() => {
    console.log(changedResponses);
  }, [changedResponses]);

  const handleSubmitResponse = async () => {
    setLoading2(true);
    try {
      await api.post("userresponse", {
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
      <div>
        <NavLink to="/home/component2">
          <Button variant='outline-danger' size='lg' style={{ marginBottom: "1rem", marginLeft: "1rem" }}><i className="fa-solid fa-delete-left"></i> Voltar</Button>
        </NavLink>
        <h1>Passo {currentStep.id}: {currentStep.title}</h1>
        <p className={`${styles.paragrafo}`}>{currentStep.desc}</p>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <PaginationComponent />
        </div>
        {/* <button type="button" className="btn btn-warning btn-sm me-2" onClick={getOldResponses}><i class="fa-solid fa-list-check"></i> Respostas</button> */}
      </div>
      <div className={styles.container}>
        <h5>{ideia ? `${ideia.title}` : " "}</h5>

        <div style={{ display: "flex", gap: "2rem" }}>
          <ButtonGroup vertical>
            {[
              { key: 'description', label: 'Descrição' },
              { key: 'objective', label: 'Objetivo' },
              { key: 'instructions', label: 'Instruções' },
              { key: 'exercise', label: 'Atividade' }
            ].map((button) => (
              <button
                key={button.key}
                type="button"
                className={`btn ${activeButton === button.key ? 'btn-info' : 'btn-primary'}`} // Aplica a cor cinza quando o botão está ativo
                onClick={() => handleButtonClick(eval(button.key), button.key)}
              >
                {button.label}
              </button>
            ))}
          </ButtonGroup>

          <div>
            <Fade in={open}>
              <div style={{ width: "700px", fontSize: "1.3rem" }}>{text}</div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="p-3 d-flex justify-content-end btn-conf">
        <div>
          <button type="button" className="btn btn-danger me-3 btn-lg" onClick={helpMe} disabled={loading}><i class="fa-regular fa-message"></i>
            {loading ? <Spinner animation="border" /> : ' Me Ajude, Lucia'}
          </button>
          {/* <button type="button" className="btn btn-success me-3 btn-md" onClick={() => setModalShow2(true)}><i class="fa-regular fa-square-check"></i>
            {loading2 ? <Spinner animation="border" /> : " Atividade do Passo"}
          </button> */}

        </div>
      </div>

      <ModalFullScreen numeroParaPalavra={numeroParaPalavra} setContent={setContent} step={currentStep.id} showState={show} setShowState={setShow} content={content} />

      <MyVerticallyCenteredModal
        addIdeia={handleSubmitResponse}
        title="Responda a atividade do passo:"
        textButton="ENVIAR"
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Sua resposta...</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
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
                    onChange={(e) => handleChange2(e, index, item.id, label)}
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