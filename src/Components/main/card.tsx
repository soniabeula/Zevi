import styles from "./Card.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export type CardType = {
  name: string;
  brand: string;
  rating: number;
  img: string;
  price: number;
  discount: number;
  isFavorite: boolean;
  people: number;
};

const Card = function ({
  name,
  brand,
  rating,
  price,
  discount,
  isFavorite,
  img,
  people,
}: CardType) {
  const [isfavorite, setIsFavorite] = useState(isFavorite);
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={styles.card} onClick={() => setIsHover(true)}>
      <div className={styles.imageContainer}>
        <img src={img} alt="image" className={styles.cardImage} />
        <div className={styles.viewProduct} >{"View Product"}</div>
        {isfavorite ? (
          <FavoriteIcon
            onClick={() => setIsFavorite(!isfavorite)}
            className={styles.favouriteIcon}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => setIsFavorite(!isfavorite)}
            className={styles.favouriteIcon}
          />
        )}
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.cardName}>{name}</p>
        <div className={styles.priceContainer}>
          <p className={styles.price1}>{discount}</p>
          <p className={styles.price2}>{`$${price}`}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Rating readOnly name="simple-controlled" value={rating} />
          <p style={{ fontSize: "12px", margin: 0 }}>{`(${people})`}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
