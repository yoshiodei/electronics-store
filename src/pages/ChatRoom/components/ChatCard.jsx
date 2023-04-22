import React from 'react';

export default function ChatCard() {
  return (
    <>
      <div className="chat-card d-flex">
        <div className="chat-card__image-div" />
        <div className="chat-card__message-div">
          <p className="chat-card__message">
            Lorem ipsum imei dolor ana manla hin
            dor ini kamal lajm hasin. Sorai maladi
            gondo ipsum imei rinla han. Lagonda jin
            kaxon lorem dolor.
          </p>
        </div>
      </div>
      <div className="chat-card d-flex chat-card--alt">
        <div className="chat-card__image-div" />
        <div className="chat-card__message-div">
          <p className="chat-card__message">
            Lorem ipsum imei dolor ana manla hin
            dor ini kamal lajm hasin. Sorai maladi
            gondo ipsum imei rinla han. Lagonda jin
            kaxon lorem dolor.
          </p>
        </div>
      </div>
      <div className="chat-card d-flex">
        <div className="chat-card__image-div" />
        <div className="chat-card__message-div">
          <p className="chat-card__message">
            Sorai maladi
            gondo ipsum jin
            kaxon lorem dolor.
          </p>
        </div>
      </div>
      <div className="chat-card d-flex chat-card--alt">
        <div className="chat-card__image-div" />
        <div className="chat-card__message-div">
          <p className="chat-card__message">
            Lorem ipsum imei.
          </p>
        </div>
      </div>
    </>
  );
}
