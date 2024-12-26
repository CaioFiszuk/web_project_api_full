import { useContext } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfile from "./EditProfile.jsx";
import EditAvatar from "./EditAvatar.jsx";
import NewCard from "./NewCard.jsx";
import ImagePopup from "./ImagePopup.jsx";
import CardList from "./CardList.jsx";

function Main({
  isEditProfilePopupOpen, 
  isAddPlacePopupOpen, 
  isEditAvatarPopupOpen,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onClosePopups,
  selectedCard,
  onCardClick,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  cards,
}) {

    const { currentUser } = useContext(currentUserContext);

    if(!currentUser){
       return null;
    }

    return(

      <main className="content">
        <section className="profile">
          <div className="profile__image-container" onClick={() => onEditAvatarClick()}>
            <img
              src={currentUser.data.avatar}
              alt="user"
              className="profile__image"
              id="avatar"
              style={{ backgroundImage: `url(${currentUser.data.avatar})` }}
            />
            <img
              src="../images/edit_avatar_sign.png"
              alt="pencil"
              className="profile__image-edit-sign"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h2 className="profile__name">{currentUser.data.name}</h2>
              <img
                src="../images/edit-sign.png"
                alt="edit sign"
                className="profile__edit-button"
                id="edit-button"
                onClick={() => onEditProfileClick()}
              />
            </div>
            <p className="profile__about">{currentUser.data.about}</p>
          </div>
          <button type="button" className="profile__add-button"               onClick={() => onAddPlaceClick()}>
            <img
              src="../images/plus-sign.png"
              alt="plus sign"
              className="profile__add-button-icon"
              id="add-button"
            />
          </button>
        </section>

        <CardList 
          cards={cards} 
          onCardClick={onCardClick} 
          currentUserId={currentUser._id}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={onClosePopups}/>

        <EditProfile formName="form-edit" isOpen={isEditProfilePopupOpen} onClose={onClosePopups}/>

        <NewCard formName="form-create" isOpen={isAddPlacePopupOpen} onClose={onClosePopups} onAddPlaceSubmit={onAddPlaceSubmit}/>

        <EditAvatar formName="form-avatar" isOpen={isEditAvatarPopupOpen} onClose={onClosePopups}/>

      </main>

    );
}

export default Main;