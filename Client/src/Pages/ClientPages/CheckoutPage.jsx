import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import tunna from '../../assets/Img/delete-icon.png';
import { CartContext } from "../../Context/CartContext";

function CheckoutPage(){
    const navigate = useNavigate();
    const{ cart, updateQty } = useContext(CartContext);
    const [isLargeScreen, setIsLargeScreen]=useState(window.innerWidth >= 640);
    const [message, setmessage]= useState("");
    const [textStatus, settextStatus]= useState("");
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        
        useEffect(() => {
            document.title ="Kassan";
        },[]);

        useEffect(()=>{
            const handleResize = ()=>{
                setIsLargeScreen(window.innerWidth >= 640);
        };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        },[]);

        useEffect(()=>{
            if(!message){
                return;
            }

            const timer =setTimeout(() => {
                setmessage("");
                settextStatus("");
            }, 3000);
            return () => clearTimeout(timer);
        },[message]);




      const [formData, setformData]= useState({
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            zip: "",
            city: "",
            newsLetter: false,
        });
        const toBuy = async (event)=>{
            event.preventDefault();
    
        try{
            let{firstName, lastName, street,zip, city} = formData;
            firstName= firstName.trim();
            lastName= lastName.trim();
            street= street.trim();
            zip= zip.trim();
            city= city.trim();
            if(!firstName){
                setmessage("Förnamn saknas");
                settextStatus("false");
                return;
            };
            if(!lastName){
                setmessage("Efternamn saknas");
                settextStatus("false");
                return;
            };
            if(!street){
                setmessage("Gatunamn saknas");
                settextStatus("false");
                return;
            };
            if(!zip || isNaN(Number(zip))){
                if(isNaN(Number(zip))){
                    setmessage("Endast siffror i postnumret");
                    settextStatus("false");
                    return;
                }
                if(!zip){
                    setmessage("Postnummer saknas");
                    settextStatus("false");
                    return;
                }

            };
            if(!city){
                setmessage("Stad saknas");
                settextStatus("false");
                return;
            };
            

            const res = await fetch("http://localhost:8000/api/checkout", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({...formData , cart,totalPrice})
            });

            const msg = await res.json();
                if(!res.ok){
                    setmessage(msg.error);
                    settextStatus("false");
                    return;
                }
            setmessage(msg.message);
            settextStatus("true");
            setformData({
                firstName: "",
                lastName: "",
                email:"",
                street: "",
                zip: "",
                city: "",                   
                newsLetter: false,
                    
                });
                
        }catch(error){
            setmessage("Något gick fel");
            settextStatus("false");
        }
        navigate("/order/Confirmation");

        console.log(formData);
}

       
        

 


            return(
                <section className='mt-20'>
                    <h2 className='text-center text-2xl mb-10'>Kassan</h2>
                {!isLargeScreen ? (
                    <div>
                    {cart.map((Item) => (
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
                                    onChange={(e)=> updateQty(Item.id, e.target.value)}
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
                    {cart.map((item) =>(
                        <tr 
                            key={item.id} 
                            className='odd-bg-gray-200 even:bg-gray-50 hover:bg-gray-400 cursor-pointer'>
                                <td className='p-2 border-r'>{item.name}</td>
                                <td className='p-2 text-end border-r'>{item.price} kr</td>
                                <td className='p-2 text-end border-r'>{(Number(item.price) * Number(item.qty) || Number(item.price)) } kr</td>
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
                            <button>
                                <img src={tunna} alt="Radera" className='w-5 h-5' />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                <tfoot className="border-t">
                    <tr>
                        <td colSpan="2" className="p-2">Att betala:</td>
                        <td colSpan="2" className="flex justify-end pt-2 pr-2">{totalPrice} kr</td>
                        
                    </tr>
                </tfoot>
            </table>
            )}

    {/* Kund uppgifter */}    
            <section className="mt-20 p-2">
                <h3 className="text-center text-2xl mb-10">Kunduppgifter</h3>
                <form method="post"
                className="sm:flex flex-wrap gap-2">
                {/* Förnamn */}
                    <div className="flex flex-col sm:w-[49%] lg:max-w-[400px]">
                            <label 
                                htmlFor="firstName"
                                className="text-xl mb-4">
                                Förnamn
                            </label>
                            <input
                                id="firstName" 
                                type="text" 
                                value={formData.firstName}
                                onChange={(e) => setformData({...formData, firstName: e.target.value})}
                                className="border text-lg p-2"
                                placeholder="Förnamn"
                            />
                    </div>
                {/* Efternamn */}
                    <div className="flex flex-col sm:w-[49%] lg: max-w-[400px]">
                        <label 
                            htmlFor="lastName"
                            className="text-xl my-4 sm:my-0 sm:mb-4">
                            Efternamn
                        </label>
                        <input 
                            id="lastName"
                            type="text" 
                            value={formData.lastName}
                                onChange={(e) => setformData({...formData, lastName: e.target.value})}
                            className="border text-lg p-2"
                            placeholder="Efternamn"
                        />
                    </div>
                {/* E-post */}
                    <div className="
                        flex flex-col sm:w-[49%] lg:w-full
                        ">
                        <label 
                            htmlFor="email"
                            className="text-xl my-4">
                            E-post
                        </label>
                        <input 
                            id="email"
                            type="text"
                            value={formData.email}
                                onChange={(e) => setformData({...formData, email: e.target.value})} 
                            className="border text-lg p-2 lg:w-[500px]"
                            placeholder="E-post"
                        />
                    </div>
            {/* Adressfält */}
                    <fieldset className="border mt-10 p-3 w-full">
                        <legend>Adress</legend>
                {/* Gata */}
                    <div className="flex flex-col">
                        <label 
                            htmlFor="street"
                            className="text-xl mt-4">
                            Gata
                        </label>
                        <input 
                            id="street"
                            type="text"
                            value={formData.street}
                                onChange={(e) => setformData({...formData, street: e.target.value})} 
                            className="border text-lg p-2"
                            placeholder="Gata"
                        />
                    </div>
                {/* Zip */}
                    <div className="flex flex-col sm: max-w-[200px]">
                        <label 
                            htmlFor="zipcode"
                            className="text-lg mt-4">
                            Postnummer
                        </label>
                        <input 
                            id="zipcode"
                            type="text"
                            value={formData.zip}
                            onChange={(e) => setformData({...formData, zip: e.target.value})} 
                            className="border text-xl p-2"
                            placeholder="Postnummer"
                        />
                    </div>
                {/* City */}
                    <div className="flex flex-col sm:max-w-[350px]">
                        <label 
                            htmlFor="city"
                            className="text-xl mt-4">
                            Stad
                        </label>
                        <input 
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => setformData({...formData, city: e.target.value})} 
                            className="border text-lg p-2"
                            placeholder="Stad"
                        />
                    </div>
                    </fieldset>
                {/* check Newsletter */}
                <div className="mt-4 pl-4">
                    <label htmlFor="newsletter"></label>
                    <input 
                        type="checkbox"
                        value={formData.newsLetter}
                        onChange={(e) => setformData({...formData, newsLetter: e.target.checked})} /> Jag vill ta emot nyhetsbrev
                </div>
                        
                </form>
             </section>
             
            <div className='mt-20 flex justify-center'>
                <div className="relative">
                {message && (<p className={"absolute bottom-20 w-[300px] text-center rounded p-2 bg-red-200"}>{message}</p>)}
                </div>
                <button 
                    onClick={toBuy}
                    className='text-xl bg-blue-100 p-4 rounded-xl w-[300px] hover:bg-blue-200 hover:shadow-lg transform active:scale-95 transition ease-in-out'>Köp
                </button>
            </div>
            </section>
            );
}
export default CheckoutPage;