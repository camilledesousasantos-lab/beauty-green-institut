// Contenu rédactionnel du site Beauty Green Institut — source unique, exportable.
// Les faits proviennent de la charte graphique (PDF) et de la mise à jour orale du 20/09/2026
// (nomenclature des soins visage), qui prime sur le PDF.
window.BG = {
  planity: 'https://www.planity.com/beauty-green-x-onglartiste-76000-rouen',
  instagram: 'https://www.instagram.com/beautygreeninstitut/',
  tel: '07 86 66 87 99',
  adresse: '8 rue Anatole France, 76000 Rouen',
  horaires: 'Mardi à vendredi, 10h45 – 19h00, sur rendez-vous',

  home: {
    label: 'Institut de beauté à Rouen',
    titre: 'Beauty Green Institut',
    accroche: 'La beauté comme un moment pour soi.',
    intro:
      "Beauty Green Institut est un institut de beauté à Rouen, pensé comme un espace de confiance. On y vient pour prendre soin de soi, sans pression et sans standard imposé. Chaque soin est adapté à la peau, au rythme et aux envies de celle qui le reçoit. Le temps passé ici est d'abord un temps pour soi.",
    institut:
      "L'institut a ouvert il y a six ans, rue Anatole France. Un lieu calme, tenu par une seule praticienne, où l'écoute compte autant que le geste. Les rendez-vous sont espacés pour que personne ne se croise ni ne se presse.",
  },

  univers: [
    { index: '01', title: 'Électrolyse', line: "Épilation définitive poil par poil, sur tous types de poils.", href: 'electrolyse.html', image: 'prestation-electrolyse-menton.jpeg' },
    { index: '02', title: 'Soins visage', line: 'Microneedling et BBglow, toujours avec photothérapie LED.', href: 'soins-visage.html', image: 'institut-cabine.jpeg' },
    { index: '03', title: 'Cils', line: 'Rehaussement, pour un regard ouvert sans extension.', href: 'cils.html', image: 'prestation-rehaussement-cils.jpeg' },
    { index: '04', title: 'Sourcils', line: 'Brow Lift, restructuration et teinture.', href: 'sourcils.html', image: 'prestation-brow-lift.jpeg' },
    { index: '05', title: 'Blanchiment dentaire', line: 'Atténuer les colorations du café, du thé ou du tabac.', href: 'blanchiment.html', image: 'prestation-blanchiment-dentaire-avant-apres.jpeg' },
  ],

  articles: [
    { category: 'Électrolyse', date: '18 mars 2026', title: 'Électrolyse : tout comprendre', image: 'prestation-electrolyse-menton.jpeg' },
    { category: 'Cils', date: '4 mars 2026', title: 'Tout savoir avant un rehaussement de cils', image: 'prestation-rehaussement-cils.jpeg' },
    { category: 'Soins visage', date: '19 février 2026', title: 'Que faire après un microneedling ?', image: 'institut-cabine.jpeg' },
    { category: 'Électrolyse', date: '5 février 2026', title: 'Électrolyse ou laser : quelles différences ?', image: 'prestation-electrolyse-menton.jpeg' },
    { category: 'Sourcils', date: '22 janvier 2026', title: 'Comment entretenir ses sourcils ?', image: 'prestation-brow-lift.jpeg' },
    { category: 'Soins visage', date: '9 janvier 2026', title: 'Microneedling : pour quelles problématiques ?', image: 'institut-cabine.jpeg' },
    { category: 'Soins visage', date: '18 décembre 2025', title: 'BBglow : pourquoi choisir ce soin ?', image: 'institut-accueil-logo-mural.jpeg' },
  ],

  electrolyse: {
    label: 'Électrolyse',
    h1: 'Électrolyse à Rouen',
    accroche: "L'expertise majeure de l'institut : une épilation définitive, poil par poil, quel que soit le poil.",
    quoi:
      "L'électrolyse traite le poil un à un, à l'aide d'un filament fin glissé le long du poil. Une impulsion très courte agit sur la zone qui permet au poil de repousser. Contrairement au laser, la méthode ne dépend ni de la couleur du poil ni de celle de la peau : elle convient aux poils les plus fins comme aux plus épais, des plus clairs aux plus foncés.",
    quoi2:
      "Le poil pousse par cycles. Plusieurs passages sont donc nécessaires sur une même zone, espacés dans le temps. Le rythme et le nombre de séances se définissent ensemble, séance après séance, en fonction de ce que la peau montre.",
    zones: ['Visage', 'Buste et poitrine', 'Aisselles', 'Ligne du ventre', 'Maillot, en retouche après laser uniquement'],
    blocs: [
      { t: 'Pour qui', d: "Toute personne gênée par une pilosité que les autres méthodes ne traitent pas : poils blancs, blonds, roux, poils isolés, duvet épaissi, repousses après laser." },
      { t: 'Objectifs', d: "Réduire durablement la pilosité d'une zone, poil par poil, sans viser un résultat immédiat ni un calendrier fixe." },
      { t: 'Déroulement', d: "Nettoyage de la zone, installation confortable, travail poil par poil sous lumière, puis application d'un apaisant. Des rougeurs discrètes peuvent apparaître quelques heures." },
      { t: 'Durée', d: "De 10 à 60 minutes selon la zone et la densité. On commence court, puis on allonge les séances si la peau le supporte bien." },
    ],
    bilan: {
      titre: 'Le premier rendez-vous',
      texte:
        "Le premier rendez-vous est un bilan : on regarde la zone, on parle de vos antécédents, du rythme possible, et la séance se termine par quinze minutes de traitement offertes pour que vous sachiez exactement ce que vous ressentez avant de vous engager.",
      prix: '45 €',
      mention: 'Consultation + première séance de 15 minutes offerte',
    },
    tarifs: [
      { label: '10 min', price: '32 €' }, { label: '15 min', price: '45 €' }, { label: '20 min', price: '53 €' },
      { label: '30 min', price: '70 €' }, { label: '35 min', price: '82 €' }, { label: '45 min', price: '98 €' },
      { label: '50 min', price: '108 €' }, { label: '60 min', price: '115 €' },
    ],
    precautions: [
      "Prévenir en cas de grossesse, de traitement hormonal en cours ou de prise d'isotrétinoïne.",
      'Pas de séance sur une peau lésée, irritée, brûlée par le soleil ou récemment bronzée.',
      'Pas de maquillage ni de crème sur la zone le jour du rendez-vous.',
      'Ne pas épiler à la pince ni à la cire entre deux séances : le poil doit être visible pour être traité.',
      'Éviter piscine, sauna et exposition solaire pendant 48 heures après la séance.',
    ],
    footnote:
      "L'électrolyse est un soin esthétique. En cas de pilosité soudaine ou inhabituelle, un avis médical est recommandé avant de commencer.",
    faq: [
      { q: 'Électrolyse ou laser : que choisir ?', a: "Le laser cible la mélanine : il agit surtout sur les poils foncés sur peau claire. L'électrolyse traite le poil un par un, indépendamment de sa couleur. Les deux méthodes se complètent souvent, l'électrolyse prenant le relais sur ce que le laser laisse." },
      { q: 'Est-ce douloureux ?', a: "La sensation est brève et se décrit souvent comme un picotement chaud. Elle varie selon la zone et la sensibilité de chacune. On avance progressivement, on adapte l'intensité et on s'arrête dès que c'est nécessaire." },
      { q: 'Combien de séances faut-il ?', a: "Cela dépend de la zone, de la densité et du cycle de repousse, qui est propre à chacune. Aucun nombre n'est annoncé à l'avance : on fait le point régulièrement à partir de ce que l'on observe." },
      { q: 'Quelles zones sont traitées ?', a: "Visage, buste et poitrine, aisselles, ligne du ventre. Le maillot est traité uniquement en retouche après un laser." },
      { q: 'Comment préparer sa peau ?', a: "Laisser pousser le poil quelques jours, venir sans maquillage ni crème sur la zone, éviter le soleil les jours précédents et bien hydrater la peau le reste du temps." },
    ],
  },

  sourcils: {
    label: 'Sourcils',
    h1: 'Sourcils et Brow Lift à Rouen',
    accroche: "Redessiner la ligne naturelle du sourcil, sans la transformer.",
    intro:
      "Le travail des sourcils part de votre implantation, pas d'une forme à la mode. Restructuration pour dégager la ligne, teinture pour densifier le regard, Brow Lift pour discipliner et relever le poil : les prestations se combinent selon ce que le sourcil permet.",
    tarifs: [
      { label: 'Restructuration', price: '18 €' },
      { label: 'Teinture', price: '18 €' },
      { label: 'Restructuration + teinture', price: '30 €' },
      { label: 'Brow Lift + restructuration', price: '60 €' },
      { label: 'Brow Lift + restructuration + teinture', price: '73 €' },
    ],
    options: [
      { t: 'Restructuration', d: "Épilation et remise en forme à partir de l'implantation naturelle. Environ 20 minutes." },
      { t: 'Teinture', d: "Coloration douce des poils et du duvet pour densifier la ligne. Tenue de deux à trois semaines." },
      { t: 'Brow Lift', d: "Les poils sont relevés et fixés dans le sens de la pousse pour un sourcil plus ouvert. Tenue moyenne de quatre à six semaines." },
    ],
    precautions: [
      "Pas de Brow Lift sur une peau irritée ou une zone récemment épilée à la cire.",
      'Un test de teinture est réalisé en cas de peau réactive ou de première venue.',
      'Éviter sauna, hammam et gommage du contour de l\u2019œil pendant 24 heures.',
    ],
    faq: [
      { q: 'Combien de temps tient un Brow Lift ?', a: "En moyenne quatre à six semaines, selon la nature du poil et les soins apportés à la maison." },
      { q: 'Faut-il laisser pousser avant le rendez-vous ?', a: "Oui, une dizaine de jours de repousse permettent de redessiner une ligne juste." },
    ],
  },

  blanchiment: {
    label: 'Blanchiment dentaire',
    h1: 'Blanchiment dentaire à Rouen',
    accroche: "Atténuer les colorations liées au café, au thé ou au tabac, avec un protocole encadré.",
    intro:
      "La séance dure environ une heure. Les gencives sont protégées, un gel à base de peroxyde d'hydrogène est appliqué, puis activé sous lampe LED. Un protocole de préparation limite les sensibilités. Il s'agit d'un soin esthétique : il ne remplace ni un détartrage ni un avis dentaire.",
    tarifs: [
      { label: 'Première séance', detail: 'environ 1 h', price: '110 €' },
      { label: 'Deuxième séance éventuelle', detail: 'dans les 4 semaines', price: '60 €' },
    ],
    precautionsIntro:
      "Le blanchiment dentaire ne convient pas à toutes les situations. En cas de doute, demandez conseil à votre dentiste avant de prendre rendez-vous.",
    precautions: [
      'Grossesse et allaitement',
      'Éléments en résine ou composite sur les dents',
      'Hypersensibilité dentaire ou gingivale',
      'Soins dentaires en cours ou récents',
    ],
    footnote:
      "Le résultat varie d'une personne à l'autre, selon la teinte de départ et l'origine des colorations. Il ne peut pas être garanti à l'avance.",
    apres: [
      'Pendant 24 heures : pas de tabac.',
      "Boire uniquement de l'eau.",
      'Privilégier une alimentation claire — riz, pâtes, poulet, fruits et légumes clairs — le temps que les dents se restabilisent.',
    ],
    faq: [
      { q: 'Le résultat est-il garanti ?', a: "Non. La teinte obtenue dépend de la dentition de départ et de l'origine des colorations. On en parle ensemble avant de commencer." },
      { q: 'Combien de temps dure le résultat ?', a: "Cela dépend beaucoup des habitudes : café, thé, vin rouge et tabac recolorent progressivement les dents." },
    ],
  },

  soinsVisage: {
    label: 'Soins visage',
    h1: 'Soins visage à Rouen',
    accroche: "Microneedling et BBglow, toujours accompagnés d'une photothérapie par lumière LED.",
    intro:
      "Les soins visage se pratiquent en cabine, sur environ 45 minutes. Le microneedling travaille la texture de la peau ; le BBglow vise l'hydratation et l'éclat. Chaque séance se termine par une photothérapie par lumière LED. Le nombre de séances dépend de la peau et de la problématique : rien n'est annoncé à l'avance.",
    tarifs: [
      { label: 'Microneedling + Photothérapie par lumière LED', detail: 'environ 45 min', price: '90 €' },
      { label: 'BBglow + Photothérapie par lumière LED', detail: 'environ 45 min', price: '90 €' },
      { label: 'Microneedling + BBglow + Photothérapie par lumière LED', price: '160 €' },
    ],
    options: [
      { t: 'Microneedling', d: "Travail de la texture de peau, de l'apparence des rides et ridules, et de certaines cicatrices dans le cadre de protocoles adaptés." },
      { t: 'BBglow', d: "Hydratation intense, éclat, grain de peau plus fin et apparence des pores diminuée. En séance ponctuelle ou en cure." },
      { t: 'Photothérapie LED', d: 'Incluse dans chaque soin visage, en fin de séance.' },
    ],
    precautions: [
      'Peaux très sensibles ou réactives : on adapte le protocole, parfois on renonce.',
      'Pas de soin sur une peau lésée, une poussée inflammatoire ou un coup de soleil.',
      "Pas d'exposition solaire ni de gommage dans les jours qui suivent.",
      'Prévenir en cas de grossesse, allaitement ou traitement dermatologique en cours.',
    ],
    footnote: "Les résultats varient selon la peau et la problématique. Le nombre de séances est estimé au fil du suivi, jamais fixé à l'avance.",
    faq: [
      { q: 'Combien de séances faut-il ?', a: "Cela dépend de la problématique et de la peau. On évalue ensemble après les premières séances." },
      { q: 'La peau rougit-elle après ?', a: "Des rougeurs discrètes peuvent apparaître quelques heures après un microneedling. Elles s'estompent généralement dans la journée." },
    ],
  },

  cils: {
    label: 'Cils',
    h1: 'Rehaussement de cils à Rouen',
    accroche: "Un regard ouvert à partir de vos cils, sans extension et sans entretien quotidien.",
    intro:
      "Le rehaussement redresse le cil naturel à sa base et le fixe dans cette position. Il n'ajoute rien : il révèle la longueur existante. Le soin dure environ une heure et se tient en moyenne de quatre à huit semaines, selon le cycle de vos cils.",
    tarifs: [
      { label: 'Rehaussement de cils', detail: 'environ 1 h', price: '55 €' },
      { label: 'Rehaussement + teinture', price: '65 €' },
    ],
    options: [
      { t: 'Déroulement', d: "Yeux fermés, cils positionnés sur un bigoudi souple, produits posés par temps courts, puis soin nourrissant." },
      { t: 'Tenue', d: 'Quatre à huit semaines en moyenne, le temps du renouvellement naturel du cil.' },
      { t: 'Après le soin', d: "Pendant 24 heures : éviter l'eau, le sport et le maquillage des yeux." },
    ],
    precautions: [
      'Pas de rehaussement en cas de conjonctivite, d\u2019orgelet ou d\u2019irritation oculaire.',
      'Prévenir en cas de port de lentilles : elles se retirent avant la séance.',
      'Un test est réalisé avant la teinture en cas d\u2019œil sensible.',
    ],
    footnote: "Le résultat dépend de la longueur et de l'implantation naturelles des cils.",
    faq: [
      { q: 'Peut-on se maquiller après ?', a: 'Pas pendant les 24 premières heures. Ensuite, le mascara est possible, sans démaquillant huileux.' },
      { q: 'Est-ce que cela abîme le cil ?', a: "Le soin sollicite le cil : on l'espace en fonction de sa tenue et on applique un soin nourrissant en fin de séance." },
    ],
  },

  institut: {
    label: "L'Institut",
    h1: 'Un espace pensé pour les femmes',
    texte: [
      "J'ai ouvert Beauty Green Institut il y a six ans, rue Anatole France, à Rouen. Au départ, il y a une passion pour la beauté, l'esthétique et le bien-être. Très vite, il y a eu autre chose : l'envie de créer un lieu où les femmes se sentent à leur place.",
      "Ici, on vient prendre soin de soi et se détendre. On vient aussi, souvent, pour le moment d'échange. Je travaille seule, sur rendez-vous, avec du temps entre chaque cliente : cela me permet d'écouter, d'expliquer et d'adapter chaque soin.",
      "Je ne crois pas aux standards de beauté imposés. Je crois à la confiance, au confort et au plaisir de se sentir bien. C'est ce que j'essaie de mettre dans chaque geste.",
    ],
    signature: 'Camille, fondatrice',
    valeurs: ['Self-acceptation', 'Confiance', 'Féminité', 'Temps pour soi', 'Liberté'],
  },

  cadeaux: {
    label: 'Chèques cadeaux',
    h1: 'Offrir un moment pour soi',
    intro:
      "Le chèque cadeau Beauty Green est valable un an sur toutes les prestations de l'institut. Il peut être utilisé en plusieurs fois, jusqu'à épuisement du solde.",
    montants: ['50 €', '75 €', '100 €', '150 €', 'Montant libre'],
    v1: "Pour offrir un chèque cadeau, contactez l'institut au 07 86 66 87 99 ou passez nous voir, 8 rue Anatole France à Rouen.",
    bientot: "L'achat en ligne du chèque cadeau, avec envoi automatique par email, sera disponible prochainement.",
  },

  formations: {
    label: 'Formations',
    h1: 'Formation Rehaussement de cils',
    statut: 'Bientôt disponible',
    intro:
      "Une première formation au rehaussement de cils est en préparation. Elle s'adresse aux professionnelles de l'esthétique comme aux personnes qui souhaitent se lancer dans l'activité.",
    apreparer: ['Programme', 'Durée', 'Tarif', 'Dates', 'Lieu', 'Matériel fourni', "Modalités d'inscription"],
    contact: 'Renseignements au 07 86 66 87 99.',
  },
};
