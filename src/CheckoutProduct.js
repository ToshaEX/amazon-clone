import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = ({
  id,
  image,
  title,
  price,
  rating,
  display,
}) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasket} style={{ display: `${display}` }}>
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
