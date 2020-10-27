import React from 'react';
import parse from 'html-react-parser';
// import Moment from 'react-moment';

import './card.styles.scss';

const Card = ({ image, author, date, title, excerpt, link }) => (
    <div className="articleCard col-md-6 col-lg-4" >
        <div className="innerCard">
            <div className="imageCard" style={{ backgroundImage: `url(${image})` }} />
            <div className="bodyCard">
                <h4 className="articleTitle">{title} </h4>
                <div className="articleExerpt">
                    {parse(excerpt)}
                </div>
                <div className="read-more-customed"><a href={link} target="_blank" rel="noopener noreferrer">Lire la suite</a></div>
            </div>
            {/* <div className="footerCard">
                <div className="author-date">
                    <span>{author}</span>
                    <span><Moment format="DD/MM/YYYY">{date}</Moment></span>
                </div>
            </div> */}
        </div>
    </div>
);

export default Card;