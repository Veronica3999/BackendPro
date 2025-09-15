
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import GridCardSection from '../../assets/Components/GridCardSection/GridCardSection';

function Categori(){
    const [productCategories, setproductCategories]=useState([]);
    const [isError, setisError]=useState("");

    const{ categoryName}= useParams();

console.log(typeof(categoryName));
console.log("front:",categoryName);
  useEffect(() =>{
        const CategoryProductsFetch = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/products/category/${categoryName}`);
                const data = await res.json();
                    if(!res.ok){
                        setisError(data.error || "Hämtningen gick fel");
                        setproductCategories([]);
                        return;
                    }
               
                    setproductCategories(data);
                    setisError("");
            } catch (error) {
            console.error("CategoriePage: fel vid hämtning av kategorier:", error);
            setisError("Kunde inte hämta produkterna");
            }
        };
        CategoryProductsFetch();
    }, [categoryName]);
console.log("detta hämtades till catPage",productCategories);

    
const title = categoryName;




    return(
        <>
            {isError ? (
                 <div className="text-center text-red-600 mt-10 text-xl">{isError}</div>
                
            ) : (
               <GridCardSection 
                title={title} 
                products={productCategories} 
            />
            )}
        </>
    )
}
export default Categori;