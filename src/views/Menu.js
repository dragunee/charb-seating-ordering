import React, { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "../components/Navigation";


export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);

    async function getAllMenu() {
        const query = await getDocs(collection(db, "menus"));
        const menuItems = query.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setMenuItems(menuItems);
    }

    useEffect(() => {
        getAllMenu();
    }, []);

    const ImagesRow = () => {
        return menuItems.map((item, index) => <ImageSquare key={index} item={item} />);
    }

    return (
    <>
      <Navigation />
      <Container>
        <h2>Menu</h2>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
};

function ImageSquare({ item }) {
  const { image, id } = item;
  return (
    <Link
      to={`${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
  );
}