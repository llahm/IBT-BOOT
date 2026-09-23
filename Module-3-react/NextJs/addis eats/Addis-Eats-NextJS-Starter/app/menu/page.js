import Link from "next/link";
import DishList from "./components/DishList";
import { dishes } from "./dishes";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function MenuPage({ searchParams }) {
  const query = await searchParams;

  // Visit /menu?error=1 to deliberately test this segment's error.js.
  if (query?.error === "1") {
    throw new Error("Demo error: the menu page was asked to fail.");
  }

  // Intentional delay makes loading.js easier to observe during navigation.
  await wait(900);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <div>
            <span className="eyebrow">THE MENU</span>
            <h1>Find something delicious.</h1>
            <p className="muted">Choose a dish to see its details.</p>
          </div>
          <Link className="text-link" href="/menu?error=1">Test menu error state ↗</Link>
        </div>
        <DishList dishes={dishes} />
      </div>
    </section>
  );
}
