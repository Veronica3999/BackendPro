
function Newproduct(){
   return(
    <section className="p-5">
        <h2 className="pb-5 text-xl">Ny produkt</h2>

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
                <label htmlFor="productDecription">Beskrivning</label>
                    <input 
                    type="text" 
                    name="productDecription"
                    placeholder="Beskrivning:"
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
                <label htmlFor="productBranch">Märke</label>
                    <input 
                    type="text" 
                    name="productBranch"
                    placeholder="Märke:"
                    className="border rounded px-3 py-2"
                    />
            </div>
            <div className="grid gap-1">
                <label htmlFor="productSku">SKU</label>
                    <input 
                    type="text" 
                    name="productSku"
                    placeholder="ex. AAA222"
                    className="border rounded px-3 py-2"
                    />
            </div>
            <div className="grid gap-1">
                <label htmlFor="productPrice">Pris</label>
                    <input 
                    type="text" 
                    name="productPrice"
                    placeholder="Pris:"
                    className="border rounded px-3 py-2"
                    />
            </div>
            <div className="grid gap-1">
                <label htmlFor="productDate">Publiseringsdatum</label>
                    <input 
                    type="date" 
                    name="productDate"
                    className="border rounded px-3 py-2"
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
        <button className="border bg-blue-100 px-3 py-3 rounded">Lägg till</button>
    </div>
    </section>
   )
        
}
export default Newproduct