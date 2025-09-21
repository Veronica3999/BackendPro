import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

function Newproduct(){
const navigate = useNavigate();

const[message, setmessage]=useState("");
const[categories, setcategories]=useState([]);
const[textStatus, settextStatus]=useState(true);


const [formData,setformData]=useState({
    name: "",
    description: "",
    image: null,
    brand: "",
    sku: "",
    price: "",
    publishDate: "",
    categoryid: "",
    slug:""
});

const handleInputChange = (event) => {
    const {name, value } = event.target;
    setformData({
        ...formData,
        [name]: value,
    })
};

const handleFileChange = (event) =>{
    setformData({ ...formData, image: event.target.files[0]});
};


const sendProduct = async (event)=>{
            event.preventDefault();

        if(!formData.name){
            setmessage("Namn saknas");
            settextStatus(false);  
            return;         
        }

    const slug = formData.name.toLowerCase()
        .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

        const inputData = new FormData();
                        inputData.append("name",formData.name);
                        inputData.append("description",formData.description);
                        inputData.append("image",formData.image);
                        inputData.append("brand",formData.brand);
                        inputData.append("sku",formData.sku);
                        inputData.append("price",formData.price);
                        inputData.append("publishDate",formData.publishDate);
                        inputData.append("categoryid",formData.categoryid);
                        inputData.append("slug", slug);
        

        try{
            const token = sessionStorage.getItem("token");
            
            const res = await fetch("http://localhost:8000/api/products/new", {
                method: "POST",
                headers:{
                    "Authorization":`Bearer ${token}`
                },
                body: inputData,
            });

            const msg = await res.json();
                if(!res.ok){
                    setmessage(msg.error);
                    settextStatus(false)
                    return;
                }
                setmessage(msg.message);
                settextStatus(true);
                setformData({
                    name: "",
                    description: "",
                    image: null,
                    brand: "",
                    sku: "",
                    price: "",
                    publishDate: "",
                    categoryid: "",
                    slug:""
                });

        }catch(error){
            setmessage("Något gick fel");
            settextStatus(false);
        }
        console.log(formData);
}
useEffect(() =>{
    let timer;
        if(message && textStatus){
            timer = setTimeout(() => {
                navigate("/admin/products")
            }, 3000);
        }
        return() => clearTimeout(timer);
        },[message, textStatus, navigate]);   

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
        categoriesFetch();
    },[]);










   return(
    <section className="p-5">
        <h2 className="pb-5 text-xl">Ny produkt</h2>

        <form 
            onSubmit={sendProduct} 
            className="space y-4 relative"
            encType="multipart/form-data">
                <div className="grid gap-1">
                    <label htmlFor="name" className="text-xl">Namn</label>
                        <input 
                        id="name"
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Namn:"
                        className="border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="productDecription">Beskrivning</label>
                        <input 
                        id="description"
                        type="text" 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Beskrivning:"
                        className="border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="productImg">Bild:</label>
                        <input 
                        type="file"
                        onChange={handleFileChange}
                        name="image"
                        className="inline-block cursor-pointer rounded bg-blue-200 px-4 py-2 w-25 hover:bg-blue-100 border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="productBranch">Märke</label>
                        <input 
                        id="brand"
                        type="text" 
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Märke:"
                        className="border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="productSku">SKU</label>
                        <input 
                        id="sku"
                        type="text" 
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="ex. AAA222"
                        className="border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="productPrice">Pris</label>
                        <input 
                        id="price"
                        type="text" 
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Pris:"
                        className="border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="productDate">Publiseringsdatum</label>
                        <input 
                        id="productDate"
                        type="date" 
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2"
                        />
                </div>
                <div className="grid gap-1">
                    <label htmlFor="category">Kategori</label>
                        <select 
                        id="categoryid" 
                        name="categoryid"
                        onChange={handleInputChange}
                        value={formData.categoryid}
                        className="border rounded px-3 py-2"
                        >
                            <option 
                                value="">Välj Kategori</option>
                            {categories.map(category => (
                                <option 
                                    key={category.categoryID} 
                                    value={category.categoryID}
                                    className="capitalize">{category.categoryName}
                                </option>
                            ))}
                        </select>
                
                </div>
                <div className="flex justify-center m-10">
                    <button type="submit" className="border bg-blue-100 px-3 py-3 mt-20 rounded">Lägg till</button>
                </div>
                
                {message && (
                    <p
                    className={`mt-4 p-2 border rounded absolute bottom-25 left-10 lg:left-60 ${
                    textStatus
                    ? "bg-green-100 text-green-800 border-green-300" 
                    : "bg-red-100 text-red-800 border-red-300"
                    }`}
                    >
                {message}
                    </p>
          )}
        </form>

    </section>
   )
        
}
export default Newproduct