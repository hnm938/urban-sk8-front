import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { CarouselItem } from "@/components/CarouselItem";

import Layout from "@/components/Layout";

import styles from "@/styles/Products.module.scss";

export default function FeaturedProducts({ products }) {
  return (
    <Layout>
      <div className={styles["Products"]}>
        {products.map((product) => (
          <CarouselItem className={styles["carousel-item"]} key={product._id} {...product} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
