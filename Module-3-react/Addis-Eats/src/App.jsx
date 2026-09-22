import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
import RouteSkeleton from "./Components/RouteSkeleton";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ReceiptPage = lazy(() => import("./pages/ReceiptPage"));

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
              <Suspense fallback={<RouteSkeleton />}>
                <CheckoutPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="checkout/receipt"
          element={
            <RequireAuth>
              <Suspense fallback={<RouteSkeleton />}>
                <ReceiptPage />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
