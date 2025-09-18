import { Outlet } from "react-router";
import Navigation from "../../assets/Components/Nav/Navigation.jsx";
import Header from "../../assets/Components/Header/Header.jsx";
import Shipping from "../../assets/Components/Shipping/Shipping.jsx";
import Footer from "../../assets/Components/Footer/Footer.jsx";
import { CartProvider } from "../../Context/CartContext.jsx";
import { FavoriteProvider } from "../../Context/FavoriteContext.jsx";


function ClientLayouts(){
 
    

    return(
        <CartProvider>
            <FavoriteProvider>
                <div className="font-serif">
                    <header>
                        <Header />
                    </header>
                    <nav>
                        <Navigation />
                    </nav>
                    <aside>
                            
                    </aside>
                    <main>
                        <Outlet />
                    </main>
                    <section>
                        <Shipping />
                    </section>
                    <footer>
                        <Footer />
                    </footer>
                </div>
            </FavoriteProvider>
        </CartProvider>
    )
}
export default ClientLayouts;