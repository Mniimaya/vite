import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import { Suspense, useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("app");
  }, []);
  return (
    <>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
