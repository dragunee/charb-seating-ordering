import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation"; // Importing a component-variable for navigation bar
import { Container, Row, Col, Form } from "react-bootstrap";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { Link } from "react-router-dom";
// import { db } from "../firebase";


export default function HomePage() {
    const [user, loading] = useAuthState(auth); // Initialize authentication state
    const navigate = useNavigate(); // Initialize navigation function
    const [totalPax, setTotalPax] = useState(""); // Initialize totalPax state

    // Authenticate user before enabling homepage entry
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
      }, [navigate, user, loading]);

    // Defining timeslots (Add more in future)
    const timeslots = [
        {value: "1100H-1200H", label:"1100H"},
    ];

    const handleTotalPaxChange = (e) => {
        setTotalPax(e.target.value); // Update totalPax state when input changes
    };

    const handleTimeslotChange = (e) => {
        const selectedTimeslot = e.target.value;
        console.log(`Selected Timeslot: ${selectedTimeslot}`);
    };

    const handleNextPage = () => {
        navigate(`/menu`); // Navigate to next section when button is clicked
    };

    return (
    <>
      <Navigation />
      <Container>
        <Form>
            <Row className="justify-content-center" mb-10>
                <Col xs={4}>
                    <Form.Group controlId="totalPax">
                        <Form.Label>Number of diners</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter total pax"
                            value={totalPax}
                            onChange={handleTotalPaxChange}
                            min={1}
                            required
                            style={{
                                marginBottom:"10px"
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={4}>
                    <Form.Group controlId="timeslot">
                        <Form.Label>Timeslot (Please arrive within 5 minutes of selected timeslot)</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleTimeslotChange}
                            >
                                <option value="">Choose a timeslot</option>
                                {timeslots.map((slot) => (
                                    <option key={slot.value} value={slot.value}>
                                        {slot.label}
                                    </option>
                                ))}
                            </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={4}>
                    <button onClick={handleNextPage}>Submit</button>
                </Col>
            </Row>
        </Form>
      </Container>
    </>
  );
}
