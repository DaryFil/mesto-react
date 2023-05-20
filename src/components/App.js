import { useState, useEffect } from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card, isLiked) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked ? "DELETE" : "PUT").then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      setCards(cards.filter((card) => card._id !== cardId));
    });
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name={"add-card"}
          title={"Новое место"}
          buttonText={"Создать"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__field">
            <input
              type="text"
              placeholder="Название"
              id="place"
              className="popup__input popup__input_place"
              name="name"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="popup__input-error name-error"></span>
          </label>
          <label className="popup__field">
            <input
              type="url"
              placeholder="Ссылка на картинку"
              id="link"
              className="popup__input popup__input_link"
              name="link"
              required
            />
            <span className="popup__input-error link-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          name={"delete-card"}
          title={"Вы уверены?"}
          buttonText={"Да"}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <PopupWithForm
          className={"save-avatar"}
          title={"Обновить аватар"}
          buttonText={"Да"}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__field">
            <input
              type="url"
              placeholder="Ccылка на картинку"
              id="avatar"
              className="popup__input popup__input_avatar"
              name="avatar"
              required
            />
            <span className="popup__input-error avatar-error" />
          </label>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
