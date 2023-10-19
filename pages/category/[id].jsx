import { useState } from "react";

import Layout from "@/components/Layout";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

import { CarouselItem } from "@/components/CarouselItem";

import Filters from "@/components/Filters";

import styles from "@/styles/Category.module.scss";

export default function CategoryPage(props) {
  const [products, setProducts] = useState(props.products);

  return (
    <Layout>
      <div className={styles["Category"]}>
        <Filters setProducts={setProducts} {...props} />
        <div className={styles["category--products"]}>
          {products.map((product) => (
            <CarouselItem key={product._id} {...product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findOne({ name: context.query.id });
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
