import { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export function FavoriteProvider({children}){
    const [favorites, setfavorites] = useState([]);

    //läser in lagrade favoriter i sessionStorage
    useEffect(() => {
            const storedfavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
            setfavorites(storedfavorites);
        },[]);

        //Sparar till sessionStorage varje gång favorites ändras
    useEffect(()=>{
        sessionStorage.setItem("favorites", JSON.stringify(favorites));

    },[favorites]);

    // Lägger till favorit
    const addFavorite = async (product) =>{
        
        setfavorites((prev) => [...prev, {...product}]);

        const token = sessionStorage.getItem("token");
            if(token){
                try{
                    //skicka till bakend för att spara
                    const res = await fetch("http://localhost:8000/api/favorites",{
                        method: "POST",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        },
                        body: JSON.stringify({productID: product.id})
                    });  
                }
                catch(error){
                    console.error("Kunde inte spara i DB", error);
                }
            }
        };

        //Tar bort en favorit
    const removeFavorite = async(productId) =>{
        setfavorites((prev) => prev.filter((item) => item.id !== productId));
            const token = sessionStorage.getItem("token");
                if(token){
                    try{
                        await fetch(`http://localhost:8000/api/favorites/${productId}`,{
                            method: "DELETE",
                            headers:{
                                "Authorization" : `Bearer ${token}`
                            }
                    });
                    }catch(error){
                        console.error("Kunde inte radera favorit från DB", error);
                    }
                }
        };
    
return(
    <FavoriteContext.Provider value ={{favorites, addFavorite, removeFavorite}}>
        { children}
    </FavoriteContext.Provider>
 );
};
