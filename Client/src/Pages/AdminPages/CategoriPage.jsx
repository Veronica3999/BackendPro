import { NavLink } from 'react-router';
import tunna from '../../assets/Img/delete-icon.png';
function CategoriPage(){

   

    return(
        <main className="p-10">
            <div className="flex justify-between">
                <h2 className="inline text-xl font-bold">Kategorier</h2>
                <NavLink
                    to='/admin/categories/new' 
                    className="text-lg px-4 py-2 rounded bg-gray-400 hover:bg-blue-700 hover:text-white">Ny kategori
                </NavLink>
            </div>
            <table className='mt-[20px] w-full table-auto border-collapse'>
                <thead className='border'>
                    <tr className='bg-gray-100'>
                        <th scope="col" className='bg-gray-200 text-left px-4 py-2'>Namn</th>
                        <th scope="col" className='bg-gray-200 w-12 px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody className='border'>
                    <tr className='odd:bg-gray-100 even:bg-blue-50 hover:bg-indigo-200 transition-colors '>
                        <td className=' border-r px-4 py-2 '>Kläder</td>
                        <td>
                            <button type="text" className='inline-flex p-2 rounded  hover:bg-gray-400'>
                                <img src={tunna} alt="Radera" className='w-5 h-5' />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}
export default CategoriPage;