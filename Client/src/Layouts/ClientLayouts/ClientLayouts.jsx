import { Outlet } from "react-router";
import Navigation from "../../assets/Components/Nav/Navigation.jsx";
import Header from "../../assets/Components/Header/Header.jsx";
import Shipping from "../../assets/Components/Shipping/Shipping.jsx";
import Footer from "../../assets/Components/Footer/Footer.jsx";


function ClientLayouts(){
    document.title = 'Freaky Fashion';

    return(
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
    )
}
export default ClientLayouts;