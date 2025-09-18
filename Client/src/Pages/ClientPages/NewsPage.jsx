import GridCardSection from "../../assets/Components/GridCardSection/GridCardSection";
import{ useState, useEffect, useContext } from 'react';
import { FavoriteContext } from "../../Context/FavoriteContext";

import { useParams } from 'react-router';
function News(){
    const {favorites, addFavorite } = useContext(FavoriteContext);
    const [NewProducts, setNewproducts]=useState([]);
    const [isError, setisError]=useState("");

    const{categoryName}= useParams();
    console.log(categoryName);
  useEffect(() =>{
        const NewProductsFetch = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/products/latest`);
                const data = await res.json();    
                    if(!res.ok){
                        setisError(data.error || "Hämtningen gick fel");
                        setNewproducts([]);
                        return;
                    }
               
                    setNewproducts(data);
                    setisError("");
            } catch (error) {
            console.error("NewsPage: fel vid hämtning av kategorier:", error);
            setisError("Kunde inte hämta produkterna");
            }
        };
        NewProductsFetch();
    }, [categoryName]);


    
    const title = categoryName;

    return(
        <>
          {isError ? (
                 <div className="text-center text-red-600 mt-10 text-xl">{isError}</div>
                
            ) : (
            <GridCardSection 
                title={title} 
                products={NewProducts} 
        />
         )}
         </>
    )
}
export default News;