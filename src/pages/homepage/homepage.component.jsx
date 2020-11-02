import React from 'react';
import HomeCarousel from './homecarousel/homecarousel.component';
import WpArticles from './wp-articles/wparticles.component';
import CustomButton from './../../components/button/custom-button.component';

import './homepage.styles.scss';

const HomePage = () => (
    <div className="homepage">
        <HomeCarousel />
        <div className="welcome container">
            <h1 className="welcome__title">Bienvenue à l'Association Franco-Vietnamienne de Pneumologie</h1>
            <p className="welcome__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil praesentium quam nobis voluptates facere nulla inventore assumenda rerum dolorem delectus ipsam nostrum repudiandae quia animi sit voluptas mollitia impedit similique dicta, earum atque error nisi possimus? Officiis, provident sapiente ut voluptatem magnam modi consequatur similique error minima. Natus minus mollitia asperiores, ab dicta, cumque pariatur, dignissimos provident culpa accusamus atque autem? Nam cupiditate quo consectetur ab voluptatum, esse reprehenderit animi quae nihil blanditiis soluta et autem, obcaecati quidem similique ipsam laborum corporis tenetur voluptas dolores veniam excepturi, sit inventore! Adipisci, voluptas expedita! Cupiditate sapiente nostrum magnam quia ut facere eveniet.</p>
        </div>
        <WpArticles />
        <div className="donate container">
            <h1 className="donate__title">Soutenir les actions de l'association</h1>
            <p className="donate__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit perspiciatis nulla incidunt consequuntur officiis reiciendis nostrum a porro iure corrupti quae, sint numquam reprehenderit facilis architecto itaque laudantium velit dignissimos. Corrupti nemo distinctio architecto aut dicta praesentium magnam officia blanditiis tempore exercitationem rerum magni, expedita cum voluptatibus earum consequuntur rem?</p>
            <CustomButton>Je donne</CustomButton>
        </div>
    </div >
)

export default HomePage;