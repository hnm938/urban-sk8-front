import Image from "next/image";
import Link from "next/link";

import { mongooseConnect } from "@/lib/mongoose";
import { CarouselItem } from "@/components/CarouselItem";

import Layout from "@/components/Layout";

import styles from "@/styles/Products.module.scss";

import TitleImage2 from "@/assets/featured/featured_title_2.png";
import { Button } from "@/components/StyledComponents";

import { Settings } from "@/models/Settings";
import { Product } from "@/models/Product";

export default function FeaturedProducts({ products, featuredProduct }) {
  return (
    <Layout>
      <div className={styles["Products"]}>
        {featuredProduct !== null ? (
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
        ) : (
          <></>
        )}
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
  await mongooseConnect();
  const featuredProductId = (await Settings.find())[0].featuredProduct;
  
  let featuredProduct = null;
  try {
    await Product.find({ _id: featuredProductId });
    if (!!featuredProductId) {
      featuredProduct = await Product.findById(featuredProductId);
    }
  } catch (error) {
    console.log(`featured.jsx: product "${featuredProductId}" is not in the database`);
  }

  const products = await Product.find({}, null, { sort: { _id: -1 } });
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
