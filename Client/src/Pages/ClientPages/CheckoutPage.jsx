import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import tunna from '../../assets/Img/delete-icon.png';

function CheckoutPage(){
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen]=useState(window.innerWidth >= 640);
    const [cartItems, setcartItems] = useState([]);

    useEffect(() => {
        setcartItems([
            { id: 1, name: "Svart t-shirt", price: 299, brand: "Levis", image: "https://placehold.co/400x600", categori:"Tröja" },
            { id: 2, name: "Kategori", price: 599, brand: "Nike", image: "https://placehold.co/400x600", categori:"Tröja"},
            { id: 3, name: "Jeansjacka", price: 799, brand: "Wrangler", image: "https://placehold.co/400x600" ,categori:"Tröja" },
            { id: 4, name: "Sneakers", price: 999, brand: "Adidas", image: "https://placehold.co/400x600", categori:"Tröja" },
            { id: 5, name: "Blå T-shirt", price: 999, brand: "Nike", image: "https://placehold.co/400x600", categori:"skor" },
            { id: 6, name: "Orange T-shirt", price: 999, brand: "Adidas", image: "https://placehold.co/400x600", categori:"skor" },
        ])

    },[]);

        useEffect(()=>{
            const handleResize = ()=>{
                setIsLargeScreen(window.innerWidth >= 640);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        },[]);

const handleQtyChange =(id, qty)=>{
    setcartItems((prev)=>
            prev.map((item) =>
                item.id === id ? {...item, qty: Number(qty) } : item
        )
    );
};

    const toBuy = ()=>{
        navigate("/order/confirmation");
    };


            return(
                <section className='mt-20'>
                    <h2 className='text-center text-2xl mb-10'>Kassan</h2>
                {!isLargeScreen ? (
                    <div>
                    {cartItems.map((Item) => (
                    <div 
                    className="w-full p-5 border"
                    key={Item.id}>
            
                        <div className="flex flex-wrap py-2">
                            <div className="flex-1 text-xl pb-3">{Item.name}</div>
                            <div className="w-[49%] text-right text-xl pr-7">{(Number(Item.price) * Number(Item.qty) || Number(Item.price)) } kr </div>
                            <div className="w-[49%] p-1">{Item.price} kr</div>
                            <div className="w-[49%] text-right flex items-end justify-end">
                                <select 
                                    value={Item.qty}
                                    onChange={(e)=> handleQtyChange(Item.id, e.target.value)}
                                    className='bg-gray-300 rounded text-xl'>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                </select>
                            <button className='pl-4 text-end'>
                                <img src={tunna} alt="Radera" className='w-6 h-6' />
                            </button>
                        </div>
                    </div>
                   
            </div>
             ))}
             </div>
            ) : (
            <table className='w-full text-xl border'>
                <thead className='bg-gray-400 '>
                    <tr>
                        <th scope='col' className='border'>Produkt</th>
                        <th scope='col' className='border'>Pris</th>
                        <th scope='col' className='border'>Totalt</th>
                        <th scope='col' className='border'>Antal</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-300'>
                    {cartItems.map((item) =>(
                        <tr 
                            key={item.id} 
                            className='odd-bg-gray-200 even:bg-gray-50 hover:bg-gray-400 cursor-pointer'>
                                <td className='p-2 border-r'>{item.name}</td>
                                <td className='p-2 text-end border-r'>{item.price} kr</td>
                                <td className='p-2 text-end border-r'>{(Number(item.price) * Number(item.qty) || Number(item.price)) } kr</td>
                                <td className='p-2 flex justify-center gap-4'>
                            <select 
                                value={item.qty}
                                onChange={(e)=> handleQtyChange(item.id, e.target.value)}
                                className='bg-white rounded text-xl'>
                                <optgroup>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </optgroup>
                            </select>
                            <button>
                                <img src={tunna} alt="Radera" className='w-5 h-5' />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}

    {/* Kund uppgifter */}    
            <section className="mt-20 p-2">
                <h3 className="text-center text-2xl mb-10">Kunduppgifter</h3>
                <form method="post"
                className="sm:flex flex-wrap gap-2">
                {/* Förnamn */}
                    <div className="
                        flex flex-col 
                        sm:w-[49%]
                        lg:max-w-[400px]">
                            <label 
                                htmlFor="firstName"
                                className="text-xl mb-4"
                                >Förnamn</label>
                            <input
                                id="firstName" 
                                type="text" 
                                className="border text-lg p-2"
                                placeholder="Förnamn"
                            />
                    </div>
                {/* Efternamn */}
                    <div className="
                        flex flex-col
                        sm:w-[49%]
                        lg: max-w-[400px]
                        ">
                        <label 
                            htmlFor="lastName"
                            className="text-xl my-4 sm:my-0 sm:mb-4"
                            >Efternamn</label>
                        <input 
                            id="lastName"
                            type="text" 
                            className="border text-lg p-2"
                            placeholder="Efternamn"
                        />
                    </div>
                {/* E-post */}
                    <div className="
                        flex flex-col
                        sm:w-[49%]
                        lg:w-full
                        ">
                        <label 
                            htmlFor="email"
                            className="text-xl my-4"
                            >E-post</label>
                        <input 
                            id="email"
                          type="text" 
                            className="border text-lg p-2 lg:w-[500px]"
                            placeholder="E-post"
                        />
                    </div>
            {/* Adressfält */}
                    <fieldset className="
                        border mt-10 p-3
                        w-full">
                        <legend>Adress</legend>
                {/* Gata */}
                    <div className="flex flex-col">
                        <label 
                            htmlFor="street"
                            className="text-xl mt-4"
                            >Gata</label>
                        <input 
                            id="street"
                            type="text" 
                            className="border text-lg p-2"
                            placeholder="Gata"
                        />
                    </div>
                {/* Zip */}
                    <div className="
                        flex flex-col
                        sm: max-w-[200px]">
                        <label 
                            htmlFor="zipcode"
                            className="text-lg mt-4"
                            >Postnummer</label>
                        <input 
                            id="zipcode"
                            type="text" 
                            className="border text-xl p-2"
                            placeholder="Postnummer"
                        />
                    </div>
                {/* City */}
                    <div className="
                        flex flex-col
                        sm:max-w-[350px]">
                        <label 
                            htmlFor="city"
                            className="text-xl mt-4"
                            >Stad</label>
                        <input 
                            id="city"
                            type="text" 
                            className="border text-lg p-2"
                            placeholder="Stad"
                        />
                    </div>
                    </fieldset>
                {/* check Newsletter */}
                <div className="mt-4 pl-4">
                    <label htmlFor="newsletter"></label>
                    <input type="checkbox" /> Jag vill ta emot nyhetsbrev
                </div>
                        
                </form>
             </section>
             
            <div className='mt-10 flex justify-center'>
                <button 
                    onClick={toBuy}
                    className='text-xl bg-blue-100 p-4 rounded-xl w-[300px]'>Köp
                </button>
            </div>
            </section>
            );
}
export default CheckoutPage;