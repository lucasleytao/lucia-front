import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../../services/api';
import { useAuth } from '../../context/useAuth';
import Form from 'react-bootstrap/Form';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import { LucideDelete,EditIcon,PlayCircle } from 'lucide-react';
import {styles} from "./table.module.css";
import { useStepList } from '../../context/StepListContext';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Tooltip } from 'antd';

const IdeiasTable = ({ ideias, fetchIdeias }) => {
  const navigate = useNavigate();
  const {temas,currentStep,setCurrentStep,ideia,setIdeia}= useStepList()
  const { state } = useAuth();
  const { token } = state;
  console.log(token)
  const [formData, setFormData] = useState({ id: "", title: "", description: "" });
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleDeleteIdea = async (id) => {
    try {
      await api.delete(`/ideas`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { idIdea: id }
      });
      fetchIdeias();
    } catch (error) {
      console.error('Erro ao deletar ideia:', error);
    }
  };

  const handleEditIdea = (id, title, description) => {
    setFormData({ id, title, description });
    setModalShow(true);
  };

  const handlePlayIdea = (id, title, description) => {
    setIdeia({ id, title, description });
    navigate("/home/component2")
  };

  const handleSaveChanges = async () => {
    try {
      console.log("dentro do edit", token, formData.id, formData.title, formData.description);
      const response = await api.put(
        `/ideas`,
        { id_idea: formData.id, title: formData.title, description: formData.description },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchIdeias();
      setModalShow(false);
    } catch (error) {
      console.error('Erro ao atualizar ideia:', error);
    }
  };

  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Config</th>
          </tr>
        </thead>
        <tbody>
          {ideias.map((ideia, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ideia.title}</td>
              <td className="text-muted">{truncateText(ideia.description,50) }</td>
              <td style={{display:"flex",gap:"1rem",minHeight:"50px"}}>
                <Button  icon={<LucideDelete />} onClick={() => handleDeleteIdea(ideia.id)}>Deletar</Button>
                <Button icon={<EditIcon/>} onClick={() => handleEditIdea(ideia.id, ideia.title, ideia.description)}>Editar</Button>
                <Button icon={<PlayCircle/>} onClick={() => handlePlayIdea(ideia.id, ideia.title, ideia.description)}>Continuar</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <MyVerticallyCenteredModal addIdeia={handleSaveChanges} textButton="SALVAR IDEIA" show={modalShow} onHide={() => setModalShow(false)}>
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
    </>
  );
};

export default IdeiasTable;
