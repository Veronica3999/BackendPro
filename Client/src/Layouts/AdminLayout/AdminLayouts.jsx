import { Outlet } from "react-router";
import HeaderAdmin from "../../assets/Components/Admin/HeaderAdmin/HeaderAdmin";
import AsideAdmin from "../../assets/Components/Admin/AsideAdmin/AsideAdmin";


function AdminLayouts(){
    document.title = 'Administration';

    return(
        <div className="font-serif">
            <header>
                <HeaderAdmin />
            </header>
                <div className="grid grid-cols-[11rem_1fr] ">
                <aside>
                    <AsideAdmin />
                </aside>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
export default AdminLayouts;