import { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export function FavoriteProvider({children}){
    const [favorites, setfavorites] = useState([]);

    useEffect(() => {
            const storedfavorites = JSON.parse(localStorage.getItem("favorite")) || [];
            setfavorites(storedfavorites);
        },[]);

    useEffect(()=>{
        localStorage.setItem("favorites", JSON.stringify(favorites));
    },[favorites]);

    const addFavorite = (product) =>{
        setfavorites((prev) => {
            const existing = prev.find((item) => item.id === product.id);
                if(existing){
                    return prev.filter((item) => item.id !== product.id);
                }
            return [...prev, {...product}];
        });
    };
    
return(
    <FavoriteContext.Provider value ={{favorites, addFavorite}}>
        { children}
    </FavoriteContext.Provider>
 );
};
