import {useState, useEffect} from 'react';
import Card from './Card.js';
import api from '../utils/Api.js';

export default function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [cards, setCards] = useState([]);
  const [userAvatar, setUserAvatar] = useState();
  
  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }, []);

    return (
        <main className="content">
<section className="profile">
  <div className="profile__avatar-container">
    <img alt="фото кошки" className="profile__avatar" />
    <div className="profile__avatar-save"
    onClick={onEditAvatar}
    ></div>
  </div>
  <div className="profile__info">
    <div className="profile__title">
      <h1 className="profile__name">Василиса Злунина</h1>
      <button
        type="button"
        className="profile__edit-button opacity"
        onClick={onEditProfile}
        
      ></button>
    </div>
    <p className="profile__about">Похититель мелких предметов</p>
  </div>
  <button type="button" class="profile__add-button opacity"
  onClick={onAddPlace}></button>
</section>


<section className="elements">
{cards.map(card => (
          <Card card={card} key={card._id} onCardClick={onCardClick}/>
        ))}
</section>

</main>
    );
}


