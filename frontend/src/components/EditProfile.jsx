import { useState, useContext, useEffect } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import  Validator  from "./Validator.jsx";

function EditProfile({formName, isOpen, onClose}) {
    const userContext = useContext(currentUserContext);
    const { currentUser, handleUpdateUser } = userContext;
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState("");
    const [errorDescriptionMessage, setErrorDescriptionMessage] = useState("");

    const [name, setName] = useState(currentUser?.name || "");
    const [description, setDescription] = useState(currentUser?.about || "");

    const handleNameChange = (event) => {
      const input = event.target;
      setName(input.value);
      setErrorNameMessage(input.validationMessage); 
    };
    
      const handleDescriptionChange = (event) => {
        const input = event.target;
        setDescription(input.value);
        setErrorDescriptionMessage(input.validationMessage); 
      };

      const handleSubmit = (event) => {
        event.preventDefault(); 
        setIsLoading(true);
        handleUpdateUser({ name, about: description }).finally(()=>setIsLoading(false));
      };

      useEffect(()=>{
         if(name?.length >= 2 && name?.length <= 40 && description?.length >= 2 && description?.length <= 200){
           setIsValid(true);
         }else{
          setIsValid(false);
         }
      }, [name, description]);

    return(
        <section className={`popup popup_type_${formName} ${isOpen ? "popup__opened" : ""}`}>
            <form
              className="popup__container"
              id={formName}
              onSubmit={handleSubmit}
              noValidate
            >
              <fieldset className="popup__container-fieldset">
                <legend className="popup__container-title">Editar Perfil</legend>

                <div className="input-group">
                <input
                  type="text"
                  className="popup__container-input"
                  id="name"
                  placeholder="Jacques Costeau"
                  minLength="2"
                  maxLength="40"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
                  {!isValid && <Validator message={errorNameMessage} />}
                </div>

                <div className="input-group">
                <input
                  type="text"
                  className="popup__container-input"
                  id="job"
                  placeholder="Explorador"
                  minLength="2"
                  maxLength="200"
                  required
                  value={description}
                  onChange={handleDescriptionChange}
                />
                 {!isValid && <Validator message={errorDescriptionMessage} />}
                </div>

              </fieldset>

              <button className={`popup__container-button ${isValid ? "" : "popup__container-button_inactive"}` } type="submit" disabled={!isValid}>
                {isLoading ? "Salvando..." : "Salvar"}
              </button>

             <button
               id="close-button"
               className="popup__container-close-button"
               type="button"
               onClick={onClose}
              >
               <img
                 src="./images/close-icon.png"
                 alt="close icon"
                 className="popup__container-close-button-icon"
                 id="image-close-button"
               />
             </button>
            </form>
        </section>
      );
}

export default EditProfile;