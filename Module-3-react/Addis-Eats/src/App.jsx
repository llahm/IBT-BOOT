import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// The whole app's route table, in one place. Every route is nested
// inside Layout so the header/nav render once and only the matched
// screen swaps inside its <Outlet />.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:id" element={<DishPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
