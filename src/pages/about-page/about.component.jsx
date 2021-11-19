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
               <div className="row">
                  <div className="activities col">
                     <p>L’association a pout but de réaliser des formations et des échanges médicaux et paramédicaux, entre les structures sanitaires françaises et vietnamiennes. Nous collaborons pour la recherche dans divers domaines cliniques, fondamentaux et thérapeutiques, spécifiquement dans le cadre de la pneumologie et de la chirurgie thoracique. Nous apportons une aide matérielle pour le diagnostic et le traitement des patients atteints d‘affections respiratoires.
                     </p>
                     <p>Les actions bénévoles sont centrées sur les formations théoriques et pratiques; elles se répartissent entre plusieurs groupes de travail : chirurgie thoracique et anesthésie, pneumologie interventionnelle et Imagerie thoracique (CTscan, USscan), pathologies du sommeil, allergologie, kinésithérapie respiratoire et consultations communes avec le partenariat Aquitaine-Haiphong.</p>
                     <p>Les missions de formation mobilisent un ou plusieurs médecins spécialistes et des paramédicaux ; elles sont menées lors de sessions de 2 à 5 jours, à l’invitation d’hôpitaux vietnamiens, sur des thèmes convenus et préparés à l’avance. Chaque groupe de travail fait 1 à 3 missions par an. De plus, nous avons créé deux diplômes interuniversitaires, franco-vietnamiens, de pneumologie et d’allergologie. Enfin, certains membres mènent parfois des actions ponctuelles débordant de la spécialité pneumologie.</p>
                  </div>
               </div>
               <div className="row">
                  <div className="other-activities col">
                     <p>Nos autres actions :</p>
                     <ul>
                        <li>organisation depuis 1998, de congrès biennaux au Vietnam, coordonnés avec les sociétés savantes vietnamiennes.</li>
                        <li>publications d'un journal interne de l’association (Phế Nang) et de monographies bilingues ( pathologies du sommeil, BPCO, maladies allergiques).</li>
                        <li>pour la célébration des 25 années de l'association, édition d' un livre pour retracer l'histoire et les actions de cette période.</li>
                        <li>facilitation de la venue de stagiaires vietnamiens en France et occasionnellement de stagiaires français au Vietnam.</li>
                        <li>développement récent de téléconsultations, de formations pratiques et d'enseignement à distance.</li>
                        <li>achats de matériel...</li>
                     </ul>
                  </div>
               </div>

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