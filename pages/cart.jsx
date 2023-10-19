import { Button } from "@/components/StyledComponents";
import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import styles from "@/styles/Cart.module.scss";

export default function CartPage() {
  const { cartProducts, clearCart, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function increaseItemQuantity(id) {
    addProduct(id);
  }
  function decreaseItemQuantity(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <Layout>
        <h1>Thank you for your order</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles["cart"]}>
        <div
          className={`${styles["section-container"]} ${styles["cart-container"]}`}
        >
          {!cartProducts?.length && <div>Your cart is empty</div>}
          <h1>Cart</h1>

          {products?.length > 0 && (
            <table>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td className={styles["cart-product--image"]}>
                      <h1> </h1>
                      <img src={product.images[0]} alt="" />
                    </td>
                    <td className={styles["cart-product--props"]}>
                      <h1>Product</h1>
                      <h2>{product.title}</h2>
                      {product.properties && (
                        <div>
                          {Object.entries(product.properties).map(
                            ([key, value]) => (
                              <div key={key}>
                                <h3>
                                  {key}: 
                                  <span>{value}</span>
                                </h3>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      <h1>Quantity</h1>
                      <div className={styles["cart-product--quantity"]}>
                        <button
                          onClick={() => decreaseItemQuantity(product._id)}
                        >
                          -
                        </button>
                        <span>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </span>
                        <button
                          onClick={() => increaseItemQuantity(product._id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className={styles["cart-product--price"]}>
                      <h1>Price</h1>
                      <h2>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                        <span> (CAD)</span>
                      </h2>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className={styles["table-spacer"]}></td>
                  <td className={styles["table-spacer"]}></td>
                  <td className={styles["table-spacer"]}></td>
                  <td className={styles["cart-product--total"]}>
                    Total: <b>${total}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {!!cartProducts?.length && (
          <div
            className={`${styles["section-container"]} ${styles["checkout-container"]}`}
          >
            <h1>Order information</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              name="country"
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              name="streetAddress"
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex justify-between gap-x-3">
              <input
                className="w-[60%]"
                type="text"
                placeholder="City"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <input
                className="w-[40%]"
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                name="postalCode"
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
            </div>
            <Button black block onClick={goToPayment}>
              Continue to payment
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
