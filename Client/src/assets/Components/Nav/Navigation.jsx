import { NavLink } from "react-router";
import { useState, useEffect} from 'react';


function Nav(){


    const[categories, setcategories] = useState([]);
console.log('nav:',categories);
    useEffect( () => {
        fetch("http://localhost:8000/api/categories")
            .then(res => res.json())
            .then(categories =>{
                setcategories(categories);
            })
            .catch(error => console.error("Kategorierna kunde inte hämtas", error))
    },[]); 

    return(
        <section className="bg-blue-200 pt-3 pb-2 pr-3 sm:p-2">
            <NavLink
                to="/news"
                className="
                block w-[400px] mb-2 px-4 py-2 text-2xl bg-blue-50 rounded-r-xl hover:bg-blue-300 
                sm:inline-block sm:w-[100px] sm:text-xl sm:rounded-r-none sm:mr-1 sm:px-0 sm:text-center"
                > Nyheter
            </NavLink>
            {categories.map(category =>(
                <NavLink
                    key={category.categoryID}
                    to={`/categories/${category.categoryName}`}
                    className="
                    block mb-2 py-2 pl-4 text-2xl bg-blue-50 rounded-r-xl w-[400px] hover:bg-blue-300 
                    sm:inline-block sm:w-[100px] sm:text-xl sm:rounded-r-none sm:mr-1 sm:px-0 sm:text-center"
                > {category.categoryName}
                </NavLink>
            ))}
            
        </section>
    )
}
export default Nav;