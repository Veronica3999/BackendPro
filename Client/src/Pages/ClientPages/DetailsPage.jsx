import { useContext, useEffect, useState } from "react";
import {Link} from "react-router";
import { useParams } from "react-router";
import { ChevronLeft } from "lucide-react"; //till pilarna i similar
import { ChevronRight } from "lucide-react";//till pilarna i similar
import { CartContext } from "../../Context/CartContext";
import { FavoriteContext } from "../../Context/FavoriteContext";



function Details(){
    const { addToCart } = useContext(CartContext);
    const {favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
    const {slug}=useParams();

    const[product, setproduct]=useState([]);
    const[isError, setisError]=useState("");
    const[similars, setsimilars]=useState([]);
      document.title=product.slug;
    useEffect(() => {
        const getDetailsFetch = async () =>{
            try{
                const res = await fetch(`http://localhost:8000/api/products/${slug}`);
                const data = await res.json();

                if(!res.ok){
                    setisError(data.error || "Produkten hittades inte.")
                    return;
                }
                setproduct(data.product);
                setsimilars(data.similars);

            }catch(error){
                setisError("server breakdown =) soon it will burn up!!")
            }
        };
        getDetailsFetch();
    },[slug]);

    if (isError) return <div>{isError}</div>;
    if (!product) return <div>Laddar...</div>;











    return(
<>        
    <section className="mb-10">
            <article className="my-20 sm:flex sm:flex-row">
                        <div className="relative p-15 sm:w-[49%] sm:p-2 lg:p-2">
                                <Link to="">
                                    <img src={product.image} alt={product.name} className="w-full object-cover" />
                                </Link>
                                <svg 
                                className="absolute bottom-18 right-18 cursor-pointer
                                    sm:bottom-6 sm:right-6"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                  onClick={()=>{
                                        if(favorites.some(fav => fav.id === product.id)){
                                            removeFavorite(product.id)
                                        }else{
                                            addFavorite(product)
                                        }
                                    }}
                
                                style={{
                                    fill: favorites.some(fav => fav.id === product.id) ? "red" : "none",
                                    stroke: "black",
                                    strokeWidth: "2",
                                }}>
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                        </div>
                        <div className="px-20
                                sm:inline sm:w-[49%] sm:px-5 sm:pt-6
                                lg:px-3">
                                    <h3 className="
                                        text-2xl inline-block
                                        sm:text-xl
                                        ">{product.name}</h3>
                                        <span className="block mt-3 lg:px-4">{product.brand}</span>
                            <p className="
                                    block mt-10
                                    sm:mt-5">{product.description}
                            </p>
                            <span className="text-xl block mt-10 sm:mt-5">{product.price} SEK</span>
                            <button
                            onClick={ ()=> addToCart(product)} 
                            className="bg-blue-100 mt-10 p-4 w-[400px] rounded-2xl text-xl
                                sm:w-[200px] sm:mt-5 hover:bg-blue-200 hover:shadow-lg transform  active:scale-95 transition ease-in-out">Lägg i varukorg</button>
                        </div>
            </article>
    </section>




{/**SIMILAR */}
            <section className="hidden sm:block relative">
               <p className="text-center text-2xl mb-4">Liknande Produkter</p> 
                
            <button className="absolute top-1/2 -translate-y-1/2 rounded-full hover:bg-blue-100"><ChevronLeft className="w-8 h-8" /></button>
            <button className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full hover:bg-blue-100"><ChevronRight className="w-8 h-8" /></button>
        
            <div className="flex flex-row overflow-x-auto gap-2 hide-slide">
                {similars.map((similar) => (                 
                    <article key={similar.id} className=" sm:min-w-[33%] max-w-[33%] lg:min-w-[33%] xl:min-w-[33%]">
                        <div className=" p-1 relative">
                            <Link to={`/products/${similar.slug}`}
                            state={{id: similar.id}}>
                                <img src={similar.image} alt={similar.productName} className="w-full object-cover" 
                                />
                            </Link>
                            <svg 
                                className="sm:absolute sm:cursor-pointer sm:bottom-3 sm:right-3"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                  onClick={()=>{
                                        if(favorites.some(fav => fav.id === similar.id)){
                                            removeFavorite(similar.id)
                                        }else{
                                            addFavorite(similar)
                                        }
                                    }}
                
                                style={{
                                    fill: favorites.some(fav => fav.id === similar.id) ? "red" : "none",
                                    stroke: "black",
                                    strokeWidth: "2",
                                }}>
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                        </div>
                        <div className="
                            flex justify-between p-1
                            ">
                                <h3 className="
                                    text-lg inline-block pl-1
                                    ">{similar.name}</h3>
                                <span className="text-lg pr-3">{similar.price} SEK</span>
                        </div>
                        <span className="block px-2 mt-3">{similar.brand}</span>
                </article>
                ))}

            </div>
            
            </section>
</>
    )
}
export default Details;