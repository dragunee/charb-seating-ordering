import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navigation from "../components/Navigation";
import { deleteObject, ref } from "firebase/storage";

export default function OrderCart() {
  const fetchProducts = async () => {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map((doc) => doc.data());
    // Set products in state
  };
}
