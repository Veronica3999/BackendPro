import { Link, NavLink, useNavigate } from "react-router";


import logo from "../../Img/logo3.png";
import cart from "../../Img/shopping-cart.svg";
import heart from "../../Img/heart.svg";
import login from "../../Img/loggin.svg";
import searchglas from "../../Img/search.svg"
import { useEffect } from "react";

function Header(){

   useEffect(()=>{
    document.title = 'Freaky Fashion';
   },[]);
    

    const navigate=useNavigate();

    const inputValueOfSearch = ()=>{
        inputValueOfSearch.console.log("value");
    };
    const valueOfInputOnSearch = ()=>{
        valueOfInputOnSearch.console.log("valueinput");
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
                <form role="search" className="
                    relative flex-1 max-w-xs 
                    sm:max-w-[350px]">
                        <input
                            type="search"
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
    <nav className="
        flex items-center gap-2 
        sm:shrink-0
        ">
            <NavLink
                to="/basket">
                    <img src={cart} alt="Varukorg" className="
                        w-7 h-7
                        "/>
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