import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { toast } from "react-toastify";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  console.log("This is the basket :", basket);

  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
    showToast(title);
  };
  const showToast = (name) => {
    toast.success(`${name} Added`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image}></img>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
