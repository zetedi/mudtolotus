// All visible copy for the retreat site, in English, French and Arabic.
// Edit text here; components only read from this module. Image paths come from ./images.ts.

import type { ImagePosition } from './images.ts'

export type Lang = 'en' | 'fr' | 'ar'

export const languages: Lang[] = ['en', 'fr', 'ar']
export const languageNames: Record<Lang, string> = { en: 'English', fr: 'Français', ar: 'العربية' }
export const parseLang = (value: unknown): Lang => value === 'fr' || value === 'ar' ? value : 'en'

type Step = { image: string; alt: string; text: string }
type Phase = { label: string; title: string; intro: string; steps: Step[] }

export type Copy = {
  seo: { title: string; description: string; imageAlt: string }
  nav: { skip: string; language: string; story: string; journey: string; included: string; guides: string; pricing: string; join: string }
  hero: { eyebrowLeft: string; eyebrowRight: string; place: string; dates: string; cta: string }
  facts: { label: string; value: string }[]
  story: { lines: string[]; highlight: string; residency: string[]; lotus: string[] }
  journeyTitle: string
  phases: Phase[]
  included: { title: string; items: string[]; imageAlt: string }
  invitation: { lines: string[]; closing: string[] }
  pricing: { title: string; intro: string; earlyBird: string; earlyPrice: string; earlyDeadline: string; regular: string; regularPrice: string; accommodation: string; beds: string[]; mealsTitle: string; meals: string[]; cta: string }
  gallery: { title: string; intro: string; twin: string; room: string; meal: string; temple: string; river: string; residency: string; rocks: string }
  guidesTitle: string
  guides: { name: string; role: string; bio: string; image: string; position?: ImagePosition }[]
  form: {
    title: string
    intro: string
    name: string
    email: string
    phone: string
    country: string
    motivation: string
    motivationHint: string
    submit: string
    sending: string
    success: string
    error: string
    optional: string
  }
  notFound: { title: string; text: string; home: string }
  footer: string
}

const guidePhotos = {
  zein: 'zein-gaia.jpg',
  jasmeen: 'jasmeen-centered.png',
  zipolita: 'la-zipolita.jpg',
}

