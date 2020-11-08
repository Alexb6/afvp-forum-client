import React from 'react';
import { ReactComponent as Telephone } from './../../assets-src/icons/phone-ringing.svg';
import { ReactComponent as Email } from './../../assets-src/icons/arroba.svg';
import { ReactComponent as Blog } from './../../assets-src/icons/blogger.svg';

import ContactForm from './../../components/form-contact/contact.component';

import './contactpage.styles.scss';

const ContactPage = () => (
    <div className="contactpage">
        <div className="contact-titlebar container-fluid">
            <h1 className="titlebar-title container">Contacts</h1>
        </div>
        <div className="contact-section container">
            <div className="row w-100">
                <div className="contact-details col-md-6 col-sm-12 mb-3">
                    <h2 className="details-title">Contactez-nous</h2>
                    <div className="details-location">
                        <div className="location-address">
                            <span><b>Association Franco-Vietnamienne de Pneumologie</b></span>
                            <span>24 rue Albert Thuret</span>
                            <span>94669 Chevilly-Larue, FRANCE</span>
                        </div>
                    </div>
                    <div className="details-telephone">
                        <Telephone />
                        <span><b>+33 1 01 01 01 01</b></span>
                    </div>
                    <div className="details-email">
                        <Email />
                        <a href="mailto:contact@afvp.net"><b>contact@afvp.net</b></a>
                    </div>
                    <div className="details-blog">
                        <Blog />
                        <a href="http://www.blog.afvp.net/" target="_blank" rel="noopener noreferrer"><b>Visitez notre blog</b></a>
                    </div>
                </div>
                <ContactForm />

            </div>
        </div>
    </div>
);

export default ContactPage;