function ImagePopup({card, onClose}) {
   return (
    <section className={`popup ${card ? 'popup__opened' : ''}`} id="image-popup">
    <div className="popup__image-container">
      <img className="popup__image" alt="" src={card}/>
      <button
        id="image-close-button"
        className="popup__image-close-button"
        type="button"
        onClick={onClose}
      >
        <img
          src="../images/close-icon.png"
          alt="close icon"
          className="popup__container-close-button-icon"
        />
      </button>
      <p className="popup__image-description"></p>
    </div>
  </section>
 );
}

export default ImagePopup;