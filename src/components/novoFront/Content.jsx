import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import styles from "./content1.module.css";
import IdeiasTable from "./Table";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';
import Form from 'react-bootstrap/Form';
import { useStepList } from '../../context/StepListContext';
import Spinner from 'react-bootstrap/Spinner';
const Content = () => {
  const { state } = useAuth();
  console.log("state: ",state)
  const {temas,currentStep,setCurrentStep,ideia,setIdeia}= useStepList()
  const [ideiasList, setIdeiasList] = useState([]);
  const [name, setName] = useState(state ? state.first_name : 'Usuário Desconhecido');
  const [formData, setFormData] = useState({ title: "", description: "" });
  const token = state ? state.token : '';
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const addIdea = async () => {
    try {
      await api.post('/ideas', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchIdeas();
      setFormData({ title: "", description: "" });
      setModalShow(false);
    } catch (error) {
      console.error('Erro ao adicionar ideia:', error);
    }
  };

  const fetchIdeas = async () => {
    try {
      setLoading(true)
      const response = await api.get('/ideas', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(false)
      setIdeiasList(response.data);
    } catch (error) {
      console.error('Erro ao buscar ideias:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchIdeas();
    }
  }, [token]);

  

  return (
    <div className={styles.flexGrow}>
      <div>
        <h3>Olá, {name}</h3>
        <p className={`${styles.paragrafo}`}>Você tem uma ideia?</p>
        <p className={`${styles.paragrafo}`}>Me conta a ideia que você tem que eu te guio pelos 24 passos.</p>
        <MyVerticallyCenteredModal title="Quero saber mais sobre sua ideia..." textButton="ADICIONAR IDEIA" addIdeia={addIdea} show={modalShow} onHide={() => setModalShow(false)} >
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

      {/*<div className={`${styles.container} ${styles.assistentItem}`}>
        <h5  className={`text-secondary text-xs font-weight-normal ${styles.tituloMedio}` }>Não tem ideia?</h5>
        <p className={`text-secondary ${styles.paragrafo}`}>Vamos conversar para que possamos achar algo que faça sentido para você em conjunto.</p>
        <NavLink to="/home/assistente">
          <Button className={styles.button} variant='primary'>Assistente</Button>
        </NavLink>
      </div>*/}

      <div className={styles.container}>
        <div style={{display:"flex",placeContent:"space-between"}}>
        <h5 className="text-secondary text-xs font-weight-normal">Sua Biblioteca de Idéias</h5>
        <Button variant='primary' onClick={() => setModalShow(true)}>Vamos lá</Button>
        </div>
        {loading? <span style={{display:"flex",alignItems:"center",justifyContent:"center",height:"150px"}}><Spinner animation="border" /></span> :<IdeiasTable ideias={ideiasList}  fetchIdeias={fetchIdeas} className={styles.Table} />}
    
      </div>
    </div>
  );
};

export default Content;
