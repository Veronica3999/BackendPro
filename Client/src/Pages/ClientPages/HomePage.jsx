import {Link } from 'react-router';
import {useState, useEffect, useContext} from 'react';
import Hero from '../../assets/Components/Hero/Hero';
import InfoSpots from "../../assets/Components/Spots/Spots.jsx";
import { FavoriteContext } from '../../Context/FavoriteContext.jsx';


function Home(){
    const [products, setproducts]=useState([]);
    const {favorites, addFavorite } = useContext(FavoriteContext);
    
    useEffect(()=>{
            fetch("http://localhost:8000/api/products")
            .then(res=>res.json())
            .then(products=>{
                setproducts(products)
    
    })
    .catch(error=>console.error("Problem vid fetching av produkter i Homepage:", error));
  },[]);

    function isNew(publishDate){
        const today = new Date();
        const published = new Date(publishDate);
        const diffrensInTime = today - published;
        const days = diffrensInTime /(1000 * 60 * 60* 24);
            return days <= 7;
    }


    return(
        <>
        <Hero />
        <InfoSpots />
         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-1">                
            {products.slice(0, 8).map((product) => (    
            <article
                key={product.id} 
                className="my-10 sm:my-5">
                    <div className="">
                        <div className="relative p-6 lg:p-2">
                            {isNew(product.publishDate) && (
                                <div 
                                className='absolute top-9 left-9 bg-blue-200 py-3 px-3 rounded text-xl
                                lg:top-5 lg:left'>Nyhet</div>
                            )}
                            <Link to={`/products/${product.id}/${product.slug}`}>
                                <img src={product.image} alt={product.name} className="w-full object-cover" />
                            </Link>
                            <button className='absolute bottom-10 right-10 lg:bottom-5 lg:right-5'>
                                <svg 
                                    className="cursor-pointer"
                                    width="44"
                                    height="44"
                                    viewBox='0 0 24 24'
                                    onClick={()=>addFavorite(product)}
                                    
                                    style={{
                                        fill: favorites.some(fav => fav.id === product.id) ? "red" : "none",
                                        stroke: "black",
                                        strokeWidth: "2",
                                    }}>
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="
                            flex justify-between flex-wrap px-10
                            sm:px-8
                            lg:px-3">
                                <h3 className="
                                    text-2xl inline-block
                                    sm:text-xl
                                    ">{product.name}</h3>
                                <span className="text-xl">{product.price} kr</span>
                        </div>
                        <span className="block px-10 mt-3 lg:px-4">{product.brand}</span>
                    </div>
                </article>
            ))}
        </section>
        </>
    );
}
export default Home;