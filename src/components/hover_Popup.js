// hover_Popup.js
import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import "./hover_Popup.css"
import {useNavigate} from "react-router-dom";

function HoverPopUp({category, title}){
    const navigate = useNavigate();
    const FeatureCard = ({ item, section }) => (
        <div
            className="hover-card h-100"
            onClick={() => navigate(item.navigate)}
            // onClick={() => console.log(item.navigate)}
        >
            <Card className="feature-card h-100">
                <div className="card-media-container">
                    <video autoPlay muted loop className="card-media">
                        <source src={process.env.PUBLIC_URL+"/"+item.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Card.Body className="card-content">
                    <Card.Title className="text-warning mb-3 card-title">
                        {item.title}
                    </Card.Title>
                    <div className="hover-content">
                        <Card.Text className="card-description">
                            {item.description}
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );

    return (
        <>
            <Row className="mb-5">
                <Col>
                    <h1 className="display-5 text-center text-warning mb-4">
                        {title || ""}
                    </h1>
                    <div className="combat-container">
                        {category.map((item, index) => (
                            <FeatureCard key={index} item={item} section={category}/>
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default HoverPopUp;