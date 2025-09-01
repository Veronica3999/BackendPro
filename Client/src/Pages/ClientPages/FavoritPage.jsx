import GridCardSection from "../../assets/Components/GridCardSection/GridCardSection";

function Favorites(){

        const products = [
        { id: 1, name: "Svart t-shirt", price: 299, brand: "Levis", image: "https://placehold.co/400x600" },
        { id: 2, name: "Favorit", price: 599, brand: "Nike", image: "https://placehold.co/400x600" },
        { id: 3, name: "Jeansjacka", price: 799, brand: "Wrangler", image: "https://placehold.co/400x600" },
        { id: 4, name: "Sneakers", price: 999, brand: "Adidas", image: "https://placehold.co/400x600" },
        { id: 4, name: "Röd T-shirt", price: 999, brand: "Nike", image: "https://placehold.co/400x600" },
        { id: 4, name: "Orange T-shirt", price: 999, brand: "Adidas", image: "https://placehold.co/400x600" },
  ];

    return(
       <GridCardSection title="Mina favoriter" products={products} />
    )
}
export default Favorites;