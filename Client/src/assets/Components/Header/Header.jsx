import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";

import logo from "../../Img/logo3.png";
import cartImage from "../../Img/shopping-cart.svg";
import heart from "../../Img/heart.svg";
import login from "../../Img/loggin.svg";
import searchglas from "../../Img/search.svg"
import { CartContext } from "../../../Context/CartContext";


function Header(){
    const{ cart } = useContext(CartContext);
     const navigate=useNavigate();
console.log(cart);
     const[searchInput, setsearchInput]=useState("");

   useEffect(()=>{
    document.title = 'Freaky Fashion';
   },[]);


const searchInputValue = (event) => {
    setsearchInput(event.target.value)
};

    
const handleInputSearch = (event) => {
    event.preventDefault();
        if(searchInput.trim() !==""){
            navigate(`/search?q=${searchInput}`);
            setsearchInput("");
        }
};


     
    return(
        <section className="
            flex flex-col gap-4 mb-10 
            sm:flex-row sm:items-center sm:justify-between
            ">
        <div className="shrink-0">
            <Link to="/">
                <img 
                src={logo} 
                alt="Logotyp" 
                className="h-44 object-contain" 
                />
            </Link>
            <h1 className=" 
                absolute left-[38%] top-15 text-4xl font[var(--font-mystery)] 
                sm:hidden
                ">Freaky Fashion
            </h1>
        </div>
        <div className="
            flex items-center justify-between gap-3 w-full 
            sm:w-auto sm:flex-1">
                <form 
                    onSubmit={handleInputSearch} 
                    className="relative flex-1 max-w-xs 
                        sm:max-w-[350px]">
                            <input
                                type="search"
                                value={searchInput}
                                onChange={searchInputValue}
                                placeholder="Sök…"
                                className="
                                    w-full border text-lg rounded-3xl px-3 pr-12 py-2
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                "/>
                            <button
                                type="submit"
                                className="
                                    absolute right-3 top-1/2 -translate-y-1/2
                                    ">
                                <img src={searchglas} alt="Sök" className="w-6 h-6" />
                            </button>
                </form>
    <nav className="flex items-center gap-2 sm:shrink-0">
            <NavLink
            className="relavive"
                to="/basket">
                    <img src={cartImage} alt="Varukorg" className="w-7 h-7"/>
                            <p className=" flex items-center justify-center text-xl bg-red-500 rounded-full h-5 w-5 absolute top-57 right-19 sm:top-26 sm:right-19">{cart.length}</p>
            </NavLink>
            <NavLink
            to="/favorites">
                <img src={heart} alt="Favoriter" className="
                    w-7 h-7
                    "/>
            </NavLink>
            <NavLink
            to="/login">
                <img src={login} alt="Logga in" className="
                w-7 h-7
                "/>
            </NavLink>
    </nav>
  </div>
</section>    
)
}
export default Header;