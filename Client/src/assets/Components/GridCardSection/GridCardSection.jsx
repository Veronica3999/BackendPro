import GridCardProducts from "../GridCardProducts/GridCardProducts";

function GridCardSection({title, products}){
    return(
        <section className="grid grid-cols-1 my-20 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-1"> 
            <h3 className='
                col-span-full text-center text-2xl
                '>{title}
            </h3> 

            {products.map((product) => (
                <GridCardProducts
                    key={product.id}
                        name={product.name}
                        price={product.price}
                        brand={product.brand}
                        image={product.image}
                />
            ))}
        </section>
    )
}
export default GridCardSection;