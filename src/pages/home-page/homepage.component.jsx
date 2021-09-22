import React from 'react';
import HomeCarousel from './homecarousel/homecarousel.component';
import WpArticles from './wp-articles/wparticles.component';
import CustomButton from './../../components/button/custom-button/custom-button.component';

import { Link } from 'react-router-dom';
import './homepage.styles.scss';

const HomePage = () => (
	<div className="homepage">
		<HomeCarousel />
		<div className="welcome container">
			<h1 className="welcome__title">Bienvenue à l'Association Franco-Vietnamienne de Pneumologie</h1>
			<p className="welcome__text">Ce site est un lieu de rencontres et d’échanges entre francophones et vietnamiens, passionnés de pneumologie, de chirurgie thoracique, de maladies du sommeil, d’imagerie thoracique, d’allergologie, d’endoscopie, de physiologie respiratoire, de kinésithérapie respiratoire, et de bien d’autres domaines.</p>
			<p>Depuis 1992, l’Association Franco-Vietnamienne de Pneumologie, organisme d’intérêt général, fondé par le Dr Jean-Paul HOMASSON, promeut des échanges médicaux, paramédicaux, et d'enseignement entre les structures sanitaires françaises et vietnamiennes, la recherche dans divers domaines cliniques, fondamentaux et thérapeutiques et notamment dons le cadre de la pneumologie et la chirurgie thoracique, l'apport d'une aide matérielle pour le diagnostic et le traitement des patients atteints d'affections respiratoires. Ceci est concrétisé par des formations au Vietnam ou en visioconférence, l’accueil de stagiaires, l’organisation biennale d’un congrès franco-vietnamien de pneumologie, etc.</p>
		</div>
		<WpArticles />
		<div className="donate container">
			<h1 className="donate__title">Soutenir les actions de l'association</h1>
			<div className="donate__text mb-4">
				Les voyages, l’aide aux étudiants et stagiaires vietnamiens, les aides en équipements, l’organisation des sessions de formation, etc., ont un coût et les dons sont essentiels à la réalisation de ces objectifs. <br />
				Les dons ouvrent droit à crédit d’impôt en France (de 66 % pour les particuliers, dans la limite de 20 % du revenu imposable, de 60 % pour les personnes morales dans la limite de 20 000 € ou 5 ‰ (5 pour mille) du chiffre d'affaires annuel hors taxe. Un certificat fiscal vous est adressé par retour.
			</div>
			<Link to='/sign-up-donor'><CustomButton className="custom-button--positive--duck">Je donne</CustomButton></Link>
		</div>
	</div >
)

export default HomePage;