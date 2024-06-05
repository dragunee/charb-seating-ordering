import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import HomePage from "./views/HomePage";
import Menu from "./views/Menu";
import OrderPage from "./views/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
