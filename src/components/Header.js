import Logo from "../assets/logo.svg";
const Header = () => (
  <header className="flex flex-row items-center bg-blue-600 text-white p-2 shadow ">
    <img src={Logo} alt="Synonym Search Tool" className="w-11 h-11" />
    <h1 className="ml-3 flex text-2xl font-bold">Synonym Search Tool</h1>
  </header>
);

export default Header;
