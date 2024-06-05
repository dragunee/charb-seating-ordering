import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Container, Nav, Navbar } from "react-bootstrap";


export default function Navigation() {
    return (
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">CharB - Not Chubby</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>Sign Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}