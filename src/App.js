import AddSynonym from "./components/AddSynonym";
import Header from "./components/Header";
import SynonymSearch from "./components/SynonymSearch";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/4">
          <SynonymSearch />
        </div>
        <div className="w-full h-px bg-gray-300 md:w-px md:h-full"></div>{" "}
        {/* Divider */}
        <div className="w-full md:w-1/4">
          <AddSynonym />
        </div>
      </div>
    </div>
  );
}

export default App;
