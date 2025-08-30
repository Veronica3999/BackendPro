
function Hero(){
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
                            block text-center text-2xl my-10">HERO</h2>
                        <p className="block text-center text-xl mb-20"> 
                            Lorem ipsum dolor 
                            sit amet consectetur 
                            adipisicing elit. 
                            Laborum mollitia nemo, 
                            laboriosam 0accusantium 
                            soluta voluptatum odit, 
                            laudantium nam molestias 
                            et cupiditate praesentium. 
                            Tempora soluta id voluptatibus 
                            temporibus rerum unde a.
                        </p>
                </div>
            </article>
    )
}
export default Hero;