import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoHomeSharp, IoLogOut } from "react-icons/io5";
import { FaInfoCircle, FaUserAstronaut } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";


export const Header = (): JSX.Element => {
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>();



  const handleMenuProfile = () => {
    setIsMenuProfileOpen((prevState) => !prevState);
    setIsMenuOpen(false);
  };
  const handleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    setIsMenuProfileOpen(false);


  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }; 
  //@ts-ignore
  console.log(parseJwt(token))
  //@ts-ignore
  setUser(parseJwt(token))
}, []);


  console.log(user)



  return (
    <section className="grid grid-cols-5 items-center bg-[#180037] h-12 relative">
      <div className="lg:col-span-2 col-span-1  md:flex hidden px-4 gap-2 items-center">
        <Link to="/home" className="flex flex-row items-center gap-2">
          <img src="/logo-icon.png" alt="Logo" className="h-10" />
          <h1 className="text-white uppercase font-bold text-xl lg:block hidden">
            Acidentes por rabiscos
          </h1>
        </Link>
      </div>
      <div className="col-span-1 flex md:hidden px-4 relative gap-2 items-center">
        <button onClick={() => handleMenu()} className="flex flex-row items-center gap-2">
          <IoMdMenu className="text-4xl text-white" />

        </button>
        {isMenuOpen && (
          <div className="absolute left-0 z-40 top-10 text-white flex flex-col gap-2 bg-[#180037] w-40 py-4 shadow-lg">
            <Link
              to="/home"
              className="w-full flex items-center gap-2 text-xl hover:opacity-80 justify-start px-2"
            >
              <IoHomeSharp />
              Home
            </Link>
            <Link
              to="/about"
              className="w-full flex items-center gap-2 text-xl hover:opacity-80 justify-start px-2"
            >
              <FaInfoCircle />
              Sobre
            </Link>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 md:col-span-3  gap-4 md:flex hidden justify-between">
        <div className="flex gap-4">

          <div>
            <Link to="/home" className="flex flex-row items-center">
              <p className="text-white hover:text-purple-500">Home</p>
            </Link>
          </div>
          <div>
            <Link to="/about" className="flex flex-row items-center">
              <p className="text-white hover:text-purple-500">Sobre</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Busque um quadrinho aqui"
            className="bg-transparent border-b w-80 text-white outline-none"
          />
          <BiSearchAlt2 className="text-white text-xl" />
        </div>
      </div>
      <div className="  col-span-4 md:col-span-1 text-white px-2 flex justify-end items-center gap-4">
        <button className="flex items-center gap-4" onClick={handleMenuProfile}>
          <p>{user ? user.user.username : ''}</p>
          <img
            src={user ? user.user.profilePhoto : "/jeff-1.png"}
            alt="Profile"
            className="h-10 w-10 object-cover rounded-full bg-purple-400"
          />
        </button>
        {isMenuProfileOpen && (
          <div className="absolute right-0 z-40 top-12 flex flex-col gap-2 bg-black w-40 py-4 rounded-bl-xl shadow-lg">
            <Link
              to="/profile"
              className="w-full flex items-center gap-2 text-xl hover:text-purple-500 justify-start px-2"
            >
              <FaUserAstronaut className="text-purple-500" />
              Meu perfil
            </Link>
            <button className="w-full flex items-center gap-2 text-xl hover:text-red-500 justify-start px-2" onClick={() => handleLogout()}>
              <IoLogOut className="text-red-500" /> Sair
            </button>
          </div>
        )}
      </div>
      <div className="w-full md:hidden top-14 px-4 absolute">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Busque um quadrinho aqui"
            className="bg-transparent hover:opacity-100 z-10 focus:opacity-100 opacity-30 border-b min-w-40 w-full text-white outline-none"
          />
          <BiSearchAlt2 className="text-white text-xl" />
        </div>
      </div>
    </section>
  );
};
