import styles from "./Hero.module.scss";
import { TruncatestringTo20 } from "../../utils/truncateString";
import { useState } from "react";

export type TrendsCardType = {
  img: string;
  title: string;
  setOpenDialog: (val: any) => void;
};

const TrendsCard = ({ title, img, setOpenDialog }: TrendsCardType) => {
  return (
    <div onClick={() => setOpenDialog(true)} className={styles.trendCard}>
      <img src={img} className={styles.trendImg} />
      <p style={{ fontWeight: 400, fontSize: 12, marginTop: 5 }}>
        {TruncatestringTo20(title)}
      </p>
    </div>
  );
};

export default TrendsCard;
