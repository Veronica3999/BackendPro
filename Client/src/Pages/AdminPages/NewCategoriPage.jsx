function NewCategoriPage(){
   return(
    <section className="p-5">
        <h2 className="pb-5 text-xl">Ny kategori</h2>

        <form method="post" className="space y-4">
            <div className="grid gap-1">
                <label htmlFor="productName" className="text-xl">Namn</label>
                    <input 
                    id="productName"
                    type="text" 
                    name="productName"
                    placeholder="Namn:"
                    className="border rounded px-3 py-2"
                    />
            </div>
            <div className="grid gap-1">
                <label htmlFor="productImg">Bild:</label>
                    <input 
                    type="file"
                    
                    name="productImg"
                    className="inline-block cursor-pointer rounded bg-blue-200 px-4 py-2 w-25 hover:bg-blue-100 border rounded px-3 py-2"
                    />
            </div>
            <div className="grid gap-1">
                <label htmlFor="productCategori">Kategori</label>
                    <select 
                    id="productCategori" 
                    name="productCategori"
                    className="border rounded px-3 py-2"
                    >
                        <option value="top">Tröja</option>
                        <option value="shoe">Skor</option>
                        <option value="Pants">Byxor</option>
                        <option value="Accessories">Acessoarer</option>
                    </select>
            
            </div>
        </form>
    <div className="flex justify-center m-10">
        <button className="border bg-blue-100 px-3 py-3 rounded">Skapa</button>
    </div>
    </section>
   )
        
}
export default NewCategoriPage