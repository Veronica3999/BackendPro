import { NavLink } from "react-router";

function AsideAdmin(){


    return(
            <nav className="bg-gray-200 pt-3 pr-4 pb-4 ">
                <div className="pb-3">
                    <NavLink 
                        to="/admin/products"
                        className="block bg-gray-50 px-6 py-2 rounded-r-2xl font-bold hover:bg-gray-400"
                        >Produkter
                    </NavLink>
                </div>
                <div>
                    <NavLink 
                        to="/admin/categories"
                        className="block bg-gray-50 px-6 py-2 rounded-r-2xl font-bold hover:bg-gray-400"
                        >Kategorier
                    </NavLink>
                </div>        
            </nav>
    )
}
export default AsideAdmin;