export const copy: Record<Lang, Copy> = {
  en: {
    seo: {
      title: 'From Mud to Lotus · Eco Building & Art Residency, Aswan',
      description: 'A 9-day eco building and art residency in Aswan, Egypt, 8–16 March 2027. Mud bricks, clay, natural pigments, murals, Kemetic yoga and lotus tea ceremonies.',
      imageAlt: 'From Mud to Lotus — blue lotus emblem on a sunlit mud wall, Aswan, Egypt, 8–16 March 2027',
    },
    nav: { skip: 'Skip to content', language: 'Language', story: 'The myth', journey: 'The journey', included: 'Included', guides: 'Guides', pricing: 'Prices & stay', join: 'Join us' },
    hero: {
      eyebrowLeft: 'Eco building',
      eyebrowRight: 'Art residency',
      place: 'Aswan, Egypt',
      dates: '8–16 March 2027',
      cta: 'Request your place',
    },
    facts: [
      { label: 'Where', value: 'Aswan, Egypt' },
      { label: 'When', value: '8–16 March 2027' },
      { label: 'Duration', value: '9 days' },
      { label: 'Format', value: 'Eco building & art residency' },
    ],
    story: {
      lines: ['Inspired', 'by the ancient Egyptian myth of'],
      highlight: 'The blue lotus rising',
      residency: [
        'from the depths of the mud',
        'symbolizing rebirth, creation,',
        'and transformation.',
        '',
        'This residency',
        'invites you on a journey of grounding,',
        'creativity, and emergence.',
      ],
      lotus: [
        'Just as the lotus finds its way',
        'through the dark waters',
        'to bloom in light,',
        'we will explore the beauty',
        'of working with raw earth',
        'and natural elements,',
        'transforming them into art,',
        'shelter, and expression.',
      ],
    },
    journeyTitle: 'Two phases, one transformation',
    phases: [
      {
        label: 'Phase 1',
        title: 'Rooting into earth',
        intro: 'We begin with the foundations, connecting to the land through eco-building and tactile creation.',
        steps: [
          { image: 'mud-brick-making.png', alt: 'Hands shaping mud bricks', text: 'Crafting mud bricks with your own hands' },
          { image: 'clay.jpg', alt: 'Woman shaping clay pots outdoors', text: 'Exploring clay as a medium for artistic expression' },
          { image: 'sculpture-wall.jpg', alt: 'Artist sculpting a winged scarab on a mud wall', text: 'Creating earthen sculptures on mud walls that merge art and architecture' },
        ],
      },
      {
        label: 'Phase 2',
        title: 'Blooming into colors',
        intro: 'From earth to color, we shift into the delicate and vibrant world of natural artistry.',
        steps: [
          { image: 'pigments.jpg', alt: 'Natural pigment swatches and brushes', text: 'Exploring natural pigments used in ancient Egyptian art' },
          { image: 'mural.jpg', alt: 'Painter working on an Egyptian-style mural', text: 'Creating a collaborative mural painting with lime & pigments' },
          { image: 'lotus-dye-bath.jpg', alt: 'Lotus blossom and fabric in a botanical dye bath', text: 'Practicing flower pressing & the art of dyeing fabrics with natural colors' },
        ],
      },
    ],
    included: {
      title: 'What’s included',
      items: [
        'Daily nourishing plant-based meals & cozy accommodation',
        'Sacred Lotus Tea Ceremonies',
        'Storytelling & lectures on Egyptian mythology',
        'Hands-on eco-construction experience',
        'Immersive art sessions with natural materials',
        'Daily Kemetic yoga',
        'Evening fire rituals under the stars',
      ],
      imageAlt: 'Winged scarab relief sculpted in a mud wall',
    },
    invitation: {
      lines: ['This is an invitation to slow down,', 'reconnect with nature,', 'and rediscover your creative essence —'],
      closing: ['moving from mud to lotus,', 'from form to spirit.'],
    },
    pricing: {
      title: 'Prices & accommodation',
      intro: 'Make yourself at home in Aswan for nine days of earth, art and connection.',
      earlyBird: 'Early bird',
      earlyPrice: '€1,300',
      earlyDeadline: 'Until 31 December 2026',
      regular: 'Regular price',
      regularPrice: '€1,500',
      accommodation: 'Your stay',
      beds: ['Twin beds option or single with total extra charge of 150€'],
      mealsTitle: 'At the table',
      meals: ['Two generous plant-based meals per day', 'Unlimited tea and fresh water'],
      cta: 'Request your place',
    },
    gallery: {
      title: 'An island facing the Temple of Isis',
      intro: 'Experience the rare privilege of staying on a very special island, directly opposite the Temple of Isis. Surrounded by the waters of the Nile, this peaceful setting invites you to slow down, rest and reconnect with nature. Between moments of creativity and shared meals, take time to unwind and enjoy the gentle rhythm of island life.',
      twin: 'Twin beds beneath a vaulted ceiling painted with birds',
      room: 'A single bed beneath a vaulted ceiling, a peaceful space to rest',
      meal: 'A shared meal around a table of colorful dishes and flowers',
      temple: 'Ancient temple columns overlooking the water',
      river: 'Rocky banks and ancient stone ruins along the Nile',
      residency: 'Earthen buildings and shaded terraces nestled among the island’s rocks',
      rocks: 'Rock formations in the warm evening light',
    },
    guidesTitle: 'Your guides',
    guides: [
      {
        name: 'Zein Gaia',
        role: 'Eco architect',
        bio: 'Zein Gaia is a Jordanian-born artist, sustainable architect and eco-feminist connecting nature, community and gender equity. Through natural building workshops and women’s pilgrimages in Petra, she weaves creativity and embodied sustainability, inviting people to reconnect with the earth, their bodies and one another.',
        image: guidePhotos.zein,
      },
      {
        name: 'Jasmeen Hana',
        role: 'Temple keeper',
        bio: 'Jasmeen is a Kemetic spiritual and shamanic facilitator, founder of Bliss School and a priestess devoted to Auset/Isis. Based in southern Egypt, she weaves ancient Egyptian wisdom, blue lotus ceremonies and over a decade of retreat experience into spaces for connection, transformation and community well-being.',
        image: guidePhotos.jasmeen,
        position: 'center',
      },
      {
        name: 'La Zipolita',
        role: 'Mural artist',
        bio: 'Laura, known as La Zipolita, is a French mural artist and illustrator inspired by nature and ancient cultures. Through natural pigments, botanical art and traditional techniques, she shares hands-on creative experiences that reconnect us with the earth and ourselves.',
        image: guidePhotos.zipolita,
        position: 'bottom',
      },
    ],
    form: {
      title: 'Request your place',
      intro: 'Places in the residency are limited. Share a few words about yourself and we’ll get back to you with all the practical details.',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      country: 'Country of residence',
      motivation: 'What draws you to this residency?',
      motivationHint: 'Your experience with earth, art or movement — or simply your curiosity.',
      submit: 'Send my request',
      sending: 'Sending…',
      success: 'Thank you — your request has been received. We’ll be in touch soon.',
      error: 'Your request could not be confirmed as sent. Your answers are still here; please try again in a moment.',
      optional: 'optional',
    },
    notFound: { title: 'This page has drifted downstream', text: 'The page you were looking for does not exist, but the residency is one step away.', home: 'Back to the residency' },
    footer: 'From Mud to Lotus · Eco building & art residency · Aswan, Egypt · 8–16 March 2027',
  },
  fr: {
    seo: {
      title: 'From Mud to Lotus · Résidence éco-construction & art, Assouan',
      description: 'Une résidence de 9 jours d’éco-construction et d’art à Assouan, Égypte, du 8 au 16 mars 2027. Briques de terre, argile, pigments naturels, fresques, yoga kémétique et cérémonies du thé de lotus.',
      imageAlt: 'From Mud to Lotus — emblème de lotus bleu sur un mur en terre ensoleillé, Assouan, Égypte, 8–16 mars 2027',
    },
    nav: { skip: 'Aller au contenu', language: 'Langue', story: 'Le mythe', journey: 'Le voyage', included: 'Inclus', guides: 'Guides', pricing: 'Tarifs & séjour', join: 'Nous rejoindre' },
    hero: {
      eyebrowLeft: 'Éco-construction',
      eyebrowRight: 'Résidence artistique',
      place: 'Assouan, Égypte',
      dates: '8–16 mars 2027',
      cta: 'Réserver ma place',
    },
    facts: [
      { label: 'Où', value: 'Assouan, Égypte' },
      { label: 'Quand', value: '8–16 mars 2027' },
      { label: 'Durée', value: '9 jours' },
      { label: 'Format', value: 'Résidence éco-construction & art' },
    ],
    story: {
      lines: ['Inspirée', 'du mythe égyptien ancien du'],
      highlight: 'Lotus bleu qui s’élève',
      residency: [
        'des profondeurs de la boue,',
        'symbole de renaissance, de création',
        'et de transformation.',
        '',
        'Cette résidence',
        'vous invite à un voyage d’ancrage,',
        'de créativité et d’éclosion.',
      ],
      lotus: [
        'Comme le lotus trouve son chemin',
        'à travers les eaux sombres',
        'pour fleurir dans la lumière,',
        'nous explorerons la beauté',
        'du travail de la terre crue',
        'et des éléments naturels,',
        'pour les transformer en art,',
        'en abri et en expression.',
      ],
    },
    journeyTitle: 'Deux phases, une transformation',
    phases: [
      {
        label: 'Phase 1',
        title: 'S’enraciner dans la terre',
        intro: 'Nous commençons par les fondations : se relier à la terre par l’éco-construction et la création tactile.',
        steps: [
          { image: 'mud-brick-making.png', alt: 'Mains façonnant des briques de terre', text: 'Fabriquer des briques de terre de vos propres mains' },
          { image: 'clay.jpg', alt: 'Femme modelant des poteries en plein air', text: 'Explorer l’argile comme médium d’expression artistique' },
          { image: 'sculpture-wall.jpg', alt: 'Artiste sculptant un scarabée ailé sur un mur en terre', text: 'Créer des sculptures en terre sur des murs, entre art et architecture' },
        ],
      },
      {
        label: 'Phase 2',
        title: 'Éclore en couleurs',
        intro: 'De la terre à la couleur, nous entrons dans le monde délicat et vibrant de l’art naturel.',
        steps: [
          { image: 'pigments.jpg', alt: 'Nuancier de pigments naturels et pinceaux', text: 'Découvrir les pigments naturels de l’art égyptien ancien' },
          { image: 'mural.jpg', alt: 'Peintre réalisant une fresque de style égyptien', text: 'Réaliser une fresque collective à la chaux et aux pigments' },
          { image: 'lotus-dye-bath.jpg', alt: 'Fleur de lotus et tissu dans un bain de teinture végétale', text: 'Pratiquer l’herbier & la teinture de tissus aux couleurs naturelles' },
        ],
      },
    ],
    included: {
      title: 'Ce qui est inclus',
      items: [
        'Repas nourrissants à base de plantes chaque jour & hébergement chaleureux',
        'Cérémonies sacrées du thé de lotus',
        'Contes & conférences sur la mythologie égyptienne',
        'Expérience pratique d’éco-construction',
        'Ateliers artistiques immersifs avec des matériaux naturels',
        'Yoga kémétique quotidien',
        'Rituels du feu le soir, sous les étoiles',
      ],
      imageAlt: 'Scarabée ailé sculpté en relief dans un mur en terre',
    },
    invitation: {
      lines: ['Une invitation à ralentir,', 'à se reconnecter à la nature', 'et à retrouver son essence créative —'],
      closing: ['de la boue au lotus,', 'de la forme à l’esprit.'],
    },
    pricing: {
      title: 'Tarifs & hébergement',
      intro: 'Installez-vous à Assouan pour neuf jours de terre, d’art et de partage.',
      earlyBird: 'Tarif anticipé',
      earlyPrice: '1 300 €',
      earlyDeadline: 'Jusqu’au 31 décembre 2026',
      regular: 'Tarif standard',
      regularPrice: '1 500 €',
      accommodation: 'Votre séjour',
      beds: ['Option lits jumeaux ou chambre individuelle avec un supplément total de 150 €'],
      mealsTitle: 'À table',
      meals: ['Deux repas copieux à base de plantes par jour', 'Thé et eau fraîche à volonté'],
      cta: 'Réserver ma place',
    },
    gallery: {
      title: 'Une île face au temple d’Isis',
      intro: 'Vivez le privilège rare de séjourner sur une île singulière, juste en face du temple d’Isis. Entouré des eaux du Nil, ce lieu paisible invite à ralentir, à se reposer et à renouer avec la nature. Entre les moments de création et les repas partagés, prenez le temps de vous détendre et de savourer la douceur de la vie sur l’île.',
      twin: 'Lits jumeaux sous une voûte ornée d’oiseaux peints',
      room: 'Un lit simple sous une voûte, un espace paisible pour se reposer',
      meal: 'Un repas partagé autour d’une table de plats colorés et de fleurs',
      temple: 'Des colonnes de temple antique face à l’eau',
      river: 'Rives rocheuses et vestiges de pierre au bord du Nil',
      residency: 'Bâtiments en terre et terrasses ombragées nichés parmi les rochers de l’île',
      rocks: 'Formations rocheuses dans la lumière chaude du soir',
    },
    guidesTitle: 'Vos guides',
    guides: [
      {
        name: 'Zein Gaia',
        role: 'Éco-architecte',
        bio: 'Zein Gaia est une artiste, architecte durable et écoféministe née en Jordanie, qui relie nature, communauté et équité de genre. À travers des ateliers de construction naturelle et des pèlerinages de femmes à Pétra, elle mêle créativité et durabilité incarnée pour renouer avec la terre, son corps et les autres.',
        image: guidePhotos.zein,
      },
      {
        name: 'Jasmeen Hana',
        role: 'Gardienne du temple',
        bio: 'Jasmeen est facilitatrice spirituelle et chamanique de tradition kémétique, fondatrice de Bliss School et prêtresse dévouée à Auset/Isis. Installée dans le sud de l’Égypte, elle mêle sagesse égyptienne ancienne, cérémonies du lotus bleu et plus de dix ans d’expérience des retraites au service du lien, de la transformation et du bien-être collectif.',
        image: guidePhotos.jasmeen,
        position: 'center',
      },
      {
        name: 'La Zipolita',
        role: 'Artiste muraliste',
        bio: 'Laura, connue sous le nom de La Zipolita, est une artiste muraliste et illustratrice française inspirée par la nature et les cultures anciennes. À travers les pigments naturels, l’art botanique et les techniques traditionnelles, elle partage des expériences créatives pratiques pour renouer avec la terre et soi-même.',
        image: guidePhotos.zipolita,
        position: 'bottom',
      },
    ],
    form: {
      title: 'Réserver ma place',
      intro: 'Les places sont limitées. Présentez-vous en quelques mots et nous vous recontacterons avec toutes les informations pratiques.',
      name: 'Nom complet',
      email: 'E-mail',
      phone: 'Téléphone / WhatsApp',
      country: 'Pays de résidence',
      motivation: 'Qu’est-ce qui vous attire dans cette résidence ?',
      motivationHint: 'Votre expérience de la terre, de l’art ou du mouvement — ou simplement votre curiosité.',
      submit: 'Envoyer ma demande',
      sending: 'Envoi…',
      success: 'Merci — votre demande a bien été reçue. Nous revenons vers vous très vite.',
      error: 'L’envoi n’a pas pu être confirmé. Vos réponses sont conservées ; merci de réessayer dans un instant.',
      optional: 'facultatif',
    },
    notFound: { title: 'Cette page a dérivé au fil du Nil', text: 'La page que vous cherchez n’existe pas, mais la résidence est à un pas.', home: 'Retour à la résidence' },
    footer: 'From Mud to Lotus · Résidence éco-construction & art · Assouan, Égypte · 8–16 mars 2027',
  },
  ar: {
    seo: {
      title: 'من الطين إلى اللوتس · إقامة للبناء البيئي والفن في أسوان',
      description: 'إقامة لمدة ٩ أيام للبناء البيئي والفن في أسوان، مصر، من ٨ إلى ١٦ مارس ٢٠٢٧. طوب طيني، طين، أصباغ طبيعية، جداريات، يوغا كيميتية ومراسم شاي اللوتس.',
      imageAlt: 'من الطين إلى اللوتس — شعار اللوتس الأزرق على جدار طيني مضيء، أسوان، مصر، من ٨ إلى ١٦ مارس ٢٠٢٧',
    },
    nav: { skip: 'الانتقال إلى المحتوى', language: 'اللغة', story: 'الأسطورة', journey: 'الرحلة', included: 'ما تشمله الإقامة', guides: 'الميسّرات', pricing: 'الأسعار والإقامة', join: 'انضموا إلينا' },
    hero: {
      eyebrowLeft: 'البناء البيئي', eyebrowRight: 'إقامة فنية',
      place: 'أسوان، مصر', dates: 'من ٨ إلى ١٦ مارس ٢٠٢٧',
      cta: 'اطلب مكانك',
    },
    facts: [
      { label: 'المكان', value: 'أسوان، مصر' },
      { label: 'الموعد', value: 'من ٨ إلى ١٦ مارس ٢٠٢٧' },
      { label: 'المدة', value: '٩ أيام' },
      { label: 'التجربة', value: 'إقامة للبناء البيئي والفن' },
    ],
    story: {
      lines: ['مستوحاة', 'من الأسطورة المصرية القديمة عن'],
      highlight: 'اللوتس الأزرق الصاعد',
      residency: ['من أعماق الطين،', 'رمزًا للولادة من جديد والإبداع', 'والتحوّل.', '', 'تدعوك هذه الإقامة', 'إلى رحلة من التجذّر في الأرض،', 'والإبداع والتفتّح.'],
      lotus: ['كما يشقّ اللوتس طريقه', 'عبر المياه المظلمة', 'ليزهر في النور،', 'نستكشف معًا جمال', 'العمل بالتراب الخام', 'والعناصر الطبيعية،', 'وتحويلها إلى فنّ،', 'ومأوى وتعبير.'],
    },
    journeyTitle: 'مرحلتان، ورحلة تحوّل واحدة',
    phases: [
      {
        label: 'المرحلة الأولى', title: 'التجذّر في الأرض',
        intro: 'نبدأ من الأساسات، لنتواصل مع الأرض عبر البناء البيئي والإبداع بأيدينا.',
        steps: [
          { image: 'mud-brick-making.png', alt: 'أيدٍ تشكّل قوالب الطوب الطيني', text: 'صناعة الطوب الطيني بأيديكم' },
          { image: 'clay.jpg', alt: 'امرأة تشكّل أواني فخارية في الهواء الطلق', text: 'استكشاف الطين كوسيلة للتعبير الفني' },
          { image: 'sculpture-wall.jpg', alt: 'فنانة تنحت جعرانًا مجنّحًا على جدار طيني', text: 'ابتكار منحوتات على الجدران الطينية تجمع الفن والعمارة' },
        ],
      },
      {
        label: 'المرحلة الثانية', title: 'التفتّح بالألوان',
        intro: 'من التراب إلى اللون، ننتقل إلى عالم الفن الطبيعي الرقيق والنابض بالحياة.',
        steps: [
          { image: 'pigments.jpg', alt: 'عيّنات من الأصباغ الطبيعية وفُرَش رسم', text: 'اكتشاف الأصباغ الطبيعية المستخدمة في الفن المصري القديم' },
          { image: 'mural.jpg', alt: 'فنانة ترسم جدارية مستوحاة من الفن المصري', text: 'رسم جدارية جماعية باستخدام الجير والأصباغ' },
          { image: 'lotus-dye-bath.jpg', alt: 'زهرة لوتس وقماش في حمّام صباغة نباتية', text: 'تجربة كبس الزهور وفن صباغة الأقمشة بالألوان الطبيعية' },
        ],
      },
    ],
    included: {
      title: 'ما تشمله الإقامة',
      items: ['وجبات نباتية مغذّية يوميًا وإقامة مريحة', 'مراسم شاي اللوتس المقدّس', 'حكايات ومحاضرات عن الأساطير المصرية', 'تجربة عملية في البناء البيئي', 'جلسات فنية غامرة باستخدام مواد طبيعية', 'يوغا كيميتية يومية', 'طقوس النار المسائية تحت النجوم'],
      imageAlt: 'نحت بارز لجعران مجنّح على جدار طيني',
    },
    invitation: {
      lines: ['هذه دعوة إلى التمهّل،', 'والتواصل من جديد مع الطبيعة،', 'واكتشاف جوهرك الإبداعي —'],
      closing: ['من الطين إلى اللوتس،', 'ومن الشكل إلى الروح.'],
    },
    pricing: {
      title: 'الأسعار والإقامة', intro: 'استقرّ في أسوان لتسعة أيام من العمل بالأرض والفن والتواصل.',
      earlyBird: 'سعر الحجز المبكّر', earlyPrice: '١٬٣٠٠ يورو', earlyDeadline: 'حتى ٣١ ديسمبر ٢٠٢٦',
      regular: 'السعر العادي', regularPrice: '١٬٥٠٠ يورو', accommodation: 'إقامتك',
      beds: ['خيار سريرين منفصلين أو غرفة فردية مقابل رسوم إضافية إجمالية قدرها ١٥٠ يورو'],
      mealsTitle: 'على المائدة', meals: ['وجبتان نباتيتان سخيتان يوميًا', 'شاي ومياه عذبة بلا حدود'],
      cta: 'اطلب مكانك',
    },
    gallery: {
      title: 'جزيرة قبالة معبد إيزيس',
      intro: 'استمتع بفرصة نادرة للإقامة على جزيرة مميّزة قبالة معبد إيزيس مباشرة. تحيط بها مياه النيل، وتدعوك أجواؤها الهادئة إلى التمهّل والراحة والتواصل من جديد مع الطبيعة. وبين لحظات الإبداع والوجبات المشتركة، خذ وقتك للاسترخاء والاستمتاع بإيقاع الحياة الهادئ على الجزيرة.',
      twin: 'سريران منفصلان تحت سقف مقبّب مزيّن برسوم الطيور',
      room: 'سرير فردي تحت سقف مقبّب في مساحة هادئة للراحة',
      meal: 'وجبة مشتركة حول مائدة تزيّنها الأطباق الملوّنة والزهور',
      temple: 'أعمدة معبد أثري تطلّ على الماء',
      river: 'ضفاف صخرية وآثار حجرية قديمة على ضفاف النيل',
      residency: 'مبانٍ ترابية وشرفات مظلّلة بين صخور الجزيرة',
      rocks: 'تشكيلات صخرية في ضوء المساء الدافئ',
    },
    guidesTitle: 'الميسّرات المرافقات لكم',
    guides: [
      {
        name: 'زين غايا', role: 'معمارية بيئية',
        bio: 'زين غايا فنانة ومعمارية مستدامة ونسوية بيئية وُلدت في الأردن، وتربط بين الطبيعة والمجتمع والمساواة بين الجنسين. من خلال ورش البناء الطبيعي ورحلات النساء في البتراء، تمزج الإبداع بالاستدامة المعاشة، وتدعو المشاركين إلى تجديد صلتهم بالأرض وأجسادهم وببعضهم البعض.',
        image: guidePhotos.zein,
      },
      {
        name: 'جاسمين هنا', role: 'حارسة المعبد',
        bio: 'جاسمين ميسّرة روحية وشامانية تتّبع التقاليد الكيميتية، ومؤسّسة مدرسة بليس وكاهنة مكرّسة لأوزيت/إيزيس. تقيم في جنوب مصر، وتمزج الحكمة المصرية القديمة ومراسم اللوتس الأزرق بأكثر من عشر سنوات من الخبرة في الخلوات، لخلق مساحات للتواصل والتحوّل والعافية الجماعية.',
        image: guidePhotos.jasmeen, position: 'center',
      },
      {
        name: 'لا زيبوليتا', role: 'فنانة جداريات',
        bio: 'لورا، المعروفة باسم لا زيبوليتا، فنانة جداريات ورسّامة فرنسية تستلهم الطبيعة والثقافات القديمة. من خلال الأصباغ الطبيعية والفن النباتي والتقنيات التقليدية، تشارك تجارب إبداعية عملية تجدّد صلتنا بالأرض وبأنفسنا.',
        image: guidePhotos.zipolita, position: 'bottom',
      },
    ],
    form: {
      title: 'اطلب مكانك', intro: 'الأماكن محدودة. عرّفنا بنفسك بكلمات قليلة، وسنتواصل معك لتزويدك بجميع التفاصيل العملية.',
      name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'الهاتف / واتساب', country: 'بلد الإقامة',
      motivation: 'ما الذي يجذبك إلى هذه الإقامة؟',
      motivationHint: 'تجربتك مع الأرض أو الفن أو الحركة — أو ببساطة فضولك.',
      submit: 'أرسل طلبي', sending: 'جارٍ الإرسال…',
      success: 'شكرًا لك — استلمنا طلبك. سنتواصل معك قريبًا.',
      error: 'تعذّر تأكيد إرسال طلبك. ما زالت إجاباتك محفوظة هنا؛ يُرجى المحاولة مجددًا بعد قليل.',
      optional: 'اختياري',
    },
    notFound: { title: 'انجرفت هذه الصفحة مع تيار النيل', text: 'الصفحة التي تبحث عنها غير موجودة، لكن الإقامة على بُعد خطوة واحدة.', home: 'العودة إلى الإقامة الفنية' },
    footer: 'من الطين إلى اللوتس · إقامة للبناء البيئي والفن · أسوان، مصر · من ٨ إلى ١٦ مارس ٢٠٢٧',
  },
}
