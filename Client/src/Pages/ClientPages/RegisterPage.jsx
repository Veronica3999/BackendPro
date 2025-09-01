

function RegisterPage(){
    return(
       <section className="flex items-center flex-col my-30">
        <h2 className="text-2xl mb-5">Registrera dig</h2>
        <div className="flex flex-col w-full max-w-[500px]">
            <label 
                htmlFor="email"
                className="text-xl pb-2 mt-4
                ">E-post</label>
            <input
                id="email" 
                type="text"
                placeholder="e-mail" 
                className="border p-2"/>
        </div>
        <div className="flex flex-col w-full max-w-[500px]">
            <label 
                htmlFor="password"
                className="text-xl pb-2 mt-4">Lösenord</label>
            <input
                id="password" 
                type="text"
                placeholder="xxxxx" 
                className="border p-2"/>
        </div>
        <div className="flex justify-center mt-10 w-full">
            <button 
                className=" p-4 bg-blue-200 rounded-full text-xl w-[250px]
                ">Registrera dig</button>
        </div>
       </section>
    );
}
export default RegisterPage;