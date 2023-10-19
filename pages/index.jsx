import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/StyledComponents";

import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

import { ProductCarousel } from "@/components/ProductCarousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

import HeaderImg1 from "@/assets/home/header_image_1.png";
import HeaderImg2 from "@/assets/home/header_image_2.png";
import HeaderImg3 from "@/assets/home/header_image_3.png";

import Title2 from "@/assets/home/title_2.png";

import AboutImg1 from "@/assets/home/about_image_1.png";

import CategoryImgTee from "@/assets/home/category_image_tee.png";
import CategoryImgShoe from "@/assets/home/category_image_shoe.png";
import CategoryImgHoodie from "@/assets/home/category_image_hoodie.png";

import CategoryImgTeeMobile from "@/assets/home/category_image_tee_mobile.svg";
import CategoryImgShoeMobile from "@/assets/home/category_image_shoe_mobile.svg";
import CategoryImgHoodieMobile from "@/assets/home/category_image_hoodie_mobile.svg";

import SkateboardIcon from "@/assets/home/skateboard_icon.svg";
import CharityIcon from "@/assets/home/charity_icon.svg";

import style from "@/styles/Home.module.scss";
import Layout from "@/components/Layout";

export default function Home({ newProducts }) {
  return (
    <Layout>
      <div className={style["Home"]}>
        {/* === HEADER === */}
        <header id={style["home-header"]}>
          {/* === HEADER HERO === */}
          <div id={style["header--hero"]}>
            <div id={style["header--hero-image"]}>
              <Image className={style["hero-image"]} src={HeaderImg1} alt="" />
              <Image className={style["hero-image"]} src={HeaderImg2} alt="" />
              <Image className={style["hero-image"]} src={HeaderImg3} alt="" />
            </div>
            <div id={style["header--hero-text"]}>
              <div>
                <h1>Feel</h1>
                <div>
                  <Button>Shop</Button>
                  <h1>The</h1>
                </div>
              </div>
              <div>
                <Image src={Title2} alt="" />
              </div>
            </div>
          </div>
        </header>

        <hr />

        {/* === OUR MISSION === */}
        <section id={style["home-about"]}>
          <div id={style["about--info"]}>
            <h1>Our Mission</h1>
            <p>
              At Urban Sk8, we&apos;re driven by the skate culture and a passion to
              make a positive impact. Founded by skaters, our brand is rooted in
              the community we love. When you shop with us, you&apos;re not just
              getting fashionable clothing; you&apos;re investing in our mission. A
              portion of every purchase goes towards empowering troubled youth
              through skateboarding, creating opportunities for them to discover
              the thrill and camaraderie it offers. Join us in uniting style,
              purpose, and the love of skating.
            </p>
            <div id={style["info--controls"]}>
              <Link href={"/about"}>
                <Button>Learn More</Button>
              </Link>
              <div id={style["info--controls-links"]}>
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTiktok} />
              </div>
            </div>
          </div>
          <div id={style["about--image"]}>
            <Image src={AboutImg1} alt="" />
          </div>
        </section>

        {/* === NEW ARRIVALS CAROUSEL === */}
        <ProductCarousel
          title="New Arrivals"
          guideEnabled={true}
          btnText="View All"
          btnLink="/featured"
          products={newProducts}
        />

        {/* === PRODUCT CATEGORIES === */}
        <div id={style["home-categories"]}>
          <h1>Shop Collections</h1>
          <div id={style["categories--images"]}>
            <div className={style["category-image"]}>
              <Image src={CategoryImgTee} alt="Category hero for shoes" />
              <Link href={"/categories"}>
                <Button $outlined>Shop Collection</Button>
              </Link>
            </div>
            <div className={style["category-image--mobile"]}>
              <Image src={CategoryImgTeeMobile} alt="Category hero for shoes" />
              <Link href={"/categories"}>
                <Button>Shop Collection</Button>
              </Link>
            </div>

            <div className={style["category-image"]}>
              <Image src={CategoryImgShoe} alt="Category hero for shoes" />
              <Link href={"/categories"}>
                <Button $outlined>Shop Collection</Button>
              </Link>
            </div>
            <div className={style["category-image--mobile"]}>
              <Image
                src={CategoryImgShoeMobile}
                alt="Category hero for shoes"
              />
              <Link href={"/categories"}>
                <Button>Shop Collection</Button>
              </Link>
            </div>

            <div className={style["category-image"]}>
              <Image src={CategoryImgHoodie} alt="Category hero for shoes" />
              <Link href={"/categories"}>
                <Button $outlined>Shop Collection</Button>
              </Link>
            </div>
            <div className={style["category-image--mobile"]}>
              <Image
                src={CategoryImgHoodieMobile}
                alt="Category hero for shoes"
              />
              <Link href={"/categories"}>
                <Button>Shop Collection</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* === INFO SPLITTER === */}
        <div id={style["home-info-splitter"]}>
          <div asd >
            <Image src={SkateboardIcon} alt="Skateboard icon" />
            <h1>Skater Friendly</h1>
            <p>
              Urban Sk8 is the embodiment of skate culture. Crafted by
              passionate skaters, exuding authenticity, style, and energy of the
              skate world. You&apos;re not just wearing clothing; you&apos;re embracing a
              lifestyle.
            </p>
            <Button>Learn More</Button>
          </div>
          <div>
            <Image src={CharityIcon} alt="Charity icon" />
            <h1>Giving Back</h1>
            <p>
              We believe in giving back to the community that inspires us.
              That&apos;s why we commit to donating 1% of our profits to support
              troubled youth in finding their passion for skating.
            </p>
            <Button>Learn More</Button>
          </div>
        </div>

        {/* === SKATE DECKS CAROUSEL === */}
        <ProductCarousel
          title="Sake Decks"
          guideEnabled={true}
          btnText="View All"
          btnLink="/featured"
          products={newProducts}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "650a4f5a2f7e94ec6a228203";
  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}