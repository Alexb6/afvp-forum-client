import React from "react";

import BureauMember from './bureau-member/bureau-member.component';
import BUREAU_MEMBERS from './../../assets-src/data/data-bureau-members';

import './about.styles.scss';

class AboutPage extends React.Component {
   constructor(props) {
      super(props)

      this.state = {}
   }

   render() {
      return (
         <div className="about-page">
            <div className="about-hero-image container-fluid">
               <img className="d-block w-100" src="assets/images/about-page/aboutPage.jpg" alt="about page" />
            </div>
            <div className="genesis container mb-5">
               <h1>La génèse de l'AFVP</h1>
               <p>L’association a été fondée en 1992 par le Dr <b>Jean-Paul Homasson</b> (aujourd’hui président d’honneur) à la suite d’une visite au Vietnam. C’est une association à but non lucratif selon la loi du 1/7/1901 (<a href="https://www.journal-officiel.gouv.fr/associations/detail-annonce/associations_b_archive/19920034/1474" target='_blank' rel='noopener noreferrer'>parution au JO du 19/08/1992</a>) et un Organisme déclaré d’intérêt général (les dons ouvrent droit à un <a href="https://www.economie.gouv.fr/cedef/reductions-impots-dons-aux-associations" target='_blank' rel='noopener noreferrer'>crédit d’impot</a>). Elle est présidée depuis 2020 par le Dr <b>Francis MARTIN</b>.</p>
               <p>Les membres, surtout des professionnels de santé, cotisants, et participant pour la plupart à des missions au Vietnam, viennent de France et de pays francophones principalement. Notre siège social a rejoint d’autres organisations à la Maison du Poumon, 68 Bd St Michel 75006 PARIS.</p>
            </div>
            <div className="goals container">
               <h1>Nos buts et activités</h1>
               <p>L’association a pout but de faire des échanges médicaux, paramédicaux, et d'enseignement entre les structures sanitaires françaises et vietnamiennes. Nous collaborons dans la recherche de divers domaines cliniques, fondamentaux et thérapeutiques et spécifiquement dans le cadre de la pneumologie et la chirurgie thoracique. Nous apportons une aide matérielle pour le diagnostic et le traitement des patients atteints d‘affections respiratoires.
               </p>
               <p>Les actions bénévoles sont axées sur l’enseignement et se répartissent entre ces groupes de travail : Chirurgie thoracique et anesthésie, Pneumologie interventionnelle et Imagerie thoracique (CTscan, USscan), Pathologies  du Sommeil, Allergologie, Kinésithérapie respiratoire et le Partenariat Aquitaine-Haiphong. Les missions de formation mobilisent un à plusieurs médecins spécialistes et des paramédicaux et sont menées lors de sessions de 2 à 5 jours, à l’invitation d’hôpitaux vietnamiens et sur des thèmes convenus longtemps à l’avance. Ces missions reviennent 1 à 3 fois par an pour chacun des groupes de travail. Dans ce cadre, nous avons crée deux diplômes interuniversitaires franco-vietnamiens de pneumologie et d’allergologie. Enfin, nous menons parfois des actions ponctuelles qui peuvent déborder de la pneumologie.</p>
               <p>Depuis 1998, nous organisons des congrès biennaux au Vietnam qui sont coordonnés avec des sociétés savantes vietnamiennes.</p>
               <p>Nous publions un journal interne de l’association (Phế Nang) et des monographies bilingues sur les pathologies du sommeil, la BPCO, les maladies allergiques. Pour célébrer les 25 années de l'association, nous avons édité un livre pour retracer nos actions de cette période.</p>
               <p>Nous facilitations la venue de stagiaires vietnamiens en France et occasionnellement de stagiaires français au Vietnam.</p>
               <p>Nous faisons des achats de matériel...</p>
            </div>
            <div className="bureau container">
               <h1>Bureau de l'AFVP</h1>
               <div className="row">
                  {BUREAU_MEMBERS.map(member => (
                     <BureauMember key={member.id} path={member.path} title={member.title} name={member.name} duty={member.duty} />
                  ))}
               </div>
            </div>
         </div>
      )
   }
}

export default AboutPage;