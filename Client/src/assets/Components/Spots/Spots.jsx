import {useState, useEffect} from 'react';



function Spots(){

const[spots, setspots] = useState([]);

useEffect(() =>{
    fetch('http://localhost:8000/api/spots')
        .then(res => res.json())
        .then((spotsData)=>
        setspots(spotsData))
},[]);


    return(
        <article className=" flex flex-row gap-4 my-20">
                    {spots.map((spot) => (
                        <div
                        key={spot.id} 
                        className="
                            hidden
                            lg:block lg:p-4 lg:border lg:relative
                        ">
                            <img src={spot.image} alt={spot.heading} 
                                className="" />
                            <p className="
                                lg:absolute lg:pl-2 lg:pr-6 lg:text-center lg:bottom-4 lg:left-4">{spot.content}
                            </p>
                        </div>
                        ))}
                    </article>
    )
}
export default Spots;