import { useState } from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

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

  return (
    <div className="page">
      <Header />
      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />
      
{/* спасибо за подсказку форматирования, prettier не совсем корректно работал с кодом */}
      <PopupWithForm
        name={`profile`}
        title={`Редактировать профиль`}
        buttonText={`Сохранить`}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            type="text"
            placeholder="Имя"
            id="name"
            className="popup__input popup__input_name"
            name="name"
            required
            minLength="2"
            maxLength="40"
          />

          <span className="popup__input-error name-error" />
        </label>
        <label className="popup__field">
          <input
            type="text"
            placeholder="Специальность"
            id="about"
            className="popup__input popup__input_about"
            name="about"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error about-error"></span>
        </label>
      </PopupWithForm>

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
  );
}

export default App;
