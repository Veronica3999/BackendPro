import { useContext } from "react";
import { FavoriteContext } from "../../../Context/FavoriteContext";
import { Link } from "react-router";

function GridCardProducts({ id ,name, price, brand, image, slug}){
    const {favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
    const favoritProduct= {id, name, price, brand, image, slug}
    return(
        <article className="my-10 sm:my-5">
                    <div className="">
                        <div className="relative p-6 lg:p-2">
                            <Link to={`/products/${slug}`}>
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="w-full object-cover" />
                            </Link>
                            <svg 
                                className="absolute bottom-10 right-10 cursor-pointer lg:bottom-5 lg:right-5"
                                width="44"
                                height="44"
                                viewBox='0 0 24 24'
                                 onClick={()=>{
                                        if(favorites.some(fav => fav.id === favoritProduct.id)){
                                            removeFavorite(favoritProduct.id)
                                        }else{
                                            addFavorite(favoritProduct)
                                        }
                                    }}
                                
                                style={{
                                    fill: favorites.some(fav => fav.id === favoritProduct.id) ? "red" : "none",
                                    stroke: "black",
                                    strokeWidth: "2",
                            }}>
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <div className="
                            flex justify-between flex-wrap px-10
                            sm:px-8
                            lg:px-3">
                                <h3 className="
                                    text-2xl inline-block
                                    sm:text-xl
                                    ">{name}
                                </h3>
                                <span 
                                    className="text-xl">{price} SEK
                                </span>
                        </div>
                        <span 
                            className="
                                block px-10 mt-3 
                                lg:px-4">{brand}
                        </span>
                    </div>
                </article>
    )

}
export default GridCardProducts;