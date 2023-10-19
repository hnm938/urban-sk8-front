import Link from "next/link";

import Layout from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";

import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

import styles from "@/styles/Categories.module.scss";

export default function Categories({ parentCategories, categoryProducts }) {
  
  return (
    <Layout>
      <div className={styles["Categories"]}>
        {parentCategories.map((category) => (
          <div>
            <ProductCarousel
              title={category.name}
              margin="1.5cqw 0"
              products={...categoryProducts[category._id]}
            />
            <Link
              className={styles["category-link"]}
              href={`/category/${category.name}`}
            >Show All</Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find();
  const parentCategories = categories.filter((c) => !c.parent);
  const categoryProducts = {};

  for (const parentCat of parentCategories) {
    const parentCatId = parentCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === parentCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [parentCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds}, null, {
      limit: 4,
      sort: { _id: -1 },
    });
    categoryProducts[parentCat._id] = products;
  }

  return {
    props: {
      parentCategories: JSON.parse(JSON.stringify(parentCategories)),
      categories: JSON.parse(JSON.stringify(categories)),
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  };
}
