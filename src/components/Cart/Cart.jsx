import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./cart.scss";
import { inputSchema } from "../../Formik/formik";
import { CartContext } from "../../App";
import { IoCloseOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Cart() {
  const { cartItems, removeFromCart, clearCart} = React.useContext(CartContext);
  const [count, setCount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const orderData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        items: cartItems.map(item => ({ name: item.name, price: item.price }))
      };
  
      await axios.post('http://localhost:3000/orders', orderData);
      resetForm();
      toast.success('Order placed successfully');
      clearCart(); // Очистить корзину
      setTotalPrice(0); // Сбросить общую сумму
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };
  
  
  

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    toast.info("Product was removed from the cart");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * (count[item.id] || 1);
    }
    setTotalPrice(totalPrice.toFixed(2));
  };

  const handleCountChange = (itemId, change) => {
    setCount((prevCount) => ({
      ...prevCount,
      [itemId]: Math.max(0, (prevCount[itemId] || 1) + change),
    }));
  };

  React.useEffect(() => {
    calculateTotalPrice();
  }, [count, cartItems]);

  return (
    <section className="">
      <div className="cart-container">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={inputSchema}
          validateOnMount
        >
          <Form>
            <div className="input-container">
              <ul className="input-list">
                <li>
                  <label htmlFor="name">Name:</label>
                  <Field
                    name="name"
                    id="name"
                    className="input-item"
                    type="text"
                  />
                  <ErrorMessage
                    component="div"
                    className="error-input"
                    name="name"
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <Field
                    name="email"
                    id="email"
                    className="input-item"
                    type="email"
                  />
                  <ErrorMessage
                    className="error-input"
                    component="div"
                    name="email"
                  />
                </li>
                <li>
                  <label htmlFor="phone">Phone:</label>
                  <Field
                    name="phone"
                    id="phone"
                    className="input-item"
                    type="tel"
                  />
                  <ErrorMessage
                    component="div"
                    className="error-input"
                    name="phone"
                  />
                </li>
                <li>
                  <label htmlFor="address">Address:</label>
                  <Field
                    name="address"
                    id="address"
                    className="input-item"
                    type="text"
                  />
                  <ErrorMessage
                    component="div"
                    className="error-input"
                    name="address"
                  />
                </li>
              </ul>
            </div>
            <div className="submit-container">
              <h1 className="price-title">Total price: {totalPrice} </h1>
              <button className="btn-submit" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        <div className="add-container">
          <h2 className="shopping-cart">Shopping Cart</h2>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li className="cart-list-item" key={index}>
                <IoCloseOutline
                  onClick={() => handleRemoveFromCart(item)}
                  className="close-cart"
                />
                <h2 className="cart-text"> Name: {item.name}</h2>
                <p className="cart-desc">
                  {" "}
                  <b>Price: {item.price} UA</b>
                </p>
                <button
                  className="inc-btn"
                  onClick={() => handleCountChange(item.id, -1)}
                >
                  -
                </button>
                <span className="span-count">{count[item.id] || 1}</span>
                <button
                  className="desc-btn"
                  onClick={() => handleCountChange(item.id, 1)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}

export default Cart;
