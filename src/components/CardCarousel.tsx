import { useState, useEffect, useCallback } from 'react';
import type { CarouselItem } from '../types/CarouselItem';
import './CardCarousel.css';
import nextArrowIcon from '../assets/arrow-next-small-svgrepo-com.svg';

function CardCarousel({items}: {items: CarouselItem[]}) {
    const [currentItem, setCurrentItem] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);

    const increaseItemCounter = useCallback(() => {
        setCurrentItem((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const decreaseItemCounter = useCallback(() => {
        setCurrentItem((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    // Avance automático cada 10 segundos
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(increaseItemCounter, 10000);

        return () => clearInterval(interval);
    }, [isPaused, increaseItemCounter]);

    // Pausar al hacer clic en los botones
    const handlePrevious = () => {
        decreaseItemCounter();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    const handleNext = () => {
        increaseItemCounter();
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    return (
        <div className="carousel-container">
            <div className="card-body">
                <div className="card-header">
                    <h3>{items[currentItem].title}</h3>
                    <figure className="card-figure">
                        <img src={items[currentItem].image} alt={items[currentItem].alt} />
                    </figure>
                </div>
                
                <div className="card-content">{items[currentItem].description}</div>
                <div className="card-selector">
                    <figure className='previous-item' onClick={handlePrevious}>
                        <img src={nextArrowIcon} alt="" />
                    </figure>
                    <div className="card-indicators">
                        <div className="current-card">{currentItem + 1}</div>
                        <div className="separator">/</div>
                        <div className="card-total">{items.length}</div>
                    </div>
                    <figure className='next-item' onClick={handleNext}>
                        <img src={nextArrowIcon} alt="" />
                    </figure>
                </div>
            </div>
        </div>   
    )
}

export default CardCarousel;