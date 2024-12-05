// import React, { useState } from 'react';
// import { FaUser, FaLock } from "react-icons/fa";
// import api from '../services/api';
// import { useAuth } from '../context/useAuth';
// import { useNavigate } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';
// import { ToastContainer, toast } from 'react-toastify';
// import { Form } from 'react-bootstrap';
// import styles from "./Login.module.css";

// const Login = () => {
//   const { dispatch, state} = useAuth();
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   let navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setLoading(true);
  
//     toast.promise(
//       api.post('login', {
//         email: loginForm.email,
//         password: loginForm.password,
//       }).then(response => {
//         const { accessToken, refreshToken,first_name,progress} = response.data;
//         console.log(response.data)
//         if (accessToken && refreshToken) {
//           dispatch({
//             type: 'SET_TOKENS',
//             payload: { token: accessToken, refreshToken: refreshToken,first_name:first_name}
//           });
//           console.log("state",state)
//           navigate('/home/component1');
//         }
//         return response;
//       }),
//       {
//         pending: 'Carregando...',
//         success: 'Login realizado com sucesso!',
//         error: 'Falha ao realizar login!'
//       }
//     ).catch(err => {
//       if (err.response && err.response.status === 401) {
//         console.log(err);
//       } else {
//         console.log(err)
//         toast.error('Erro no Servidor', {
//           position: "top-center",
//           autoClose: 2500
//         });
//       }
//     }).finally(() => setLoading(false));
//   };

//   return (
//     <div className={`${styles.daddy}`}>
//       <div className={`${styles.container}`}>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <Form onSubmit={handleSubmit} className={`${styles.form}`}>
//             <img src="/sttppi.png" alt="" className={`${styles.imagem}`}/>
//             {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>E-mail</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder=""
//                 name="email"
//                 value={loginForm.email}
//                 onChange={handleChange}
//                 required
//               />
              
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Senha</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder=""
//                 name="password"
//                 value={loginForm.password}
//                 onChange={handleChange}
//                 required
//               />
             
              
//             </Form.Group>

//             <Form.Group controlId="formBasicCheckbox">
//               {/* <Form.Check type="checkbox" label="Manter conectado" /> */}
//             </Form.Group>

//             <button type="submit" className={`btn btn-primary ${styles.button}`}>
//               Credencial
//             </button>

//             {/* <div className={styles.registerLink}>
//               <p>Não tem uma conta? <a href="#" onClick={() => navigate("/register")}>Registre-se</a></p>
//             </div> */}
//           </Form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import styles from "./Login.module.css";

const Login = () => {
  const { dispatch, state } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    toast.promise(
      api.post('login', {
        email: loginForm.email,
        password: loginForm.password,
      }).then(response => {
        const { accessToken, refreshToken, first_name } = response.data;
        if (accessToken && refreshToken) {
          dispatch({
            type: 'SET_TOKENS',
            payload: { token: accessToken, refreshToken, first_name }
          });
          navigate('/home/component1');
        }
        return response;
      }),
      {
        pending: 'Carregando...',
        success: 'Login realizado com sucesso!',
        error: 'Falha ao realizar login!'
      }
    ).catch(err => {
      if (err.response && err.response.status === 401) {
        setErrorMessage("Credenciais inválidas.");
      } else {
        toast.error('Erro no servidor.');
      }
    }).finally(() => setLoading(false));
  };

  return (
    <div className={`${styles.daddy}`}>
      <header className={styles.header}>
        <h1>Bem-vindo à LucIA! Sua plataforma de IA para empreender_</h1>
      </header>

      <div className={`${styles.container}`}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Form onSubmit={handleSubmit} className={`${styles.form}`}>
            <img src="/sttppi.png" alt="Logo" className={`${styles.logo}`} />
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-mail do anfitrião"
                name="email"
                value={loginForm.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="password"
                placeholder="Código do anfitrião"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <button 
            type="submit" 
            className={`btn btn-primary ${styles.button}`}
            style={{ marginTop: '20px', marginBottom: '10px', padding: '10px' }}>
              Acessar
            </button>
          </Form>
        )}
      </div>

      <footer className={styles.footer}>
        <p>© 2024 Lucas Leitão. Todos os direitos reservados.</p>
      </footer>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;