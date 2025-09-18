import { useContext } from "react";
import GridCardSection from "../../assets/Components/GridCardSection/GridCardSection";
import { FavoriteContext } from "../../Context/FavoriteContext";
function Favorites(){
   const {favorites} = useContext(FavoriteContext);
console.log(favorites);
  
    return(
       <GridCardSection title="Mina favoriter" products={favorites} />
    )
}
export default Favorites;