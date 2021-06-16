import React from 'react';
import SignUpDonor from './sign-up-donor/sign-up-donor.component';

import './sign-up-donor-page.styles.scss';

const SingnUpDonorPage = () => (
   <div className="sign-up-donor-page">
      <div className="sign-up-donor-titlebar container-fluid">
         <h1 className="titlebar-title container">Soutenez-nous</h1>
      </div>
      <div className="sign-up-donor-section container">
         <div className="row">
            <SignUpDonor />
         </div>
      </div>
   </div>
)

export default SingnUpDonorPage;