import { useState, useEffect, useContext } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import  Validator  from "./Validator.jsx";

function NewCard({formName, isOpen, onClose, onAddPlaceSubmit}) {

    const { currentUser } = useContext(currentUserContext);
  
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorCardTitleMessage, setErrorCardTitleMessage] = useState("");
    const [errorImageLinkMessage, setErrorImageLinkMessage] = useState("");

    const [cardTitle, setCardTitle] = useState("");
    const [imageLink, setImageLink] = useState("");

    function validateURL(url) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + 
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
        "((\\d{1,3}\\.){3}\\d{1,3}))" + 
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
        "(\\?[;&a-z\\d%_.~+=-]*)?" + 
        "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return pattern.test(url);
    }

      const handleCardTitleChange = (event) => {
       const input = event.target;
       setCardTitle(input.value);
       setErrorCardTitleMessage(input.validationMessage); 
      };
    
      const handleImageLinkChange = (event) => {
        const input = event.target;
        setImageLink(input.value);

        const isUrlValid = validateURL(input.value);
        setErrorImageLinkMessage(input.validationMessage);

        if (!isUrlValid) {
          setErrorImageLinkMessage("Por favor, insira um link de imagem válido.");
        } else {
          setErrorImageLinkMessage("");
        }

        setIsValid(isUrlValid && input !== "");
      };

      const handleSubmit = (event) => {
        event.preventDefault(); 
    
        setIsLoading(true);
        onAddPlaceSubmit({name:cardTitle, link:imageLink, owner:currentUser.data._id}).finally(()=>setIsLoading(false));

      };

      useEffect(() => {
        const isTitleValid = cardTitle.length >= 2 && cardTitle.length <= 30;
        const isImageValid = validateURL(imageLink);
        
        setIsValid(isTitleValid && isImageValid);
      }, [cardTitle, imageLink]);

    return(
        <section className={`popup popup_type_${formName} ${isOpen ? "popup__opened" : ""}`}>
            <form
              className="popup__container"
              id={formName}
              onSubmit={handleSubmit}
            >
              <fieldset className="popup__container-fieldset">
                <legend className="popup__container-title">Novo Local</legend>

                <div className="input-group">
                <input
                  type="text"
                  className="popup__container-input"
                  id="title"
                  placeholder="Titulo"
                  minLength="2"
                  maxLength="30"
                  value={cardTitle}
                  onChange={handleCardTitleChange}
                  required
                />
                {!isValid && <Validator message={errorCardTitleMessage} />}
                </div>

                <div className="input-group">
                <input
                type="url"
                className="popup__container-input"
                id="image-link"
                placeholder="Link de imagem"
                value={imageLink}
                onChange={handleImageLinkChange}
                required
                />
                {!isValid && <Validator message={errorImageLinkMessage} />}
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

export default NewCard;