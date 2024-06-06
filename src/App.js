import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import HomePage from "./views/HomePage";
import Menu from "./views/Menu";
import OrderPage from "./views/OrderPage";
import ViewCart from "./views/ViewCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<OrderPage />} />
        <Route path="/cart" element={<ViewCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
