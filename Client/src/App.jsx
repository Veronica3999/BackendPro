import { Routes, Route} from 'react-router';
import './App.css';

//Layouts
import AdminLayouts from './Layouts/AdminLayout/AdminLayouts.jsx';

//Pages
import AdminPage from './Pages/AdminPages/AdminPage.jsx';
import Newproduct from './Pages/AdminPages/NewProductsPage.jsx';
import CategoriPage from './Pages/AdminPages/CategoriPage.jsx';
import NewCategoriPage from './Pages/AdminPages/NewCategoriPage.jsx';

function App() {
 

  return ( 
    <>
    <Routes>
      <Route element={<AdminLayouts/>}>
        <Route path ='/admin/products' element={<AdminPage />} />
        <Route path ='/admin/products/new' element={<Newproduct />} />
        <Route path ='/admin/categories' element={<CategoriPage />} />
        <Route path ='/admin/categories/new' element={<NewCategoriPage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
