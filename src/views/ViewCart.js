import React, { useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import Navigation from "../components/Navigation";
import { collection, getDocs, writeBatch } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function ViewCart() {
  const [user, loading] = useAuthState(auth);
  const [cartItems, setCartItems] = useState([]);
  const [menusItems, setMenusItems] = useState([]);
  const navigate = useNavigate();

  async function getCart() {
    const cartInfo = await getDocs(collection(db, "carts"));
    const cartItems = cartInfo.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setCartItems(cartItems);
  }

  async function getItem(id) {
    const menusInfo = await getDocs(collection(db, "menus"));
    const menusItems = menusInfo.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setMenusItems(menusItems);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getCart();
    getItem();
  }, [navigate, user, loading]);

  async function submitOrder(id) {
    const batch = writeBatch(db);
    const query = await getDocs(collection(db, "carts"));
    try {
      query.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error) {
      console.log(error);
    }
    signOut(auth);
  }

  const CartRow = () => {
    return cartItems.map((item, index) => {
      return (
        <Card key={index}>
          <Card.Body>
            <Card.Text>{item.item}</Card.Text>
            <Card.Text>Quantity: {item.quantity}</Card.Text>
            <Card.Img
              style={{ width: "15rem", height: "15rem" }}
              src={item.image}
            />
          </Card.Body>
        </Card>
      );
    });
  };
  return (
    <>
      <Navigation />
      <Container>
        <h2>Your Cart</h2>
        <Row>
          <CartRow />
        </Row>
        <Card.Link onClick={submitOrder}>Submit</Card.Link>
      </Container>
    </>
  );
}
