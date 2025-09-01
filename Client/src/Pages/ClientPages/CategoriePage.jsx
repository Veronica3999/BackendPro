
import { useParams } from 'react-router';
import GridCardSection from '../../assets/Components/GridCardSection/GridCardSection';

function Categori(){
    const{categoriName}= useParams();

    const products = [
        { id: 1, name: "Svart t-shirt", price: 299, brand: "Levis", image: "https://placehold.co/400x600", categori:"Tröja" },
        { id: 2, name: "Kategori", price: 599, brand: "Nike", image: "https://placehold.co/400x600", categori:"Tröja"},
        { id: 3, name: "Jeansjacka", price: 799, brand: "Wrangler", image: "https://placehold.co/400x600" ,categori:"Tröja" },
        { id: 4, name: "Sneakers", price: 999, brand: "Adidas", image: "https://placehold.co/400x600", categori:"Tröja" },
        { id: 5, name: "Blå T-shirt", price: 999, brand: "Nike", image: "https://placehold.co/400x600", categori:"skor" },
        { id: 6, name: "Orange T-shirt", price: 999, brand: "Adidas", image: "https://placehold.co/400x600", categori:"skor" },
  ];

    const title = categoriName;
    return(
       <GridCardSection 
            title={title} 
            products={products} 
        />
    )
}
export default Categori;