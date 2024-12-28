import Card from "./Card.jsx";

function CardList({
  cards, 
  onCardClick, 
  currentUserId, 
  onCardLike,
  onCardDelete
}) {

  function handleClick(card) {
    onCardClick(card);
  }

  function handleLikeClick(card, event) {
    event.stopPropagation();
    onCardLike(card);
  }

  function handleDeleteClick(card, event) {
    event.stopPropagation();
    onCardDelete(card);
  } 

  if(!cards){
    return null;
  }

  return (
    <section className="elements">
      {
        cards.map((card) => (
          <Card 
          key={card._id} 
          card={card} 
          onCardClick={handleClick} 
          onCardDelete={handleDeleteClick} 
          onCardLike={handleLikeClick} 
          userId={currentUserId}
          />
        ))
      }
    </section>
  );
}

export default CardList;
