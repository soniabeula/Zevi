import styles from "./Hero.module.scss";
import TrendsCard from "./TrendsCard";
import { faker } from "@faker-js/faker";
import { Link, Dialog } from "@mui/material";
import { useState } from "react";
import ViewProductDialog from "../Viewproducuts/ViewProductDialog";

export type Product = {
  productImage: string;
  productName: string;
  discount: string;
  price: string;
  rating: string;
};
export type List = {
  productName: string;
};
export function createRandomProduct(): Product {
  return {
    productImage: faker.image.avatar(),
    productName: faker.commerce.productName(),
    discount: faker.commerce.price({ min: 500, max: 1000 }),
    price: faker.commerce.price({ min: 100, max: 500 }),
    rating: faker.string.numeric({ length: { min: 1, max: 5 } }),
  };
}
export function createRandomList(): List {
  return {
    productName: faker.commerce.productName(),
  };
}

export const products: Product[] = faker.helpers.multiple(createRandomProduct, {
  count: 5,
});
export const lists: Product[] = faker.helpers.multiple(createRandomProduct, {
  count: 5,
});

const SuggestionBox = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className={styles.suggestionBox}>
      <p style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>
        {"Latest Trends"}
      </p>
      <div className={styles.productCard}>
        {products?.map((product: any) => (
          <TrendsCard
            img={product.productImage}
            title={product.productName}
            setOpenDialog={setOpenDialog}
          />
        ))}
      </div>

      <p className={styles.suggestionHeader}>{"Popular Suggetions"}</p>
      <div>
        {lists.map((item: any) => {
          return (
            <Link
              onClick={() => setOpenDialog(true)}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: 12,
                display: "block",
              }}
              href="#"
            >
              {item.productName}{" "}
            </Link>
          );
        })}
      </div>
      <ViewProductDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default SuggestionBox;
