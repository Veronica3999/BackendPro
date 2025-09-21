import {useEffect, useState} from 'react';

function RegisterPage(){

    useEffect(()=>{
            document.title = "Freaky Fashion";
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
                
                const res = await fetch("http://localhost:8000/api/registrer", {
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
            setmessage(msg.message)
            setformData({
                email: "",
                password: "",
            });
            
            
        } catch (error) {
            setmessage("Något gick fel vid registreringen");
                return;
        }

}



    return(
       <section className="flex items-center flex-col my-30">
        <h2 className="text-2xl mb-5">Registrera dig</h2>
        <form method="POST" onSubmit={sendRegistrer}>
            <div className="flex flex-col w-full max-w-[500px]">
                <label htmlFor="email" className="text-xl pb-2 mt-4">E-post</label>
                <input
                    id="email" 
                    type="text"
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e-mail" 
                    className="border p-2"/>
            </div>
            <div className="flex flex-col w-full max-w-[500px]">
                <label htmlFor="password" className="text-xl pb-2 mt-4">Lösenord</label>
                <input
                    id="password" 
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="xxxxx" 
                    className="border p-2"/>
            </div>
            <div className="flex justify-center mt-20 w-full relative">
                <button 
                    className=" p-4 bg-blue-200 rounded-full text-xl w-[250px]
                    ">Registrera dig</button>
                    <div className='absolute bottom-22'>
                        {message && <p>{message}</p>}
                    </div>
            </div>
        </form>
       </section>
    );
}
export default RegisterPage;