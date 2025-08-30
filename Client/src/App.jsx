import { Routes, Route} from 'react-router';
import './App.css';

//Layouts
import AdminLayouts from './Layouts/AdminLayout/AdminLayouts.jsx';
import ClientLayouts from './Layouts/ClientLayouts/ClientLayouts.jsx'
//Pages Client
import HomePage from './Pages/ClientPages/HomePage.jsx'
import FavoritPage from './Pages/ClientPages/FavoritPage.jsx';
import SearchPage from './Pages/ClientPages/SearchPage.jsx';
import NewsPage from './Pages/ClientPages/NewsPage.jsx';
import BasketPage from './Pages/ClientPages/BasketPage.jsx';
import DetailsPage from './Pages/ClientPages/DetailsPage.jsx';
import CategoriePage from './Pages/ClientPages/CategoriePage.jsx';

//Pages Admin
import AdminPage from './Pages/AdminPages/AdminPage.jsx';
import AdminNewproduct from './Pages/AdminPages/NewProductsPage.jsx';
import AdminCategoriPage from './Pages/AdminPages/CategoriPage.jsx';
import AdminNewCategoriPage from './Pages/AdminPages/NewCategoriPage.jsx';

function App() {
 

  return ( 
    <>
    <Routes>
      <Route element={<ClientLayouts />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<FavoritPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/basket' element={<BasketPage />} />
        
        //Ska vara dynamiska, ändra senare
        <Route path='/products' element={<DetailsPage />} />
        <Route path='/categories' element={<CategoriePage />} />
        <Route path='/search' element={<SearchPage />} />
      </Route>
      
      <Route element={<AdminLayouts/>}>
        <Route path ='/admin/products' element={<AdminPage />} />
        <Route path ='/admin/products/new' element={<AdminNewproduct />} />
        <Route path ='/admin/categories' element={<AdminCategoriPage />} />
        <Route path ='/admin/categories/new' element={<AdminNewCategoriPage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
