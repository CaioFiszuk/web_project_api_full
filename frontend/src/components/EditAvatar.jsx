import { useRef, useContext, useState } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import Validator from "./Validator.jsx";

function EditAvatar({ formName, isOpen, onClose }) {
  const userContext = useContext(currentUserContext);
  const { handleUpdateAvatar } = userContext;
  const avatarRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAvatarMessage, setErrorAvatarMessage] = useState("");

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

  function handleInputChange() {
    const input = avatarRef.current.value;
    const isUrlValid = validateURL(input);

    if (!isUrlValid) {
      setErrorAvatarMessage("Por favor, insira um link de imagem válido.");
    } else {
      setErrorAvatarMessage("");
    }

    setIsValid(isUrlValid && input !== "");
  }

  function submitAvatar(e) {
    e.preventDefault();
    setIsLoading(true);
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    }).finally(() => setIsLoading(false));
  }

  return (
    <section
      className={`popup popup_type_${formName} ${isOpen ? "popup__opened" : ""}`}
    >
      <form
        className="popup__container popup__container-small"
        id={formName}
        onSubmit={submitAvatar}
      >
        <fieldset className="popup__container-fieldset">
          <legend className="popup__container-title">Alterar foto de perfil</legend>

          <input
            type="url"
            className="popup__container-input"
            id="avatar-link"
            placeholder="Link de imagem"
            ref={avatarRef}
            onChange={handleInputChange}
            required
          />
          {!isValid && <Validator message={errorAvatarMessage} />}
        </fieldset>

        <button
          className={`popup__container-button ${isValid ? "" : "popup__container-button_inactive"}`}
          type="submit"
          disabled={!isValid}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </button>

        <button
          id="close-button"
          className="popup__container-close-button"
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <img
            src="./images/close-icon.png"
            alt="Ícone de fechar"
            className="popup__container-close-button-icon"
            id="image-close-button"
          />
        </button>
      </form>
    </section>
  );
}

export default EditAvatar;
