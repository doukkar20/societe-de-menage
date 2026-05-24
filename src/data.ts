import { ServiceItem, Testimonial } from "./types";
// @ts-ignore
import kitchenImage from "./assets/images/kitchen_clean_1779645435677.png";
// @ts-ignore
import heroImage from "./assets/images/hero_cleaning_1779645419120.png";
// @ts-ignore
import officeImage from "./assets/images/office_clean_1779645453638.png";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "premium-residential",
    title: "Ménage Résidentiel d'Élite",
    shortDescription: "Un entretien méticuleux et des soins hôteliers haut de gamme pour vos espaces de vie réguliers.",
    fullDescription: "Notre service phare pour particuliers. Formés aux standards de la haute hôtellerie, nos gouvernants s'occupent de chaque pièce avec une attention obsessionnelle du détail. Aspiration de précision, polissage des ferrures, re-façonnage des lits et assainissement des points de contact.",
    icon: "Sparkles",
    basePricePerHour: 24.90,
    benefits: [
      "Intervenants dédiés réguliers et assurés",
      "Dépoussiérage à la microfibre active",
      "Sanitisation écologique de toute la robinetterie",
      "Rangement esthétique et lissage des lits",
      "Éligible au crédit d'impôt de 50%"
    ],
    image: kitchenImage
  },
  {
    id: "grand-nettoyage",
    title: "Grand Nettoyage de Printemps",
    shortDescription: "Une remise à neuf en profondeur de votre bien de fond en comble (avant/après saison).",
    fullDescription: "Un nettoyage intensif et curatif conçu pour désincruster les moindres recoins de votre habitation. Idéal pour un emménagement, après des travaux légers ou pour l'arrivée du printemps. Comprend la désinfection profonde du four, des réfrigérateurs, le nettoyage intérieur des placards et l'élimination totale du calcaire.",
    icon: "Grid",
    basePricePerHour: 29.90,
    benefits: [
      "Détartrage chimique doux de vos céramiques",
      "Lessivage des plinthes et portes en bois précieux",
      "Nettoyage intégral de l'intérieur de l'électroménager",
      "Shampoing des tapis et traitement antipoussière",
      "Équipes coordonnées avec superviseur local"
    ],
    image: heroImage
  },
  {
    id: "workspace-prestige",
    title: "Espaces Professionnels & Bureaux",
    shortDescription: "Valorisez votre image de marque auprès de vos collaborateurs et clients.",
    fullDescription: "Vos locaux d'affaires constituent le premier contact avec votre clientèle. Nous offrons des prestations discrètes de nettoyage de bureaux, cabinets libéraux et showrooms de luxe de jour comme de nuit. Purification bactérienne de l'air, dépoussiérage de l'informatique et désinfection des salles de conférence.",
    icon: "Briefcase",
    basePricePerHour: 34.00,
    benefits: [
      "Horaires adaptables (hors heures d'ouverture ou en journée continue)",
      "Traitement spécifique des postes informatiques complexes",
      "Entretien impeccable des espaces de pause et machines à café",
      "Confidentialité absolue et sécurité renforcée des clés",
      "Rapports mensuels de traçabilité d'hygiène"
    ],
    image: officeImage
  },
  {
    id: "expert-windows",
    title: "Nettoyage Expert de Vitres",
    shortDescription: "Une transparence absolue sans trace pour toutes vos fenêtres et baies vitrées.",
    fullDescription: "Verrières complexes, baies coulissantes de terrasse, hauteurs inaccessibles : nos laveurs de vitre certifiés redonnent de l'éclat à vos ouvertures extérieures. Nous utilisons des raclettes anglaises de haute précision et une émulsion déperlante exclusive pour repousser la pluie et la poussière.",
    icon: "Eye",
    basePricePerHour: 31.50,
    benefits: [
      "Spécificité encadrements inclus (huisseries, rails et grilles d'aération)",
      "Résidus de colle et de travaux éliminés sans rayure",
      "Échafaudages mobiles légers ou perches hydrauliques carbone",
      "Traitement hydrofuge de surface pour une longévité doublée",
      "Prestation sécurisée avec garantie bris de glace"
    ],
    image: heroImage
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Hélène de Montalembert",
    role: "Propriétaire d'un duplex à Paris 16e",
    rating: 5,
    comment: "Je confie mon appartement à ÉclatNet depuis plus d'un an pour des interventions hebdomadaires. La rigueur hôtelière est palpable : chaque détail, de la disposition des coussins au pliage impeccable des draps de bain, retranscrit une exigence rare. Le service client est d'une politesse exquise !",
    serviceId: "premium-residential",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "t2",
    name: "Cabinet Vaneau & Associés",
    role: "Directeur de Cabinet d'Avocats",
    rating: 5,
    comment: "Nos clients apprécient l'état irréprochable de notre salle de réunion principale. Travailler avec ÉclatNet nous assure une constance impeccable. Les équipes interviennent le soir avec une discrétion absolue et un sens aigu de la confidentialité.",
    serviceId: "workspace-prestige",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: "t3",
    name: "Pierre-Olivier Lemoine",
    role: "Loft contemporain à Bordeaux (95m²)",
    rating: 5,
    comment: "Le grand nettoyage effectué après mes travaux de rénovation a été bluffant. La poussière de plâtre fine semblait impossible à éradiquer, mais l'équipe d'ÉclatNet a des outils industriels de micro-aspiration impressionnants. La maison sentait divinement bon le pin sauvage grâce à leurs produits verts.",
    serviceId: "grand-nettoyage",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export const ECO_INGREDIENTS = [
  {
    name: "Acide Citrique & Citron",
    description: "Actif ultra-détartrant issu de la fermentation d'agrumes. Il décolle la calamine, fait briller les céramiques blanches et laisse un fini impeccable sur l'inox.",
    properties: ["Détartrant", "Brillance", "Anti-rouille"]
  },
  {
    name: "Bicarbonate de Soude",
    description: "Une poudre d'origine minérale naturelle d'une finesse incomparable qui désodorise en profondeur, neutralise les odeurs d'allergènes et lustre en douceur sans rayer.",
    properties: ["Désodorisant", "Abrasif doux", "Adoucissant d'eau"]
  },
  {
    name: "Vinaigre Blanc d'Alcool (8°)",
    description: "Le roi du nettoyage sans laisser d'impact sur la faune aquatique. Il dégraisse les crédences, fait étinceler nos verres précieux et agit comme un antiseptique naturel doux.",
    properties: ["Dégraissant", "Anti-calcaire", "Désinfectant doux"]
  },
  {
    name: "Huile de Pin Sylvestre",
    description: "Une essence végétale pure distillée par entraînement à la vapeur d'eau. Son parfum résineux noble incarne la propreté saine, libéré des perturbateurs endocriniens.",
    properties: ["Parfum d'exception", "Assainissant", "Aromathérapie saine"]
  }
];

export const FAQS = [
  {
    question: "Comment fonctionne l'avantage fiscal de 50% ?",
    answer: "En France, les prestations de ménage à domicile entrent dans le cadre des services à la personne. Vous bénéficiez d'une déduction ou d'un crédit d'impôt égal à 50% des dépenses engagées pour notre service ÉclatNet. Une attestation fiscale annuelle vous est transmise pour simplifier votre déclaration en ligne."
  },
  {
    question: "Vos produits écologiques sont-ils aussi efficaces que les produits industriels ?",
    answer: "Absolument. Nos protocoles d'intervention associent des matières naturelles pures comme l'acide citrique ou le bicarbonate à des méthodes mécaniques efficaces (aspiration haute pression HEPA, chiffons microfibres tricotés à haute densité). Cela garantit un résultat cliniquement irréprochable tout en préservant la qualité de l'air de votre maison."
  },
  {
    question: "La même personne vient-elle pour chaque intervention résidentielle ?",
    answer: "Oui, la fidélisation est au cœur de notre contrat de prestige. Pour un entretien régulier, une intervenante dédiée attitrée vous est affectée. Elle apprend ainsi la disposition de vos bibelots et vos rituels d'organisation. En cas d'absence programmée (congés), un remplacement par un profil équivalent vous est proposé."
  },
  {
    question: "Quelles assurances possédez-vous en cas de casse d'un objet précieux ?",
    answer: "ÉclatNet est couverte par une assurance Responsabilité Civile Professionnelle AXA à hauteur de 1 000 000 € de dommages matériels. Nos intervenants sont formés pour manipuler l'argenterie, les laques et les tissus fragiles avec d'immenses précautions. Si un incident survenait, nous assurons un remboursement complet ou un remplacement à neuf rapide."
  }
];
