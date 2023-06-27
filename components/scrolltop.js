
import { useEffect, useState } from "react";


const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,

            behavior: "smooth",

        });
    };

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <button

            className={`scrollToTopButton ${isVisible ? "showButton" : ""}`}
            onClick={scrollToTop}
        >
            <img alt="" src="/icons/triple-arrows.png" className="arrow" />

        </button>
    );
};

export default ScrollToTopButton;
