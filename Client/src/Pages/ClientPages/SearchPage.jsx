import GridCardSection from "../../assets/Components/GridCardSection/GridCardSection";

function Search(){
    const products = [
        { id: 1, name: "Svart t-shirt", price: 299, brand: "Levis", image: "https://placehold.co/400x600" },
        { id: 2, name: "Söksida", price: 599, brand: "Nike", image: "https://placehold.co/400x600" },
        { id: 3, name: "Jeansjacka", price: 799, brand: "Wrangler", image: "https://placehold.co/400x600" },
        { id: 4, name: "Sneakers", price: 999, brand: "Adidas", image: "https://placehold.co/400x600" },
        { id: 4, name: "Röd T-shirt", price: 999, brand: "Nike", image: "https://placehold.co/400x600" },
        { id: 4, name: "Orange T-shirt", price: 999, brand: "Adidas", image: "https://placehold.co/400x600" },
  ];

    return(
       <GridCardSection 
            title={`Hittade ${products.length} produkter`} 
            products={products} />
    )
}
export default Search;