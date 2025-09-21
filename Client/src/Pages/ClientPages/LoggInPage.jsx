

import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

function LoggInPage(){
    const navigate = useNavigate();

    useEffect(()=>{
        document.title ="Freaky Fashion";
    },[]);
const [message, setmessage] = useState("");
const [ formData, setformData ] = useState({
    email:"",
    password:"",
});

const handleInputChange=(event)=>{
    const{name, value}=event.target;
    setformData({
        ...formData,
        [name]: value,
    })
};

const sendRegistrer =  async (event)=>{
    event.preventDefault();
        try {
            let { email, password } = formData;
                email = email.trim();
                password = password.trim();

                    if(!email){
                        setmessage("email saknas");
                        return;
                    }
                    if(!password){
                        setmessage("Lösenord/Password saknas");
                        return;
                    }
                
                const res = await fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({ email, password})
                });
                const msg = await res.json();
                console.log("meddelande",msg);
                    if(!res.ok){
                        setmessage(msg.error);
                        return;
                    }
                    //sparar token
            sessionStorage.setItem("token", msg.token);
                //rensar lokala favoriter när en ny användare loggar in
            sessionStorage.removeItem("favorites");
            setmessage(msg.message)
            setformData({
                email: "",
                password: "",
            });

            const localFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
                if(localFavorites > 0){
                    try{
                        await fetch("http://localhost:8000/api/favorites/sync", {
                            method: "POST",
                            headers: {
                                "Content-Type":"aplication/json",
                                "Authorization": `Bearer ${msg.token}`
                            },
                            body: JSON.stringify({favorites: localFavorites})
                        });
                        console.log("Favoriter synkade till DB")
                    }catch(error){
                        console.error("Synkningen fungerade inte", error)
                    }
                }

            const decoded =jwtDecode(msg.token);
                if(decoded.role === "admin"){
                    navigate("/admin/products");
                }
                if(decoded.role === "user"){
                    navigate("/");
                }
               
            
        } catch (error) {
            setmessage("Något gick fel vid inloggningen");
                return;
        }

}
    const registrerClick =()=>{
        navigate("/register");
    };


    return(
       <section className="flex items-center ml-4 flex-col my-30">
        <h2 className='text-3xl'>Logga in</h2>
        <form method="Post" onSubmit={sendRegistrer}>
        <div className="flex flex-col w-full max-w-[500px]">
            <label htmlFor="email" className="text-xl pb-2 mt-4">E-post</label>
            <input
                id="email" 
                name='email'
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e-mail" 
                className="border p-2"/>
        </div>
        <div className="flex flex-col w-full max-w-[500px]">
            <label htmlFor="password" className="text-xl pb-2 mt-4">Lösenord</label>
            <input
                id="password" 
                name='password'
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="xxxxx" 
                className="border p-2"/>
        </div>
        <div className="flex justify-center gap-4 mt-20 w-full mr-40 relative">
            <button
                type='submit' 
                className=" p-4 bg-blue-200 rounded-full text-xl w-[150px]">Logga in
            </button>
            <button 
                onClick={registrerClick}
                className=" p-4 bg-blue-200 rounded-full text-xl w-[250px]
                ">Registrera dig här..</button>
                <div className='absolute bottom-22'>
                    {message && <p>{message}</p>}
                </div>
        </div>
        </form>
       </section>
    );
}
export default LoggInPage;