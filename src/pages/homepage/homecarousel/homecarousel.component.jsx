import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

import './homecarousel.styles.scss';

const HomeCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div className="home-carousel">
            <div className="container-fluid">
                <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} pause={'hover'} touch={true} indicators={false} >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={"assets/images/carousel/carouselImage01.jpg"}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <p className="slogan-carousel" >Transmettre</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={"assets/images/carousel/carouselImage02.jpg"}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <p className="slogan-carousel" >Former</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={"assets/images/carousel/carouselImage03.jpg"}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <p className="slogan-carousel" >Partager</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={"assets/images/carousel/carouselImage04.jpg"}
                            alt="Fourth slide"
                        />
                        <Carousel.Caption>
                            <p className="slogan-carousel last-text" >autour des maladies respiratoires</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
};

export default HomeCarousel;