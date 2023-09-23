import styles from "./Card.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";

const Card = function () {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
          alt="image"
          className={styles.cardImage}
        />
        <FavoriteIcon className={styles.favouriteIcon} />
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.cardName}>dummy name</p>
        <div className={styles.priceContainer}>
            <p className={styles.price1}>$2000</p>
            <p className={styles.price2}>$2000</p>
        </div>
        <Rating readOnly name="simple-controlled" value={3} />
      </div>
      
    </div>
  );
};

export default Card;
