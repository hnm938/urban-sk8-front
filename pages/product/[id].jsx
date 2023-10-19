import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useEffect } from "react";

import ScrollContainer from "react-indiana-drag-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/SingleProduct.module.scss";
import { Button } from "@/components/StyledComponents";
import { ProductCarousel } from "@/components/ProductCarousel";
import Link from "next/link";

export default function SingleProduct({ product, relatedProducts }) {
  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    document
      .querySelector(`.${styles["product-gallery--preview"]}`)
      .childNodes[0].classList.add(styles["selected"]);
  }, []);

  return (
    <Layout>
      <div className={styles["ProductPage"]}>
        <div id={styles["product-gallery"]}>
          <img
            id={styles["product-gallery--main"]}
            src={product.images[0]}
            alt=""
          />
          <ScrollContainer className={styles["product-gallery--preview"]}>
            {product.images.map((image) => (
              <img
                src={image}
                alt="product_image"
                onClick={(e) => {
                  const mainImage = document.getElementById(
                    styles["product-gallery--main"]
                  );
                  mainImage.src = image;

                  e.target.parentElement.childNodes.forEach((child) => {
                    child.classList.remove(styles["selected"]);
                  });
                  e.target.classList.add(styles["selected"]);
                }}
              />
            ))}
          </ScrollContainer>
        </div>
        <div id={styles["product-info"]}>
          <h1
            id={styles["product-info--title"]}
            className={product.description === "" ? "mb-10" : ""}
          >
            {product.title}
          </h1>
          {product.description !== "" ? (
            <p id={styles["product-info--description"]}>
              {product.description}
            </p>
          ) : (
            <></>
          )}
          <div className={styles["product-info--container"]}>
            <p>
              ${product.price} <span>(CAD)</span>
            </p>
            <div className={styles["item--rating"]}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <Button
              onClick={() => {
                addProduct(product._id);
              }}
            >
              Add to Cart
            </Button>

            <div className={styles["related-items"]}>
              <h1 className={styles["related--title"]}>Related Products</h1>
              <div className={styles["related--products"]}>
                {relatedProducts.map((p) => (
                  <Link href={`/product/${p._id}`}>
                    <div>
                      <img src={p.images[0]} alt="related item" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  
  const product = await Product.findById(id);
  // Search for products with atleast 1 same property
  const relatedProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts))
    },
  };
}
