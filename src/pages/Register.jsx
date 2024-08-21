import React from 'react'
import { useState } from 'react'
import api from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      first_name:""
    });
 
  
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match!");
      } else {
        toast.promise(
          api.post('register', {
            email:formData.email,
            password:formData.password,
            confirmPassword:formData.confirmPassword,
            first_name:formData.first_name
          }).then(response => {
            return response;
          }),
          {
            pending: 'Carregando...',
            success: 'Cadastro realizado com sucesso!',
            error: 'Falha ao realizar login!'
          }
        ).catch(err => {
          if (err.response && err.response.status === 401) {
          console.log(err)
          } else {
            toast.error('Erro no Servidor', {
              position: "top-center",
              autoClose: 2500
            });
          }
        }).finally(() => {});

        console.log("Form Data:", formData);
      }
    }
    return (
      <div className='register'>
        <div className='hero'>
          {/* <div className='logotipo'><img src="/XDZT.gif" alt="" /><h1>logo</h1></div> */}
          <form className='form-data' onSubmit={handleSubmit}>
            <div>
              <h1>Get Started in LucIA</h1>
              <p>a new way of entrepreneurship</p>
            </div>
            <label htmlFor="name" className='input-register'>Name <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required/></label>
            <label htmlFor="email" className='input-register'>Email <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
            <label htmlFor="password" className='input-register'>Password <input type="password" name="password" value={formData.password} onChange={handleChange} required /></label>
            <label htmlFor="confirmPassword" className='input-register'>Confirm Password <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /></label>
            <button type="submit">Enviar</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p>Already have an account <span className='linkhome'> <a href="" onClick={()=> navigate("/")}>Login Here</a></span> </p>
          </form>
        </div>
        <div className='formulario'>
        <div className='overlay'></div>
        </div>
      </div>
    );
  }
  
  export default Register;
