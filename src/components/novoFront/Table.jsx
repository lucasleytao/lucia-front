// // grid de ideias

// import React, { useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import api from '../../services/api';
// import { useAuth } from '../../context/useAuth';
// import Form from 'react-bootstrap/Form';
// import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
// import { useStepList } from '../../context/StepListContext';
// import { useNavigate } from 'react-router-dom';
// import SweetAlert from "react-bootstrap-sweetalert";

// const IdeiasTable = ({ ideias, fetchIdeias }) => {
//   const navigate = useNavigate();
//   const { setIdeia } = useStepList();
//   const { state } = useAuth();
//   const { token } = state;
//   const [formData, setFormData] = useState({ id: "", title: "", description: "" });
//   const [modalShow, setModalShow] = useState(false);
//   const [confirm, setConfirm] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleDeleteIdea = async (id) => {
//     try {
//       await api.delete(`/ideas`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         data: { idIdea: id }
//       });
//       fetchIdeias();
//     } catch (error) {
//       console.error('Erro ao deletar ideia:', error);
//     }
//   };

//   const handleEditIdea = (id, title, description) => {
//     setFormData({ id, title, description });
//     setModalShow(true);
//   };

//   const handlePlayIdea = (id, title, description) => {
//     setIdeia({ id, title, description });
//     navigate("/home/component2");
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await api.put(
//         `/ideas`,
//         { id_idea: formData.id, title: formData.title, description: formData.description },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       fetchIdeias();
//       setModalShow(false);
//     } catch (error) {
//       console.error('Erro ao atualizar ideia:', error);
//     }
//   };

//   return (
//     <>
//       <Table striped bordered hover variant="light">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Ideia</th>
//             <th>Descrição detalhada</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ideias.map((ideia, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{ideia.title}</td>
//               <td className="text-muted">{truncateText(ideia.description, 50)}</td>
//               <td>
//                 <div>
//                   <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => handlePlayIdea(ideia.id, ideia.title, ideia.description)}><i class="fa-solid fa-arrow-right"></i> Continuar</button>
//                   <button type="button" className="btn btn-outline-success btn-sm me-2" onClick={() => handleEditIdea(ideia.id, ideia.title, ideia.description)}><i class="fa-solid fa-pen"></i> Editar</button>
//                   <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteIdea(ideia.id)}><i class="fa-solid fa-trash-can"></i> Excluir</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <MyVerticallyCenteredModal addIdeia={handleSaveChanges} textButton="SALVAR IDEIA" show={modalShow} onHide={() => setModalShow(false)}>
//         <Form>
//           <Form.Group className="mb-3" controlId="formGroupTitle">
//             <Form.Label>Título da Ideia</Form.Label>
//             <Form.Control
//               type="text"
//               name="title"
//               onChange={handleChange}
//               value={formData.title}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="formGroupDescription">
//             <Form.Label>Descrição da Ideia</Form.Label>
//             <Form.Control
//               type="text"
//               name="description"
//               onChange={handleChange}
//               value={formData.description}
//             />
//           </Form.Group>
//         </Form>
//       </MyVerticallyCenteredModal>
//     </>
//   );
// };

// export default IdeiasTable;

import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../../services/api';
import { useAuth } from '../../context/useAuth';
import Form from 'react-bootstrap/Form';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import { useStepList } from '../../context/StepListContext';
import { useNavigate } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert";

const IdeiasTable = ({ ideias, fetchIdeias }) => {
  const navigate = useNavigate();
  const { setIdeia } = useStepList();
  const { state } = useAuth();
  const { token } = state;
  const [formData, setFormData] = useState({ id: "", title: "", description: "" });
  const [modalShow, setModalShow] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [confirmarId, setConfirmarId] = useState('');

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

  const confirmDeleteIdea = (id) => {
    setConfirmarId(id);
    setConfirmar(true);
  };

  const handleDeleteIdea = async () => {
    try {
      await api.delete(`/ideas`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { idIdea: confirmarId }
      });
      fetchIdeias();
      setConfirmar(false);
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
    navigate("/home/component2");
  };

  const handleSaveChanges = async () => {
    try {
      await api.put(
        `/ideas`,
        { id_idea: formData.id, title: formData.title, description: formData.description },
        {
          headers: {
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
            <th>Ideia</th>
            <th>Descrição detalhada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ideias.map((ideia, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ideia.title}</td>
              <td className="text-muted">{truncateText(ideia.description, 50)}</td>
              <td>
                <div>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm me-2" 
                    onClick={() => handlePlayIdea(ideia.id, ideia.title, ideia.description)}
                  >
                    <i className="fa-solid fa-arrow-right"></i> Continuar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-success btn-sm me-2" 
                    onClick={() => handleEditIdea(ideia.id, ideia.title, ideia.description)}
                  >
                    <i className="fa-solid fa-pen"></i> Editar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm" 
                    onClick={() => confirmDeleteIdea(ideia.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i> Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SweetAlert
        warning
        showCancel
        confirmBtnText="Sim, excluir!"
        confirmBtnBsStyle="danger"
        cancelBtnText="Cancelar"
        cancelBtnBsStyle="light"
        title="Confirme sua ação"
        onConfirm={handleDeleteIdea}
        onCancel={() => setConfirmar(false)}
        show={confirmar}
      >
        Deseja realmente excluir esta ideia?
      </SweetAlert>

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