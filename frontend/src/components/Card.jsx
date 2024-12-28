function Card({card, onCardClick, onCardDelete, onCardLike, userId}){

    const isOwn = card.owner === userId;

    return(
        <div 
        className="element" 
        key={card._id} 
        onClick={() => onCardClick(card.link)}
      >
        {
          isOwn ?
          <img
            src="../images/trash-can.png"
            alt="trash can icon"
            className="trash-can-icon"
            id="trash-can"
            onClick={(event) => onCardDelete(card, event)}
          /> :
          ""
        }
        <img className="element__image" src={card.link} alt=""/>
        <div className="element__description">
          <div className="element__props">
            <p className="element__title">{card.name}</p>
            {
              card.likes.some(i => i._id === userId) ?
              <img
                src="../images/like-dark.png"
                alt="dark heart icon"
                className="element__icon"
                id="dark-heart"
                onClick={(event) => onCardLike(card, event)}
             /> :
             <img
               src="../images/like.png"
               alt="heart icon"
               className="element__icon"
               id="heart"
               onClick={(event) => onCardLike(card, event)} 
             />
            }
          </div>
          <span className="element__likes-quantity">{card.likes.length}</span>
        </div>
      </div>
    );
}

export default Card;