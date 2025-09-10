import { NavLink } from 'react-router';
import tunna from '../../assets/Img/delete-icon.png';
import { useState } from 'react';
import { useEffect } from 'react';
function CategoriPage(){

   const [categories, setcategories]=useState([]);
   const [message, setmessage]=useState("");
   const [textStatus, settextStatus]=useState("");

   const categoriesFetch = async()=>{
    try{
        const res = await fetch("http://localhost:8000/api/categories");
        const data = await res.json();
        setcategories(data);
        }
        catch(error){
        setmessage("Kunde inte hämta kategorier");
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
        categoriesFetch();
    },[]);
   
   const handleDelite= async(id) =>{
        try{
            const res = await fetch (`http://localhost:8000/api/delete/categories/${id}`,{
                method: "DELETE",
            });
            const resMsg = await res.json();
            if(!res.ok){
                setmessage(resMsg.error);
                settextStatus("error");
                return;
            }
            setcategories(categories.filter(cat=>cat.categoryID !== id))
            setmessage(resMsg.message);
            settextStatus("success");
        }
        catch (error){
            console.log("Kunde inte radera kategorin", error);
            settextStatus("error");
        }
   };

    return(
        <section >
            <div className="p-10">
            <div className="flex justify-between">
                <h2 className="inline text-xl font-bold">Kategorier</h2>
                <NavLink
                    to='/admin/categories/new' 
                    className="text-lg px-4 py-2 rounded bg-gray-400 hover:bg-blue-700 hover:text-white">Ny kategori
                </NavLink>
            </div>
            <table className='mt-[20px] w-full table-auto border-collapse'>
                <thead className='border h-12'>
                    <tr className='bg-gray-100'>
                        <th scope="col" className='bg-gray-200 text-left px-4 py-2'>Namn</th>
                        <th scope="col" className='bg-gray-200 w-12 px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {categories.map(category => (
                        <tr 
                        className='odd:bg-gray-100 even:bg-blue-50 hover:bg-indigo-200 transition-colors '
                        key={category.categoryID}>
                            <td className=' border-r px-4 py-2 '>{category.categoryName}</td>
                            <td>
                                <button 
                                    type="submite"
                                    onClick={()=>handleDelite(category.categoryID)} 
                                    className='inline-flex p-2 rounded  hover:bg-gray-400'>
                                    <img src={tunna} alt="Radera" className='w-5 h-5' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                    {message && (
                <p
                className={`p-1 border rounded absolute top-50 right-20 ${
                    textStatus==="success"
                    ? "bg-green-100 text-green-800 border-green-300" 
                    : "bg-red-100 text-red-800 border-red-300"
                }`}
                >
                {message}
                </p>
                    )}
            </div>
        </section>
    )
}
export default CategoriPage;