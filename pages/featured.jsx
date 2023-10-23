import Image from "next/image";
import Link from "next/link";

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { CarouselItem } from "@/components/CarouselItem";

import Layout from "@/components/Layout";

import styles from "@/styles/Products.module.scss";

import TitleImage2 from "@/assets/featured/featured_title_2.png";
import { Button } from "@/components/StyledComponents";

export default function FeaturedProducts({ products, featuredProduct }) {
  return (
    <Layout>
      <div className={styles["Products"]}>
        <div className={styles["featured-product"]}>
          <h1>
            Featured
            <Link href={`/product/${featuredProduct._id}`}>
              <Button $outlined>Add to Cart</Button>
            </Link>
          </h1>
          <h2>${featuredProduct.price}</h2>
          <Image id={styles["title-image"]} src={TitleImage2} alt="asd" />
          <img
            className={styles["featured--image"]}
            src={featuredProduct.images[0]}
            alt=""
          />
        </div>
        <div className={styles["all-products"]}>
          {products.map((product) => (
            <CarouselItem
              className={styles["carousel-item"]}
              key={product._id}
              {...product}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}


export async function getServerSideProps() {
  const featuredProductId = "6531e7cb7aa415c64b17b569";
  await mongooseConnect();
  
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
