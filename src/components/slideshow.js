import React, {useState} from 'react';
import {Row, Col, Carousel} from 'react-bootstrap';
import './SlideShow.css'; // We'll create this CSS file

function SlideShow(slides_data){
    const [slideIndex, setSlideIndex] = useState(0);

    return (
        <>
            <Row className="mb-5">
                <Col>
                    <Carousel
                        activeIndex={slideIndex}
                        onSelect={setSlideIndex}
                        indicators
                        className="custom-carousel"
                        interval={10000}
                    >
                        {slides_data["slides_data"].map((slide, index) => (
                            <Carousel.Item key={index}>
                                <div className="position-relative slide-container">
                                    <video
                                        className="d-block w-100 slide-video"
                                        src={process.env.PUBLIC_URL+"/"+slide.video}
                                        autoPlay
                                        muted
                                        loop
                                        style={{ height: '80%'}}
                                    />
                                    <Carousel.Caption className="custom-caption">
                                        <div className="caption-content">
                                            <h3 className="caption-title">{slide.title}</h3>
                                            <p className="caption-description">{slide.description}</p>
                                        </div>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </>
    )
}
export default SlideShow;