import { useState } from "react";
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function Login({ 
  handleLogin, 
  isRegistrationPopupOpen,
  isLoginPopupOpen, 
  closePopup,
}) {

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
      handleLogin(data);
    };

    return (
      <div className="page">

         <form className='auth-form' onSubmit={handleSubmit}>
            <legend className='auth-form__title'>Entrar</legend>

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

            <button className='auth-form__button' type="submit">Entrar</button>

            <span className='auth-form__register-link'>Ainda não é membro? Inscreva-se <Link to='/signup' className='link'>aqui!</Link></span>
         </form>

         <InfoTooltip 
           message={"Ops, Algo deu errado! Por favor, tente novamente"} 
           icon={"../images/error-sign.png"}
           isOpen={isLoginPopupOpen}
           onClose={closePopup}
         />

         <InfoTooltip 
           message={"Vitória! Você precisa se registrar."} 
           icon={"../images/success.png"}
           isOpen={isRegistrationPopupOpen}
           onClose={closePopup}
           />
      </div>
    );
}

export default Login;