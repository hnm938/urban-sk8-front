import styles from "@/styles/components/CarouselItem.module.scss";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const CarouselItem = ({ _id, title, description, price, images, className }) => {
  return (
    <Link href={`/product/${_id}`}>
      <div className={`${styles["carousel-item"]} ${className}`}>
        <div className={styles["item--image"]}>
          <img src={images[0]} alt="item image" />
        </div>
        <div className={styles["item--rating"]}>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <div className={styles["item--info"]}>
          <h1 className={styles["item--name"]}>{title}</h1>
          <p className={styles["itme--info-price"]}>$ {price} CAD</p>
        </div>
      </div>
    </Link>
  );
};
