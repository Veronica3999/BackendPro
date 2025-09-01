import { NavLink } from "react-router";


function nav(){
    return(
        <section className="bg-blue-200 pt-3 pb-2 pr-3 sm:p-2">
            <NavLink
                to="/news"
                className="
                block w-[400px] mb-2 px-4 py-2 text-2xl bg-blue-50 rounded-r-xl hover:bg-blue-300 
                sm:inline-block sm:w-[100px] sm:text-xl sm:rounded-r-none sm:mr-1 sm:px-0 sm:text-center"
                > Nyheter
            </NavLink>
            <NavLink
                to="/categories"
                className="
                block mb-2 py-2 pl-4 text-2xl bg-blue-50 rounded-r-xl w-[400px] hover:bg-blue-300 
                sm:inline-block sm:w-[100px] sm:text-xl sm:rounded-r-none sm:mr-1 sm:px-0 sm:text-center"
                > Kläder
            </NavLink>
            <NavLink
                to="/register"
                className="
                block mb-2 py-2 pl-4 text-2xl bg-blue-50 rounded-r-xl w-[400px] hover:bg-blue-300 
                sm:inline-block sm:w-[120px] sm:text-xl sm:rounded-r-none sm:mr-1 sm:px-0 sm:text-center"
                > Accessoarer
            </NavLink>
            <NavLink
                to="/categories"
                className="
                block mb-2 py-2 pl-4 text-2xl bg-blue-50 rounded-r-xl w-[400px] hover:bg-blue-300 
                sm:inline-block sm:w-[100px] sm:text-xl sm:rounded-r-none sm:px-0 sm:text-center"
                > Skor
            </NavLink>
        </section>
    )
}
export default nav;