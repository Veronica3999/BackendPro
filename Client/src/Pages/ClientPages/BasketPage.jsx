import { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router';
import tunna from '../../assets/Img/delete-icon.png';
import { CartContext } from "../../Context/CartContext.jsx";


function BasketPage(){
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen]=useState(window.innerWidth >= 640);
    
    const { cart, removeFromCart, updateQty } = useContext(CartContext);

        useEffect(()=>{
            document.title = "Varukorg";
        },[]);

        useEffect(()=>{
            const handleResize = ()=>{
                setIsLargeScreen(window.innerWidth >= 640);
        };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        },[]);

    const toStartSide = () =>{
        navigate("/");
    };
    const toCheckout = ()=>{
        navigate("/checkout");
    };


            return(
                <section className='mt-20'>
                    <h2 className='text-center text-3xl mb-10'>Varukorgen</h2>
                {cart.length === 0 ?(
                    <div>
                        <p className='text-xl w-full text-center'>Du har inget i varukorgen.</p>
                        <div className='flex justify-center mt-10'>
                            <button
                            onClick={toStartSide}
                                className='text-xl bg-blue-100 p-4 rounded-xl w-[300px] hover:bg-blue-200 hover:shadow-lg transform  active:scale-95 transition ease-in-out'>Fortsätt Shoppa
                            </button>
                        </div>
                    </div>
                ) : !isLargeScreen ? (
                    <div>
                        {cart.map((Item) => (
                            <div className="w-full p-5 border
                                key={Item.id}">
            
                                <div className="flex flex-wrap py-2">
                                        <div className="flex-1 text-xl pb-3">{Item.name}</div>
                                        <div className="w-[49%] text-right text-xl pr-7">{(Number(Item.price) * Number(Item.qty )) } kr </div>
                                        <div className="w-[49%] p-1">{Item.price} kr</div>
                                        <div className="w-[49%] text-right flex items-end justify-end">
                                    <select 
                                        value={Item.qty}
                                        onChange={(e)=> updateQty(Item.id, e.target.value)}
                                        className='bg-gray-300 rounded text-xl'>
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
                                    <button onClick={() => removeFromCart(Item.id)} className='pl-4 text-end'>
                                        <img src={tunna} alt="Radera" className='w-6 h-6' />
                                    </button>
                                </div>
                            </div>
                    </div>
             ))}
             <div className='flex justify-center mt-5'>
                <button 
                    onClick={toCheckout}
                    className=' text-xl bg-blue-100 p-4 rounded-xl w-[300px] hover:bg-blue-200 hover:shadow-lg transform  active:scale-95 transition ease-in-out'>Till kassan
                </button>
            </div>
             </div>
            ) : (
                <>            <table className='w-full text-xl border'>
                <thead className='bg-gray-400 '>
                    <tr>
                        <th scope='col' className='border'>Produkt</th>
                        <th scope='col' className='border'>Pris</th>
                        <th scope='col' className='border'>Totalt</th>
                        <th scope='col' className='border'>Antal</th>
                    </tr>
                </thead>
                <tbody className='bg-gray-300'>
                    {cart.map((item) =>(
                        <tr 
                            key={item.id} 
                            className='odd-bg-gray-200 even:bg-gray-50 hover:bg-gray-400 cursor-pointer'>
                                <td className='p-2 border-r'>{item.name}</td>
                                <td className='p-2 text-end border-r'>{item.price} kr</td>
                                <td className='p-2 text-end border-r'>{item.price * item.qty} kr</td>
                                <td className='p-2 flex justify-center gap-4'>
                            <select 
                                value={item.qty}
                                onChange={(e)=> updateQty(item.id, e.target.value)}
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
                            <button onClick={()=> removeFromCart(item.id)}>
                                <img src={tunna} alt="Radera" className='w-5 h-5' />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
               <div className='mt-10 flex justify-center'>
                <button 
                    onClick={toCheckout}
                    className='text-xl bg-blue-100 p-4 rounded-xl w-[300px] hover:bg-blue-200 hover:shadow-lg transform  active:scale-95 transition ease-in-out'>Till kassan
                </button>
            </div>
            </>
            )}
            </section>
            );
        }
export default BasketPage;