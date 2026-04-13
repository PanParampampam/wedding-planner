import { Routes, Route, Link } from "react-router-dom";
import Guests from "./features/guests/Guests";

function Home() {
  return <h2>Welcome to the Wedding Planner!</h2>;
}

function App() {
  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>
          Home
        </Link>
        <Link to="/guests">Guest List</Link>
      </nav>
      <section id="center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guests" element={<Guests />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
