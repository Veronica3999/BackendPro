import GridCardSection from "../../assets/Components/GridCardSection/GridCardSection";
import{ useState, useEffect } from 'react';



function News(){
    useEffect(()=>{
        document.title = "Freaky Fashion";
    },[]);


    const [NewProducts, setNewproducts]=useState([]);
    const [isError, setisError]=useState("");

  useEffect(() =>{
        const NewProductsFetch = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/products/latest/new`);
                const data = await res.json();    
                    if(!res.ok){
                        setisError("Hämtningen gick fel");
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
    }, []);


    
    const title = "Nyheter";

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