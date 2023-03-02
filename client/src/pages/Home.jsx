import React from "react";
import CartModal from "../components/CartModal";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

const Home = () => {
  return (
    <div className="w-full h-screen bg-slate-100 overflow-y-scroll">
      <Header />
      <MainContent />
      <CartModal />
    </div>
  );
};

export default Home;
