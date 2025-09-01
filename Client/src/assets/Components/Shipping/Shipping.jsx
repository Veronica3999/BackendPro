import glob from '../../Img/globe.svg';
import airplane from '../../Img/airplane.svg';
import shield from '../../Img/shiled.svg';
import smiley from '../../Img/smiley.svg';

function Shipping(){
    return(
        <section className="
            mt-20 ml-5
            sm:flex sm:flex-wrap sm:gap-2
            lg:flex lg:flex-row lg:flex-nowrap">
                <div className="
                    flex flex-row gap-4 my-4
                    sm:w-[49%]
                    lg:w-[30%]">
                        <img className="h-15" src={glob} alt="Glob" />
                        <p className="text-xl flex items-center">Gratis Frakt och returer</p>
                </div>
                <div className="
                    flex flex-row gap-4 my-4
                    sm:w-[49%]
                    lg:w-[19%]">
                        <img className="h-15" src={airplane} alt="airplane" />
                        <p className="text-xl flex items-center">Expressfrakt</p>
                </div>
                <div className="
                    flex flex-row gap-4 my-4
                    sm:w-[49%]
                    lg:w-[24%]">
                        <img className="h-15" src={shield} alt="shield" />
                        <p className="text-xl flex items-center">Säkra betalningar</p>
                </div>
                <div className="
                    flex flex-row gap-4 my-4
                    sm:w-[49%]
                    lg:w-[24%]">
                        <img className="h-15" src={smiley} alt="smiley" />
                        <p className="text-xl flex items-center">Nyheter varje dag</p>
                </div>
        </section>
    )
}
export default Shipping;