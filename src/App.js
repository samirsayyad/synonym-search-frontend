import React from "react";
import SynonymSearch from "./components/SynonymSearch";
import AddSynonym from "./components/AddSynonym";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <SynonymSearch />
        <AddSynonym />
      </div>
    </div>
  );
}

export default App;
