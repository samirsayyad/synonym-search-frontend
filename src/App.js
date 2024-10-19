import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import ManageSynonyms from "./components/ManageSynonyms";
import SynonymSearch from "./components/SynonymSearch";
import Header from "./components/Header";

const NavigationMenu = () => (
  <nav className="p-4 bg-gray-200">
    <ul className="flex justify-center space-x-4">
      <li>
        <NavLink
          to="/find"
          className={({ isActive }) =>
            isActive
              ? "p-4 text-blue-600 border-b-2 border-blue-600"
              : "p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
          }
        >
          Find Synonym
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage"
          className={({ isActive }) =>
            isActive
              ? "p-4 text-blue-600 border-b-2 border-blue-600"
              : "p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300"
          }
        >
          Manage Synonym
        </NavLink>
      </li>
    </ul>
  </nav>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <NavigationMenu />
        <div className="flex flex-col justify-center items-center my-14">
          <Routes>
            <Route path="/" element={<Navigate to="find" />} />
            <Route path="/find" element={<SynonymSearch />} />
            <Route path="/manage" element={<ManageSynonyms />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
