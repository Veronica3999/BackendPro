

function Hero(){

    const heroInfo ={
        title:"Hero is the title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum mollitia nemo, laboriosam accusantium soluta voluptatum odit, laudantium nam molestias et cupiditate praesentium. Tempora soluta id voluptatibus temporibus rerum unde a.",
    };
     



    return(
            <article className="
                mt-20 flex flex-col border p-5
                lg:flex-row-reverse lg:gap-4">
                <div className="
                    flex justify-center">
                        <img src="https://placehold.co/600x400" 
                            className="flex-1" alt="" />
                </div> 
                <div className="
                    flex flex-col justyfi-center
                    lg:max-w-[40%]">   
                        <h2 className="
                            block text-center text-2xl my-10">{heroInfo.title}</h2>
                        <p className="block text-center text-xl mb-20"> {heroInfo.description}
                        </p>
                </div>
            </article>
    )
}
export default Hero;