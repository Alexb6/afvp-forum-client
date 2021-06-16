import React from 'react';
import SignUpMember from './sign-up-member/sign-up-member.component';

import './sign-up-member-page.styles.scss';

const SingnUpMemberPage = () => (
   <div className="sign-up-member-page">
      <div className="sign-up-member-titlebar container-fluid">
         <h1 className="titlebar-title container">Rejoignez-nous</h1>
      </div>
      <div className="sign-up-member-section container">
         <div className="row">
            <SignUpMember />
         </div>
      </div>
   </div>
)

export default SingnUpMemberPage;