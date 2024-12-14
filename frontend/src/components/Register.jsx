import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegistration }) {
   const [data, setData] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      handleRegistration(data);
    }; 

    return (
      <div className="page">
         <form className='auth-form' onSubmit={handleSubmit}>
            <legend className='auth-form__title'>Inscreva-se</legend>

            <input 
              type='email' 
              name='email'
              placeholder='E-mail' 
              className='auth-form__input'
              value={data.email}
              onChange={handleChange}
            />

            <input 
              type='password' 
              name='password'
              placeholder='Senha' 
              className='auth-form__input'
              value={data.password}
              onChange={handleChange}
            />

            <button className='auth-form__button' type='submit'>Inscrever-se</button>

            <span className='auth-form__register-link'>Já é um membro? Faça o login <Link to='/signin' className='link'>aqui</Link></span>
         </form>

      </div>
    );
}

export default Register;