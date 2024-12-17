function InfoTooltip({message, icon, isOpen, onClose}) {
    return (
      <section className={`popup ${isOpen ? "popup__opened" : ""}`}>
        <div className="popup__container popup__container-small">
            <img 
            src={icon} alt="success-icon" className="popup__container-icon"/>
            <p className="popup__container-message">{message}</p>

           <button
            id="image-close-button"
            className="popup__container-close-button popup__container-small-close-button"
            type="button"
            onClick={onClose}
            >
              <img
               src="../images/close-icon.png"
               alt="close icon"
               className="popup__container-close-button-icon"
              />
            </button>
       </div>
      </section>
    );
}

export default InfoTooltip;
