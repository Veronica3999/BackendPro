import { useSearchParams } from "react-router";
import GridCardSection from "../../assets/Components/GridCardSection/GridCardSection";
import { useState, useEffect, useContext } from "react";
import { FavoriteContext } from "../../Context/FavoriteContext";
function Search(){
    const[productsResult, setproductsResult]=useState([]);
    const[isError, setisError]=useState("");
    const {favorites, addFavorite } = useContext(FavoriteContext);
    const [search]= useSearchParams();
    const getQueryName = search.get("q");

    useEffect(() =>{
        if(!getQueryName){
            return;
        }
        const fetchProducts = async () =>{
            try{
                const res = await fetch(`http://localhost:8000/api/products/search?q=${getQueryName}`);
                const data = await res.json();

                    if(!res.ok){
                        setisError(data.isError || "Något gick fel vid sökningen");
                        setproductsResult([]);
                        return;
                    }
            setproductsResult(data);
            setisError("");
            }
            catch(error){
                setisError("Kan inte hämta sökresultatet");
            }
        };
    fetchProducts();

    },[getQueryName]);
        if (isError) {
            return <div className="text-center text-red-600 mt-10">{isError}</div>;
         }

    return(
       <GridCardSection 
            title={
            <span>
                Hittade <span className="font-bold text-3xl">{productsResult.length}</span> produkter<br></br> 
                med sökordet <span className="italic">"{getQueryName}"</span>.
            </span>
            }
            products={productsResult} />
    )
}
export default Search;