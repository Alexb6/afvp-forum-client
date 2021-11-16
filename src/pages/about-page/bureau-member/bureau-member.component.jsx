import React from "react";

import './bureau-member.styles.scss';

const BureauMember = ({ path, title, name, duty }) => (
   <div className="bureau--member col-md-6">
      <div className="photo--member col-xl-3">
         <img src={path} alt={name} />
      </div>
      <div className="function col-xl-9">
         <span className="function-title">{title}</span> : <span className="function-name">{name}</span><br />{duty}
      </div>
   </div>
)

export default BureauMember;
