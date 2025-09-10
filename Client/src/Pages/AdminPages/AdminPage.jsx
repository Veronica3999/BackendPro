
import { NavLink } from 'react-router';
import tunna from '../../assets/Img/delete-icon.png';
import { useState, useEffect } from 'react';


function AdminPage(){

const[products, setproducts] = useState([]);
const[message, setmessage] = useState();
const[textStatus, settextStatus] = useState();


const productsFetch = async () =>{
    try{
        const res = await fetch("http://localhost:8000/api/products");
        const data = await res.json();
        setproducts(data);
    }
    catch(error){
        setmessage("Kunde inte hämta produkterna");
    }
}; 

useEffect(()=>{
        if(message){
            const timer = setTimeout(()=>{
                setmessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
        },[message]);


useEffect(()=>{
        productsFetch();
    },[]);


const handleDelite = async(id)=>{
    try{
        const res = await fetch(`http://localhost:8000/api/products/delete/${id}`,{
            method:"DELETE"
        });
        const resMsg = await res.json();
            if(!res.ok){
                setmessage(resMsg.error);
                settextStatus("error");
                return;
            }
            setproducts(products.filter(product=>product.id !== id))
            setmessage(resMsg.message);
            settextStatus("success");
        }
    catch(error){
         console.log("Kunde inte radera kategorin", error);
            settextStatus("error");
    }

console.log(id);
};










   

    return(
        <main className="p-10">
            <div className="flex justify-between">
                <h2 className="inline text-xl font-bold">Produkter</h2>
                <NavLink
                    to='/admin/products/new'
                    className="text-lg px-4 py-2 rounded bg-gray-400 hover:bg-blue-700 hover:text-white">Ny produkt
                    </NavLink>
            </div>
            <table className='mt-[20px] w-full table-auto border-collapse'>
                <thead className='border'>
                    <tr className='bg-gray-100'>
                        <th scope="col" className='border-r text-left px-4 py-2'>Namn:</th>
                        <th scope="col" className='border-r text-left px-4 py-2'>SKU:</th>
                        <th scope="col" className='border-r text-left px-4 py-2'>Pris:</th>
                        <th scope="col" className='w-12 px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {products.map(product =>(
                    <tr 
                        className='odd:bg-gray-100 even:bg-blue-50 hover:bg-indigo-200 transition-colors '
                        key={product.id}>
                            <td className=' border-r px-4 py-2 '>{product.productName}</td>
                            <td className='border-r px-4 py-2 '>{product.sku}</td>
                            <td className='border-r px-4 py-2 '>{product.price}</td>
                            <td>
                                <button 
                                    type="submite" 
                                    className='inline-flex p-2 rounded  hover:bg-gray-400'
                                    onClick={()=>handleDelite(product.id)} >
                                    <img src={tunna} alt="Radera" className='w-5 h-5' />
                                </button>
                            </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
export default AdminPage;