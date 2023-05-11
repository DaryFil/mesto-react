export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_photo-view ${card && "popup_opened"}`}>
      <div className="popup__content">
        <button
          className="popup__button-close popup__button-close_photo-view opacity"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card ? card.link : "#"}
          alt={card ? card.name : "название картинки"}
        />
        <h2 className="popup__image-title">
          {card ? card.name : "название картинки"}
        </h2>
      </div>
    </div>
  );
}
