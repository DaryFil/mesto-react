export default function Card({card, onCardClick}) {
    const handleCardClick = () => {
        onCardClick(card);
    }
return(
    <article className="card">
      <img className="card__image" alt={card.name} src={card.link}
           onClick={handleCardClick}/>
      <button className="card__delete-button opacity" type="button"
              />
      <div className="card__description">
                <h2 className="card__title">{card.name}</h2>
                        <div className="card__like">
          <button type="button" className="card__like-button" 
                 />

          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
    );
}