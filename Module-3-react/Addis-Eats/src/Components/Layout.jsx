import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Every screen in the route table is nested under this Layout (see
// App.jsx), so Header/nav/Footer render once and only the <Outlet />
// content swaps as the user navigates between routes.
function Layout() {
  return (
    <div className="app">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
