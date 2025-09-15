import { useState, useEffect } from "react";


function Hero(){

    const[heroInfo, setheroInfo]=useState([]);

   useEffect(()=>{
               fetch("http://localhost:8000/api/hero")
               .then(res=>res.json())
               .then(hero=>{
                   setheroInfo(hero)
       
       })
       .catch(error=>console.error("Problem vid fetching av produkter i Homepage:", error));
     },[]);
     



    return(
        <>
        {heroInfo.map((heron) => (  
            <article 
            key={heron.id}
            className="mt-20 flex flex-col border p-5
                lg:flex-row-reverse lg:gap-4">
                <div className="
                    flex justify-center">
                        <img src={heron.image}
                            className="flex-1" alt="" />
                </div> 
                <div className="
                    flex flex-col justyfi-center
                    lg:max-w-[40%]">   
                        <h2 className="
                            block text-center text-2xl my-10">{heron.title}</h2>
                        <p className="block text-center text-xl mb-20"> {heron.content}
                        </p>
                </div>
            </article>
        ))}
        </>
    )
}
export default Hero;