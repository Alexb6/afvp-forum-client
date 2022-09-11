import React from "react";
import parse from "html-react-parser";
// import DayJS from 'react-dayjs';

import "./card-WP-post.styles.scss";

const CardWPPost = ({ image, author, date, title, excerpt, link }) => (
  <div className="card col-md-6 col-lg-4">
    <div className="card-inner">
      <div
        className="card__image"
        style={
          image
            ? { backgroundImage: `url(${image})` }
            : { background: "linear-gradient()" }
        }
      />
      <div className="card__body">
        <h4 className="body__title">{parse(title)} </h4>
        <div className="body__excerpt">{parse(excerpt)}</div>
        <div className="body__read-more">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Lire la suite
          </a>
        </div>
      </div>
      {/* <div className="card__footer">
				<div className="footer__author-date">
					<span>{author}</span>
					<span><DayJS format="MM-DD-YYYY">{date}</DayJS></span>
				</div>
			</div> */}
    </div>
  </div>
);

export default CardWPPost;
