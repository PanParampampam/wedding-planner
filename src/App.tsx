import { Routes, Route, Link } from "react-router-dom";
import GuestList from "./features/guests/components/GuestList";

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
          <Route path="/guests" element={<GuestList />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
