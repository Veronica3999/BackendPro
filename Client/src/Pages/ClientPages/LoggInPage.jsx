


function LoggInPage(){
    return(
       <section className="flex items-center flex-col my-30">
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
        <div className="flex justify-end mt-10 w-full mr-40">
            <button 
                className=" p-4 bg-blue-200 rounded-full text-xl w-[150px]
                ">Logga in</button>
        </div>
       </section>
    );
}
export default LoggInPage;