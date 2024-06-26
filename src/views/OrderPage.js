import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Form, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import Navigation from "../components/Navigation";
// import { deleteObject, ref } from "firebase/storage";

export default function SendToCart() {
  const [itemDesc, setItemDesc] = useState("");
  const [itemImage, setItemImage] = useState("");
  const params = useParams();
  const [itemPrice, setItemPrice] = useState("");
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");

  const handleQuantity = (e) => {
    setQuantity(e.target.value); // Update quantity state when input changes
  };

  async function addCart(id) {
    await addDoc(collection(db, "carts"), {
      userEmail: user.email,
      item: itemDesc,
      quantity: quantity,
      image: itemImage,
      price: itemPrice,
    });
    navigate("/menu");
  }

  async function getItem(id) {
    const itemInfo = await getDoc(doc(db, "menus", id));
    const item = itemInfo.data();
    setItemDesc(item.item);
    setItemPrice(item.price);
    setItemImage(item.image);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getItem(id);
  }, [id, navigate, user, loading]);

  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={itemImage} style={{ width: "50%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  {itemDesc} - ${itemPrice}/serving
                </Card.Text>
                <Form.Control
                  type="number"
                  placeholder="Number of Servings"
                  value={quantity}
                  onChange={handleQuantity}
                  min={1}
                  required
                  style={{
                    width: "75%",
                    marginBottom: "10px",
                  }}
                />
                <Card.Link onClick={() => addCart(id)}>Submit</Card.Link>
                {/* <Card.Link
                                    onClick={() => deletePost(id)}
                                    style={{ cursor: "pointer"}}
                                >Delete</Card.Link> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
