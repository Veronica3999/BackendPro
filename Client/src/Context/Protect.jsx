import { Navigate } from 'react-router';

function ProtectRoutes({children}){
    const token = sessionStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" />;
    }
    return children;
}
export default ProtectRoutes;