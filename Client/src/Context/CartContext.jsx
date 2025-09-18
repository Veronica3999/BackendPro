
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({children}){
    const [cart, setcart] =useState([]);

    //läser från localstorage vid start
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setcart(storedCart);
    },[]);

        //sparar till localstorage när cart ändras
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
    },[cart]);


//lägger till produkt
const addToCart = (product) =>{
    setcart((prev) => {
        const existing = prev.find((item) => item.id ===product.id);
            if(existing){
                return prev.map((item) =>
                item.id === product.id
                    ? {...item, qty : item.qty + 1} : item
            );
            }
        return[...prev,{...product, qty: 1}];
    });
};

//Ta bort produkt
const removeFromCart = (id) => {
    setcart((prev) => prev.filter((item)=> item.id !==id));
};

//Ändra antal
const updateQty = (id, qty) =>{
    setcart((prev) => prev.map((item) => item.id ===id ? { ...item, qty : Number(qty) } : item)
    );
};

 return(
    <CartContext.Provider value ={{cart,addToCart,removeFromCart,updateQty}}>
        { children}
    </CartContext.Provider>
 );  
}