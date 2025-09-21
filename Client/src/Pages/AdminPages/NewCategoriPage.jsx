import { useEffect, useRef, useState } from "react"

function NewCategoriPage(){

    const [newCategory, setnewCategory]= useState({
        categoryName:"",
        categoryImage: null,
    });
    const [message, setMessage] = useState("");
    const[isError, setIsError] = useState(false);

    const fileInputReset=useRef(null);

    useEffect(()=>{
        if(message){
            const timer = setTimeout(()=>{
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
        },[message]);

    const handleInputChange=(event)=>{
        const {name,value,files}=event.target;

        setnewCategory({
            ...newCategory,
            [name]:files ? files[0] : value,
        });
        };

        const sendCategory= async (event)=>{

            event.preventDefault();
            
            if(!newCategory.categoryName){
                setMessage("Namn saknas");
                setIsError(true);
                return;
            }
            if(newCategory.categoryName.length>25){
                setMessage("Kategorin får max ha 25 tecken");
                setIsError(true);
                return;
            }

            const formData = new FormData();
                formData.append("categoryName",newCategory.categoryName);
                    if(newCategory.categoryImage){
                        formData.append("categoryImage", newCategory.categoryImage);
                    }

                    try{
                        const token = sessionStorage.getItem("token");

                        const response = await fetch("http://localhost:8000/api/new/categories",{
                            method: 'POST',
                            headers:{
                                "Authorization":`Bearer ${token}`
                            },
                            body: formData,
                    });
                    const messageToUser = await response.json();
                    
                    if(!response.ok){
                        setMessage(messageToUser.error || "fel");
                        setIsError(true);
                    }else{
                        setMessage(messageToUser.message || "skapad");
                        setIsError(false);
                    }
                        setnewCategory({
                            categoryName:"",
                            categoryImage:null,
                    });
                        if(fileInputReset.current){
                            fileInputReset.current.value="";
                        }
                    }
                    catch(error){
                        setMessage('Fel vid skick');
                        setIsError(true);
                    }
        };


   return(
    <section className="p-5 relative">
        <h2 className="pb-5 text-xl">Ny kategori</h2>

        <form 
            onSubmit={sendCategory}
            encType="multipart/form-data" 
            className="space-y-4">
            <div className="grid gap-1">
                <label htmlFor="categoryName" className="text-xl">Namn</label>
                    <input 
                    id="categoryName"
                    type="text" 
                    name="categoryName"
                    value={newCategory.categoryName}
                    placeholder="Namn:"
                    onChange={handleInputChange}
                    className="border rounded px-3 py-2"
                    />
            </div>
            <div className="grid gap-1">
                <label htmlFor="categoryImage">Bild:</label>
                    <input 
                    type="file"
                    onChange={handleInputChange}
                    name="categoryImage"
                    accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                    ref={fileInputReset}
                    className="inline-block cursor-pointer rounded-xl bg-blue-200 px-4 py-2 w-40 hover:bg-blue-100 border rounded px-3 py-2"
                    />
            </div>
        <div className="mt-20">
            <button type="submit" className="border bg-blue-100 px-6 py-3 rounded-xl hover:bg-blue-300 shadow active:translate-y-1 active:shadow-inner transition">Skapa</button>
        </div>
     </form>
       {message && (
        <p
          className={`mt-4 p-2 border rounded absolute top-57 ${
            isError
              ? "bg-red-100 text-red-800 border-red-300" 
              : "bg-green-100 text-green-800 border-green-300"
          }`}
        >
          {message}
        </p>
          )}
    </section>
   )
        
}
export default NewCategoriPage