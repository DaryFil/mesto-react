export default function PopupWithForm ({name, title, buttonText, children, isOpen, onClose}) {
return (
    <div className={`popup popup_${name}  ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <h2 className="popup__title">{title}</h2>

      <form
        className="popup__form popup__profile-form popup__form_avatar"
        name={name}
        novalidate >
         {children}
        <button type="submit" className="popup__button-save opacity">
          {buttonText}
        </button>
      </form>
      <button
        type="button"
        className="popup__button-close opacity"
        onClick={onClose}
      ></button>
    </div>
  </div>

);
}