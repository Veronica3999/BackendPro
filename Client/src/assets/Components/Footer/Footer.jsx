
import { useState, useEffect } from "react";

function Footer(){

    const [AccordionOpenOrClosed, setAccordionOpenOrClosed] = useState(null);
    const [isLargeScreen, setIsLargeScreen]=useState(window.innerWidth >= 640);

        useEffect(()=>{
            const handleResize = ()=>{
                setIsLargeScreen(window.innerWidth >= 640);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        },[]);

const accordionItems = [
    {
        title: 'Shopping',
        contents:['Vinterjackor','Pufferjackor','Kappa','Trenchcoats',]
    },
    {
        title: 'Mina sidor',
        contents: ['Mina ordrar', 'Mitt Konto']
    },
    {
        title: 'Kundtjänst',
        contents: ['Returpolicy', 'Integritetspolicy']
    }
];

const toggleSection = (index) =>{
    setAccordionOpenOrClosed(AccordionOpenOrClosed === index ? null : index);
};


    return(
        <section className=""> 
            <ul className="sm:flex flex-row">
                {accordionItems.map((accordionItem, index) => (
                    <li 
                        key={index} 
                        className="
                        p-3 mb-2 shadow bg-gray-100 hover:bg-gray-200
                        sm:w-full sm:shadow-none sm:hover:bg-gray-100">
                        <button 
                            className="
                            w-full text-start text-xl
                            sm:inline-block" 
                            onClick={() => toggleSection(index)}>
                            {accordionItem.title}
                        </button>
                        {(isLargeScreen || AccordionOpenOrClosed === index) && (
                            <ul className="p-3">
                                {accordionItem.contents.map((content, idx) => (
                                    <li key={idx} className="pl-5 mt-1 text-lg sm:hover:bg-gray-200 sm:hover:shadow">{content}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <p className="text-center mt-10">&#169; Freaky Fashion</p>
            </div>
        </section>
    )
}
export default Footer;