import type { Block, Theme } from "@/types/blocks"

export interface Template {
  id: string
  name: string
  description: string
  thumbnail?: string
  category:
    | "wedding"
    | "entreprise"
    | "billetterie"
    | "particulier"
    | "association"
    | "blank"
  theme: Theme
  blocks: Block[]
}

export const templates: Template[] = [
  {
    id: "blank",
    name: "Page Vierge",
    description: "Commencez avec une page vide et créez votre design de A à Z",
    category: "blank",
    theme: {
      primaryColor: "#3b82f6",
      secondaryColor: "#64748b",
      backgroundColor: "#ffffff",
      textColor: "#1e293b",
      fontFamily: "modern",
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
        background: "#ffffff",
        text: "#1e293b",
      },
      typography: {
        fontFamily: "modern",
      },
    },
    blocks: [],
  },
  {
    id: "elegant-wedding",
    name: "Mariage Élégant",
    thumbnail: "/template/wedding/junior-reis-xMDo8y776uE-unsplash-arche-de-mariage-hors-du-commun-edited-scaled.jpg",
    description:
      "Template de mariage avec palette vert sauge et or, parfait pour un événement champêtre chic",
    category: "wedding",
    theme: {
      primaryColor: "#556B55",
      secondaryColor: "#C9A96E",
      backgroundColor: "#F5F3EF",
      textColor: "#2C3E2C",
      fontFamily: "classic",
      colors: {
        primary: "#556B55",
        secondary: "#C9A96E",
        background: "#F5F3EF",
        text: "#2C3E2C",
      },
      typography: {
        fontFamily: "classic",
      },
      navbar: {
        backgroundColor: "#2C3E2C",
        textColor: "#F5F3EF",
      },
    },
    blocks: [
      // Hero - Save The Date with countdown
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Save The Date",
          subtitle: "Sophie & Thomas",
          eventDate: new Date(
            Date.now() + 180 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          backgroundType: "image",
          backgroundImage:
            "/template/wedding/junior-reis-xMDo8y776uE-unsplash-arche-de-mariage-hors-du-commun-edited-scaled.jpg",
          backgroundColor: "#2C3E2C",
          showCountdown: true,
          ctaText: "Je participe",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#F5F3EF",
          buttonTextColor: "#2C3E2C",
          titleConfig: {
            fontSize: "xl",
            fontFamily: "elegant",
            textColor: "#FFFFFF",
          },
        },
      },
      // Programme - Text left, Image right
      {
        id: "text-image-programme",
        type: "text-image",
        position: 1,
        config: {
          title: "Programme",
          text: "14h30 - Cérémonie laïque dans les jardins<br><br>16h00 - Vin d'honneur et cocktail<br><br>19h00 - Dîner de réception<br><br>22h00 - Ouverture du bal<br><br>00h00 - Dessert et festivités",
          image: "/template/wedding/programme.jpg",
          imageAlt: "Programme du mariage",
          layout: "text-left",
          backgroundColor: "#F5F3EF",
          textColor: "#2C3E2C",
          fontSize: "md",
          padding: "lg",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Gallery - Photos grid
      {
        id: "gallery-1",
        type: "gallery",
        position: 2,
        config: {
          title: "Notre Histoire en Images",
          images: [
            {
              id: "img1",
              url: "/template/wedding/history/1eb966409f7df6c66d19cced456be097192c22da.jpg",
              alt: "Photo 1",
              caption: "",
            },
            {
              id: "img2",
              url: "/template/wedding/history/738024437f6f638fa6c41c658cc794706d98d1bf.jpg",
              alt: "Photo 2",
              caption: "",
            },
            {
              id: "img3",
              url: "/template/wedding/history/9b522d3d62bac778bf0e327dfeb6e4f024b1dc9e.jpg",
              alt: "Photo 3",
              caption: "",
            },
            {
              id: "img4",
              url: "/template/wedding/history/ed762162155533bbef612fd3943e57dc47cd22f8.jpg",
              alt: "Photo 4",
              caption: "",
            },
            {
              id: "img5",
              url: "/template/wedding/history/b2fc0f2821fa69d103e43efe81574e343cf5a5c8.jpg",
              alt: "Photo 5",
              caption: "",
            },
            {
              id: "img6",
              url: "/template/wedding/history/dea98a98d1dfb283f450fe780f28e7c4e4e86027.jpg",
              alt: "Photo 6",
              caption: "",
            },
          ],
          layout: "grid",
          autoplay: false,
          showThumbnails: false,
          backgroundColor: "#FFFFFF",
          textColor: "#2C3E2C",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Text-Image - Le lieu de Réception
      {
        id: "text-image-1",
        type: "text-image",
        position: 3,
        config: {
          title: "Le lieu de Réception",
          text: "Nous avons choisi un domaine d'exception niché au cœur de la campagne française. Ce lieu magique, entouré de jardins à la française et de vignobles, sera l'écrin parfait pour célébrer notre union. Vous serez accueillis dans un cadre romantique et élégant, où chaque détail a été pensé pour rendre cette journée inoubliable.",
          image:
            "/template/wedding/7f5459a9b29820078ff637a65abaa3126630aa62.jpg",
          imageAlt: "Lieu de réception",
          layout: "text-left",
          backgroundColor: "#F5F3EF",
          textColor: "#2C3E2C",
          fontSize: "md",
          padding: "lg",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Text-Image - Notre Histoire
      {
        id: "text-image-2",
        type: "text-image",
        position: 4,
        config: {
          title: "Notre Histoire",
          text: "Tout a commencé un soir d'été, lors d'une soirée entre amis. Depuis ce jour, nous ne nous sommes plus quittés. Après cinq années de bonheur partagé, de voyages et de rires, nous avons décidé de sceller notre amour devant nos proches. C'est avec une immense joie que nous vous invitons à partager ce moment unique avec nous.",
          image:
            "/template/wedding/be2e1dc06d00c29bbb5b8d2fb6c026ca4740997d.jpg",
          imageAlt: "Notre histoire",
          layout: "text-right",
          backgroundColor: "#FFFFFF",
          textColor: "#2C3E2C",
          fontSize: "md",
          padding: "lg",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Menu de Mariage - using ticketing block with food images
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 5,
        config: {
          title: "Menu de Mariage",
          description: "Un menu gastronomique préparé par notre chef",
          backgroundColor: "#2C3E2C",
          textColor: "#F5F3EF",
          tickets: [
            {
              id: "menu-1",
              name: "Entrée",
              price: 0,
              description:
                "Foie gras mi-cuit, chutney de figues et brioche toastée",
              image:
                "/template/wedding/menu/5098d38355122c6217b90cda809fe4f5e6986b12.jpg",
              available: true,
            },
            {
              id: "menu-2",
              name: "Plat",
              price: 0,
              description:
                "Filet de bœuf Wellington, légumes de saison et jus corsé",
              image:
                "/template/wedding/menu/c190d23c521e521b422c07eee7de9c6b109e255d.jpg",
              available: true,
            },
            {
              id: "menu-3",
              name: "Dessert",
              price: 0,
              description: "Pièce montée traditionnelle et mignardises",
              image:
                "/template/wedding/menu/e44f17087b4ce04eb063ae5aef2b2b28567139a9 (1).jpg",
              available: true,
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#C9A96E",
          },
        },
      },
      // Second Gallery - More photos
      {
        id: "gallery-2",
        type: "gallery",
        position: 6,
        config: {
          title: "Photos de Famille",
          images: [
            {
              id: "fam1",
              url: "/template/wedding/family/11741dd863b020a2282e87654b20618a7eca13e3.jpg",
              alt: "Photo famille 1",
              caption: "",
            },
            {
              id: "fam2",
              url: "/template/wedding/family/92bacf10ccc4ad8051a9700ac8308e13c20c8581.jpg",
              alt: "Photo famille 2",
              caption: "",
            },
            {
              id: "fam3",
              url: "/template/wedding/family/6f5f89eac4759ce2754d89a2f228f50ff40dcb61.jpg",
              alt: "Photo famille 3",
              caption: "",
            },
          ],
          layout: "grid",
          autoplay: false,
          showThumbnails: false,
          backgroundColor: "#F5F3EF",
          textColor: "#2C3E2C",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Dress Code section
      {
        id: "text-image-3",
        type: "text-image",
        position: 7,
        config: {
          title: "Dress Code",
          text: 'Pour cette journée spéciale, nous vous invitons à respecter un dress code "Champêtre Chic". Mesdames, optez pour des robes élégantes dans des tons naturels. Messieurs, costume clair ou blazer de mise. Évitez le blanc, réservé à la mariée. N\'oubliez pas vos chaussures confortables pour profiter des jardins !',
          image:
            "/template/wedding/06b5fccf328e2c5ff5f265fda4f075d3b2506a9f.jpg",
          imageAlt: "Dress code",
          layout: "text-left",
          backgroundColor: "#FFFFFF",
          textColor: "#2C3E2C",
          fontSize: "md",
          padding: "lg",
          hideImage: false,
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Liste de Mariage / Cadeau section
      {
        id: "text-image-4",
        type: "text-image",
        position: 8,
        config: {
          title: "Liste de Mariage",
          text: "Votre présence est notre plus beau cadeau. Cependant, si vous souhaitez contribuer à notre voyage de noces ou à notre installation, une cagnotte est disponible. Nous serons touchés par chaque attention, quelle qu'elle soit. Merci du fond du cœur pour votre générosité et votre amour.",
          image:
            "/template/wedding/c1deccde84875dc0de4bad29593280f6e2b97159.jpg",
          imageAlt: "Liste de mariage",
          layout: "text-right",
          backgroundColor: "#556B55",
          textColor: "#F5F3EF",
          fontSize: "md",
          padding: "lg",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#C9A96E",
          },
        },
      },
      // Inscription Form
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 9,
        config: {
          title: "Confirmez votre présence",
          description:
            "Merci de nous faire part de votre réponse avant le 1er Mai 2026",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
          ],
          buttonText: "Je confirme ma présence",
          backgroundColor: "#F5F3EF",
          textColor: "#2C3E2C",
          buttonBackgroundColor: "#556B55",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Contact section
      {
        id: "contact-1",
        type: "contact",
        position: 10,
        config: {
          title: "Nous Contacter",
          description: "Une question ? N'hésitez pas à nous écrire",
          email: "sophie.thomas@mariage.fr",
          phone: "+33 6 12 34 56 78",
          socialLinks: [],
          backgroundColor: "#FFFFFF",
          textColor: "#2C3E2C",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "elegant",
            textColor: "#556B55",
          },
        },
      },
      // Footer
      {
        id: "footer-1",
        type: "footer",
        position: 11,
        config: {
          text: "Sophie & Thomas • 21 Juin 2026",
          links: [],
          backgroundColor: "#2C3E2C",
          textColor: "#F5F3EF",
          fontSize: "sm",
        },
      },
    ],
  },
  // ENTREPRISE - Tech Conference Dark Theme
  {
    id: "tech-startup-conference",
    name: "Tech Startup Conference",
    thumbnail: "/template/entreprise/eab15f8c56d46e71afa64ed896ae484671ed3854.jpg",
    description:
      "Template sombre et moderne pour conférences tech et événements entreprise",
    category: "entreprise",
    theme: {
      primaryColor: "#E53935",
      secondaryColor: "#FF5722",
      backgroundColor: "#000000",
      textColor: "#FFFFFF",
      fontFamily: "modern",
      colors: {
        primary: "#E53935",
        secondary: "#FF5722",
        background: "#000000",
        text: "#FFFFFF",
      },
      typography: {
        fontFamily: "modern",
      },
      navbar: {
        backgroundColor: "#000000",
        textColor: "#FFFFFF",
      },
    },
    blocks: [
      // Hero - SHAPE THE FUTURE with countdown
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "SHAPE THE FUTURE",
          subtitle: "Tech Startup Conference 2025",
          eventDate: new Date(
            Date.now() + 120 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          backgroundType: "image",
          backgroundImage:
            "/template/entreprise/eab15f8c56d46e71afa64ed896ae484671ed3854.jpg",
          backgroundColor: "#000000",
          showCountdown: true,
          ctaText: "Réserver ma place",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#E53935",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "xl",
            fontFamily: "modern",
            textColor: "#FFFFFF",
          },
        },
      },
      // Calendar/Agenda section
      {
        id: "agenda-1",
        type: "agenda",
        position: 1,
        config: {
          title: "Programme de l'événement",
          backgroundColor: "#111111",
          textColor: "#FFFFFF",
          events: [
            {
              time: "09:00",
              title: "Accueil & Networking",
              description: "Petit-déjeuner et rencontres",
            },
            {
              time: "10:00",
              title: "Keynote d'ouverture",
              description: "L'avenir de la tech en 2025",
            },
            {
              time: "12:00",
              title: "Pause Déjeuner",
              description: "Networking lunch",
            },
            {
              time: "14:00",
              title: "Workshops",
              description: "Sessions pratiques en petits groupes",
            },
            {
              time: "16:00",
              title: "Tables Rondes",
              description: "Discussions avec les experts",
            },
            {
              time: "18:00",
              title: "Cocktail de Clôture",
              description: "Networking et célébration",
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Text-Image - Participez section
      {
        id: "text-image-1",
        type: "text-image",
        position: 2,
        config: {
          title: "Participez à la Tech Startup Conference 2025",
          text: "Rejoignez-nous pour une journée exceptionnelle dédiée à l'innovation et aux nouvelles technologies. Rencontrez les leaders de l'industrie, découvrez les dernières tendances et développez votre réseau professionnel.<br><br>Une expérience unique pour les entrepreneurs, investisseurs et passionnés de technologie.",
          image:
            "/template/entreprise/bb424d201010ccf56b1e04978be2ce4735e8b7a5.jpg",
          imageAlt: "Conference Tech",
          layout: "text-left",
          backgroundColor: "#000000",
          textColor: "#FFFFFF",
          fontSize: "md",
          padding: "lg",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Speakers
      {
        id: "speakers-1",
        type: "speakers",
        position: 3,
        config: {
          title: "Nos Intervenants",
          speakers: [
            {
              id: "s1",
              name: "Alexandre Martin",
              role: "CEO, TechVision",
              bio: "Expert en Intelligence Artificielle",
              image:
                "/template/entreprise/speakers/56d89863cdbee8658a18aa3923b174601bb472b7.jpg",
            },
            {
              id: "s2",
              name: "Sophie Durand",
              role: "CTO, InnovateTech",
              bio: "Pionnière du Cloud Computing",
              image:
                "/template/entreprise/speakers/520b4b36a6e3b85b61722587042eaa8295cb52de.jpg",
            },
            {
              id: "s3",
              name: "Marc Bernard",
              role: "Founder, StartupLab",
              bio: "Serial Entrepreneur",
              image:
                "/template/entreprise/speakers/bb34f96be90f7d42710c9aeaf704c4af53cdb48e.jpg",
            },
          ],
          backgroundColor: "#111111",
          textColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Location with map
      {
        id: "location-1",
        type: "location",
        position: 4,
        config: {
          title: "Lieu de l'événement",
          address: "Palais des Congrès, Paris",
          mapUrl: "https://maps.app.goo.gl/gtXxpXCUoSyKdzdJ6",
          mapImage:
            "/template/entreprise/7b8e8789eb3f690bb7103f065f468707275501e6.jpg",
          description: "Accessible en métro et RER - Parking disponible",
          backgroundColor: "#000000",
          textColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Ticketing - Tarifs des billets
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 5,
        config: {
          title: "Tarifs des billets",
          description: "Choisissez votre formule",
          backgroundColor: "#111111",
          textColor: "#FFFFFF",
          tickets: [
            {
              id: "t1",
              name: "Early Bird",
              price: 149,
              description: "Accès à toutes les conférences et workshops",
              image: "/template/entreprise/Logo entier.png",
              available: true,
            },
            {
              id: "t2",
              name: "Standard",
              price: 249,
              description: "Accès complet + networking lunch",
              image: "/template/entreprise/Logo entier.png",
              available: true,
            },
            {
              id: "t3",
              name: "VIP",
              price: 449,
              description: "Accès VIP + rencontre avec les speakers",
              image: "/template/entreprise/Logo entier.png",
              available: true,
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Gallery - Un Aperçu
      {
        id: "gallery-1",
        type: "gallery",
        position: 6,
        config: {
          title: "Un Aperçu",
          images: [
            {
              id: "img1",
              url: "/template/entreprise/preview/7d3b398ade5fe32717a5a8d979a8ba1beb42d32a.jpg",
              alt: "Conférence",
              caption: "",
            },
            {
              id: "img2",
              url: "/template/entreprise/preview/227d78c39a0d82324b00f42f372378e4ba7fdfcc.jpg",
              alt: "Networking",
              caption: "",
            },
            {
              id: "img3",
              url: "/template/entreprise/preview/af99fd6db8a517001e1fd14ba20c7a54edf0ecfc.jpg",
              alt: "Workshop",
              caption: "",
            },
            {
              id: "img4",
              url: "/template/entreprise/preview/edeede464d5809a95994ba14aec01123c7bb2ca8.jpg",
              alt: "Speakers",
              caption: "",
            },
            {
              id: "img5",
              url: "/template/entreprise/preview/ee379efab2216b8fd63ce821e0e12f0e67b96a19 (1).jpg",
              alt: "Événement",
              caption: "",
            },
            {
              id: "img6",
              url: "/template/entreprise/preview/f755ce096edd6f04f2e94639b7091ad8fe17600d.jpg",
              alt: "Participants",
              caption: "",
            },
          ],
          layout: "grid",
          autoplay: false,
          showThumbnails: false,
          backgroundColor: "#000000",
          textColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Inscription
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 7,
        config: {
          title: "Inscrivez-vous",
          description: "Réservez votre place dès maintenant",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
            { id: "f3", label: "Entreprise", type: "text", placeholder: "Votre entreprise", required: false },
            { id: "f4", label: "Téléphone", type: "phone", placeholder: "+33 6 00 00 00 00", required: false },
          ],
          buttonText: "Je m'inscris",
          backgroundColor: "#111111",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#E53935",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#E53935",
          },
        },
      },
      // Footer
      {
        id: "footer-1",
        type: "footer",
        position: 8,
        config: {
          text: "Tech Startup Conference 2025 © Tous droits réservés",
          links: [],
          backgroundColor: "#000000",
          textColor: "#666666",
          fontSize: "sm",
        },
      },
    ],
  },
  // BILLETTERIE - Tennis Open de Paris
  {
    id: "open-paris-tennis",
    name: "Open de Paris Indoor",
    thumbnail: "/template/billeterie/ff7505d4078f67f579509b6218a751b106a78d27.jpg",
    description:
      "Template sportif pour événements avec billetterie et restauration",
    category: "billetterie",
    theme: {
      primaryColor: "#0D47A1",
      secondaryColor: "#4CAF50",
      backgroundColor: "#FFFFFF",
      textColor: "#1A237E",
      fontFamily: "modern",
      colors: {
        primary: "#0D47A1",
        secondary: "#4CAF50",
        background: "#FFFFFF",
        text: "#1A237E",
      },
      typography: {
        fontFamily: "modern",
      },
      navbar: {
        backgroundColor: "#0D47A1",
        textColor: "#FFFFFF",
      },
    },
    blocks: [
      // Hero - Open de Paris
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Open de Paris Indoor 2025",
          subtitle: "PARIS2025 - Le rendez-vous incontournable du tennis",
          eventDate: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          backgroundType: "image",
          backgroundImage:
            "/template/billeterie/ff7505d4078f67f579509b6218a751b106a78d27.jpg",
          backgroundColor: "#0D47A1",
          showCountdown: true,
          ctaText: "Réserver mes places",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#4CAF50",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "xl",
            fontFamily: "modern",
            textColor: "#FFFFFF",
          },
        },
      },
      // Programme avec onglets (agenda)
      {
        id: "agenda-1",
        type: "agenda",
        position: 1,
        config: {
          title: "Programme du Tournoi",
          backgroundColor: "#F5F5F5",
          textColor: "#1A237E",
          events: [
            {
              time: "Jour 1",
              title: "Qualifications",
              description: "Premier tour des qualifications",
            },
            {
              time: "Jour 2",
              title: "1er Tour",
              description: "Matchs du premier tour",
            },
            {
              time: "Jour 3",
              title: "2ème Tour",
              description: "Matchs du deuxième tour",
            },
            {
              time: "Jour 4",
              title: "Quarts de Finale",
              description: "Les 8 meilleurs s'affrontent",
            },
            {
              time: "Jour 5",
              title: "Demi-Finales",
              description: "Les 4 derniers en lice",
            },
            {
              time: "Jour 6",
              title: "Finale",
              description: "La grande finale",
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#0D47A1",
          },
        },
      },
      // Speakers/Joueurs
      {
        id: "speakers-1",
        type: "speakers",
        position: 2,
        config: {
          title: "Les Joueurs",
          speakers: [
            {
              id: "p1",
              name: "Carlos Alcaraz",
              role: "Espagne - ATP #2",
              bio: "Vainqueur Roland Garros 2024",
              image:
                "/template/billeterie/players/d69c5604faaaae7fd611ee322014d4c8944a5252.jpg",
            },
            {
              id: "p2",
              name: "Jannik Sinner",
              role: "Italie - ATP #1",
              bio: "Vainqueur Australian Open 2024",
              image:
                "/template/billeterie/players/47c0833692cda83026bf03bc7e59a15957be3bcf.jpg",
            },
            {
              id: "p3",
              name: "Alexander Zverev",
              role: "Allemagne - ATP #4",
              bio: "Finaliste Roland Garros 2024",
              image:
                "/template/billeterie/players/d96d5ae3324becc5101eb61378217b2bf225554b.jpg",
            },
          ],
          backgroundColor: "#FFFFFF",
          textColor: "#1A237E",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#0D47A1",
          },
        },
      },
      // Ticketing - 3 tiers
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 3,
        config: {
          title: "Billetterie",
          description: "Choisissez votre catégorie",
          backgroundColor: "#0D47A1",
          textColor: "#FFFFFF",
          tickets: [
            {
              id: "t1",
              name: "Tribune",
              price: 45,
              description: "Places en tribune haute avec vue sur le court",
              image:
                "/template/billeterie/46723a81a35ce9ddb87808c4ebfb0d3da762a372.jpg",
              available: true,
            },
            {
              id: "t2",
              name: "Carré Or",
              price: 120,
              description: "Places premium avec accès complet au lounge",
              image:
                "/template/billeterie/46723a81a35ce9ddb87808c4ebfb0d3da762a372.jpg",
              available: true,
            },
            {
              id: "t3",
              name: "VIP",
              price: 250,
              description: "Expérience VIP complète avec rencontre joueurs",
              image:
                "/template/billeterie/46723a81a35ce9ddb87808c4ebfb0d3da762a372.jpg",
              available: true,
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#FFC107",
          },
        },
      },
      // Restauration section (using ticketing block for food)
      {
        id: "ticketing-2",
        type: "ticketing",
        position: 4,
        config: {
          title: "Restauration",
          description: "Savourez nos offres gastronomiques",
          backgroundColor: "#F5F5F5",
          textColor: "#1A237E",
          tickets: [
            {
              id: "r1",
              name: "Brasserie du Court",
              price: 0,
              description: "Cuisine française traditionnelle, plats du jour",
              image:
                "/template/billeterie/tickets/7e7a292575233405ab2f2acef97b1781c6ab2d09.jpg",
              available: true,
            },
            {
              id: "r2",
              name: "Le Smash Bar",
              price: 0,
              description: "Burgers gourmet, salades fraîches, cocktails",
              image:
                "/template/billeterie/tickets/9228639b1981b33705258cbabf29f3555b8cfe2a.jpg",
              available: true,
            },
            {
              id: "r3",
              name: "Lounge VIP",
              price: 0,
              description: "Gastronomie raffinée, champagne, service premium",
              image:
                "/template/billeterie/tickets/dbc6fc6dc7559cf78b4fd78fde42c409c4cfb225.jpg",
              available: true,
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#0D47A1",
          },
        },
      },
      // Inscription
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 5,
        config: {
          title: "Réservation",
          description: "Réservez vos places pour l'Open de Paris",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
            { id: "f3", label: "Téléphone", type: "phone", placeholder: "+33 6 00 00 00 00", required: false },
          ],
          buttonText: "Réserver maintenant",
          backgroundColor: "#FFFFFF",
          textColor: "#1A237E",
          buttonBackgroundColor: "#4CAF50",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#0D47A1",
          },
        },
      },
      // Location
      {
        id: "location-1",
        type: "location",
        position: 6,
        config: {
          title: "Accès au Stade",
          address: "AccorHotels Arena, Paris 12ème",
          mapUrl: "",
          mapImage: "/template/billeterie/map-placeholder.jpg",
          description:
            "Métro Bercy (lignes 6 et 14) - Parking souterrain disponible",
          backgroundColor: "#F5F5F5",
          textColor: "#1A237E",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#0D47A1",
          },
        },
      },
      // Footer
      {
        id: "footer-1",
        type: "footer",
        position: 7,
        config: {
          text: "Open de Paris Indoor 2025 © FFT - Tous droits réservés",
          links: [],
          backgroundColor: "#0D47A1",
          textColor: "#FFFFFF",
          fontSize: "sm",
        },
      },
    ],
  },
  // PARTICULIER - BBQ Event
  {
    id: "bobbys-bbq",
    name: "Bobby's BBQ",
    thumbnail: "/template/particulier/Theme 1.png",
    description:
      "Template chaleureux pour fêtes privées et événements entre amis",
    category: "particulier",
    theme: {
      primaryColor: "#F5A623",
      secondaryColor: "#8B4513",
      backgroundColor: "#FFF8E7",
      textColor: "#4A3728",
      fontFamily: "classic",
      colors: {
        primary: "#F5A623",
        secondary: "#8B4513",
        background: "#FFF8E7",
        text: "#4A3728",
      },
      typography: {
        fontFamily: "classic",
      },
      navbar: {
        backgroundColor: "#8B4513",
        textColor: "#FFF8E7",
      },
    },
    blocks: [
      // Hero - Bobby's BBQ
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "BOBBY'S BBQ",
          subtitle: "Une soirée barbecue inoubliable entre amis",
          eventDate: new Date(
            Date.now() + 45 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/particulier/hero-placeholder.jpg",
          backgroundColor: "#8B4513",
          showCountdown: true,
          ctaText: "Je participe",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#F5A623",
          buttonTextColor: "#4A3728",
          titleConfig: {
            fontSize: "xl",
            fontFamily: "classic",
            textColor: "#FFFFFF",
          },
        },
      },
      // Programme
      {
        id: "agenda-1",
        type: "agenda",
        position: 1,
        config: {
          title: "Programme de la Soirée",
          backgroundColor: "#FFF8E7",
          textColor: "#4A3728",
          events: [
            {
              time: "17:00",
              title: "Accueil",
              description: "Apéritif de bienvenue et rafraîchissements",
            },
            {
              time: "18:00",
              title: "Allumage du BBQ",
              description: "Le chef Bobby prend les commandes",
            },
            {
              time: "19:00",
              title: "Dîner",
              description: "Grillades, accompagnements et salades",
            },
            {
              time: "21:00",
              title: "Desserts",
              description: "Gourmandises et fruits frais",
            },
            {
              time: "22:00",
              title: "Soirée",
              description: "Musique et ambiance festive",
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "classic",
            textColor: "#8B4513",
          },
        },
      },
      // Menus section (using ticketing block)
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 2,
        config: {
          title: "Au Menu",
          description: "Des grillades préparées avec amour",
          backgroundColor: "#8B4513",
          textColor: "#FFF8E7",
          tickets: [
            {
              id: "m1",
              name: "Côtes de Bœuf",
              price: 0,
              description: "Marinées aux herbes de Provence, cuisson parfaite",
              image: "/template/particulier/menu-1.jpg",
              available: true,
            },
            {
              id: "m2",
              name: "Ribs Caramélisés",
              price: 0,
              description: "Sauce BBQ maison, fondants à souhait",
              image: "/template/particulier/menu-2.jpg",
              available: true,
            },
            {
              id: "m3",
              name: "Brochettes Variées",
              price: 0,
              description: "Poulet, légumes grillés, sauce satay",
              image: "/template/particulier/menu-3.jpg",
              available: true,
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "classic",
            textColor: "#F5A623",
          },
        },
      },
      // Gallery - Photos
      {
        id: "gallery-1",
        type: "gallery",
        position: 3,
        config: {
          title: "Photos",
          images: [
            {
              id: "img1",
              url: "/template/particulier/gallery-1.jpg",
              alt: "BBQ",
              caption: "",
            },
            {
              id: "img2",
              url: "/template/particulier/gallery-2.jpg",
              alt: "Amis",
              caption: "",
            },
            {
              id: "img3",
              url: "/template/particulier/gallery-3.jpg",
              alt: "Grillades",
              caption: "",
            },
            {
              id: "img4",
              url: "/template/particulier/gallery-4.jpg",
              alt: "Jardin",
              caption: "",
            },
            {
              id: "img5",
              url: "/template/particulier/gallery-5.jpg",
              alt: "Ambiance",
              caption: "",
            },
            {
              id: "img6",
              url: "/template/particulier/gallery-6.jpg",
              alt: "Soirée",
              caption: "",
            },
          ],
          layout: "grid",
          autoplay: false,
          showThumbnails: false,
          backgroundColor: "#FFF8E7",
          textColor: "#4A3728",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "classic",
            textColor: "#8B4513",
          },
        },
      },
      // Inscription
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 4,
        config: {
          title: "Confirmez votre présence",
          description: "Merci de nous prévenir avant le 15 du mois",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
          ],
          buttonText: "Je serai là !",
          backgroundColor: "#FFF8E7",
          textColor: "#4A3728",
          buttonBackgroundColor: "#F5A623",
          buttonTextColor: "#4A3728",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "classic",
            textColor: "#8B4513",
          },
        },
      },
      // Location - Le Jardin
      {
        id: "location-1",
        type: "location",
        position: 5,
        config: {
          title: "Le Jardin",
          address: "42 Rue des Tilleuls, 75016 Paris",
          mapUrl: "",
          mapImage: "/template/particulier/map-placeholder.jpg",
          description:
            "Parking disponible - Accès jardin par le portail latéral",
          backgroundColor: "#8B4513",
          textColor: "#FFF8E7",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "classic",
            textColor: "#F5A623",
          },
        },
      },
      // Footer
      {
        id: "footer-1",
        type: "footer",
        position: 6,
        config: {
          text: "Bobby's BBQ - On vous attend avec impatience !",
          links: [],
          backgroundColor: "#4A3728",
          textColor: "#FFF8E7",
          fontSize: "sm",
        },
      },
    ],
  },
  // ASSOCIATION - Assemblée Générale
  {
    id: "assemblee-generale",
    name: "Assemblée Générale",
    thumbnail: "/template/association/Theme 1 (1).jpg",
    description:
      "Template professionnel pour assemblées générales et réunions associatives",
    category: "association",
    theme: {
      primaryColor: "#1E3A5F",
      secondaryColor: "#FF6B35",
      backgroundColor: "#FFFFFF",
      textColor: "#1E3A5F",
      fontFamily: "modern",
      colors: {
        primary: "#1E3A5F",
        secondary: "#FF6B35",
        background: "#FFFFFF",
        text: "#1E3A5F",
      },
      typography: {
        fontFamily: "modern",
      },
      navbar: {
        backgroundColor: "#1E3A5F",
        textColor: "#FFFFFF",
      },
    },
    blocks: [
      // Hero - AG
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Assemblée Générale Ordinaire",
          subtitle: "AG 2025 - Association Culturelle de Paris",
          eventDate: new Date(
            Date.now() + 60 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/association/hero-placeholder.jpg",
          backgroundColor: "#1E3A5F",
          showCountdown: true,
          ctaText: "Confirmer ma présence",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#FF6B35",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "xl",
            fontFamily: "modern",
            textColor: "#FFFFFF",
          },
        },
      },
      // Programme détaillé
      {
        id: "agenda-1",
        type: "agenda",
        position: 1,
        config: {
          title: "Ordre du Jour",
          backgroundColor: "#F5F7FA",
          textColor: "#1E3A5F",
          events: [
            {
              time: "09:00",
              title: "Accueil des membres",
              description: "Émargement et café de bienvenue",
            },
            {
              time: "09:30",
              title: "Ouverture de l'AG",
              description: "Mot du Président et vérification du quorum",
            },
            {
              time: "10:00",
              title: "Rapport Moral",
              description: "Bilan des activités de l'année écoulée",
            },
            {
              time: "10:45",
              title: "Rapport Financier",
              description: "Présentation des comptes par le Trésorier",
            },
            {
              time: "11:30",
              title: "Votes et Résolutions",
              description: "Approbation des comptes et quitus",
            },
            {
              time: "12:00",
              title: "Élections",
              description: "Renouvellement du Bureau Exécutif",
            },
            {
              time: "12:30",
              title: "Questions Diverses",
              description: "Échanges avec les membres",
            },
            {
              time: "13:00",
              title: "Clôture",
              description: "Cocktail déjeunatoire",
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#1E3A5F",
          },
        },
      },
      // Bureau Exécutif (Speakers)
      {
        id: "speakers-1",
        type: "speakers",
        position: 2,
        config: {
          title: "Bureau Exécutif",
          speakers: [
            {
              id: "b1",
              name: "Marie Lefebvre",
              role: "Présidente",
              bio: "En poste depuis 2022",
              image: "/template/association/bureau-1.jpg",
            },
            {
              id: "b2",
              name: "Pierre Moreau",
              role: "Trésorier",
              bio: "Expert-comptable de profession",
              image: "/template/association/bureau-2.jpg",
            },
            {
              id: "b3",
              name: "Sophie Martin",
              role: "Secrétaire Générale",
              bio: "Membre depuis 2018",
              image: "/template/association/bureau-3.jpg",
            },
            {
              id: "b4",
              name: "Jean Dupont",
              role: "Vice-Président",
              bio: "Responsable des partenariats",
              image: "/template/association/bureau-4.jpg",
            },
          ],
          backgroundColor: "#FFFFFF",
          textColor: "#1E3A5F",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#1E3A5F",
          },
        },
      },
      // Objectifs de l'Assemblée (using ticketing for 3 columns)
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 3,
        config: {
          title: "Objectifs de l'Assemblée",
          description: "Les points clés de cette AG",
          backgroundColor: "#1E3A5F",
          textColor: "#FFFFFF",
          tickets: [
            {
              id: "o1",
              name: "Bilan 2024",
              price: 0,
              description:
                "Présentation et validation du rapport moral et financier de l'exercice écoulé",
              image: "/template/association/objectif-1.jpg",
              available: true,
            },
            {
              id: "o2",
              name: "Projets 2025",
              price: 0,
              description:
                "Vote du budget prévisionnel et des nouveaux projets de l'association",
              image: "/template/association/objectif-2.jpg",
              available: true,
            },
            {
              id: "o3",
              name: "Renouvellement",
              price: 0,
              description: "Élection des nouveaux membres du Bureau Exécutif",
              image: "/template/association/objectif-3.jpg",
              available: true,
            },
          ],
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#FF6B35",
          },
        },
      },
      // Text-Image - Documents section
      {
        id: "text-image-1",
        type: "text-image",
        position: 4,
        config: {
          title: "Documents à Consulter",
          text: "Avant l'Assemblée Générale, nous vous invitons à prendre connaissance des documents suivants :<br><br>• Rapport moral 2024<br>• Rapport financier et bilan comptable<br>• Budget prévisionnel 2025<br>• Procès-verbal de l'AG 2024<br>• Liste des candidatures au Bureau<br><br>Ces documents sont disponibles au secrétariat sur simple demande.",
          image: "/template/association/documents-placeholder.jpg",
          imageAlt: "Documents AG",
          layout: "text-left",
          backgroundColor: "#F5F7FA",
          textColor: "#1E3A5F",
          fontSize: "md",
          padding: "lg",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#1E3A5F",
          },
        },
      },
      // Inscription
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 5,
        config: {
          title: "Confirmer ma Présence",
          description:
            "Merci de confirmer votre participation avant le 15 mars",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
            { id: "f3", label: "Téléphone", type: "phone", placeholder: "+33 1 00 00 00 00", required: false },
          ],
          buttonText: "Je confirme ma présence",
          backgroundColor: "#FFFFFF",
          textColor: "#1E3A5F",
          buttonBackgroundColor: "#FF6B35",
          buttonTextColor: "#FFFFFF",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#1E3A5F",
          },
        },
      },
      // Location - Salle Municipale
      {
        id: "location-1",
        type: "location",
        position: 6,
        config: {
          title: "Lieu",
          address: "Salle Municipale Jean Jaurès, 75011 Paris",
          mapUrl: "",
          mapImage: "/template/association/map-placeholder.jpg",
          description:
            "Métro République (lignes 3, 5, 8, 9, 11) - Accès PMR disponible",
          backgroundColor: "#F5F7FA",
          textColor: "#1E3A5F",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#1E3A5F",
          },
        },
      },
      // Contact
      {
        id: "contact-1",
        type: "contact",
        position: 7,
        config: {
          title: "Contact",
          description: "Pour toute question concernant l'AG",
          email: "secretariat@association-paris.fr",
          phone: "+33 1 42 00 00 00",
          socialLinks: [],
          backgroundColor: "#FFFFFF",
          textColor: "#1E3A5F",
          titleConfig: {
            fontSize: "lg",
            fontFamily: "modern",
            textColor: "#1E3A5F",
          },
        },
      },
      // Footer
      {
        id: "footer-1",
        type: "footer",
        position: 8,
        config: {
          text: "Association Culturelle de Paris © 2025 - Tous droits réservés",
          links: [],
          backgroundColor: "#1E3A5F",
          textColor: "#FFFFFF",
          fontSize: "sm",
        },
      },
    ],
  },
  // WEDDING 2 - Mariage Bohème Romantique
  {
    id: "boheme-wedding",
    name: "Mariage Bohème",
    thumbnail: "/template/wedding/7f5459a9b29820078ff637a65abaa3126630aa62.jpg",
    description:
      "Style bohème romantique aux tons rosés et crème, parfait pour un mariage en plein air",
    category: "wedding",
    theme: {
      primaryColor: "#C08A8E",
      secondaryColor: "#D4AF7A",
      backgroundColor: "#FBF6F1",
      textColor: "#4A3540",
      fontFamily: "elegant",
      colors: {
        primary: "#C08A8E",
        secondary: "#D4AF7A",
        background: "#FBF6F1",
        text: "#4A3540",
      },
      typography: { fontFamily: "elegant" },
      navbar: { backgroundColor: "#FBF6F1", textColor: "#4A3540" },
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Emma & Lucas",
          subtitle: "Vont enfin se dire oui",
          eventDate: new Date(Date.now() + 200 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/wedding/7f5459a9b29820078ff637a65abaa3126630aa62.jpg",
          backgroundColor: "#4A3540",
          showCountdown: true,
          ctaText: "Confirmer ma présence",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#C08A8E",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "xl", fontFamily: "elegant", textColor: "#FFFFFF" },
        },
      },
      {
        id: "text-image-1",
        type: "text-image",
        position: 1,
        config: {
          title: "Notre Histoire",
          text: "Une rencontre par hasard, un café partagé, et puis l'évidence. Sept années plus tard, nous voulons célébrer notre amour entourés de ceux qui comptent. Une journée bohème, simple et lumineuse, où nature et émotion se mêleront.",
          image: "/template/wedding/be2e1dc06d00c29bbb5b8d2fb6c026ca4740997d.jpg",
          imageAlt: "Notre histoire",
          layout: "text-right",
          backgroundColor: "#FBF6F1",
          textColor: "#4A3540",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#C08A8E" },
        },
      },
      {
        id: "agenda-1",
        type: "agenda",
        position: 2,
        config: {
          title: "Le Déroulé",
          backgroundColor: "#F2E6DC",
          textColor: "#4A3540",
          events: [
            { time: "15:00", title: "Cérémonie", description: "Échange des vœux sous la pergola fleurie" },
            { time: "16:30", title: "Vin d'honneur", description: "Cocktail au jardin et photos" },
            { time: "19:30", title: "Dîner", description: "Repas champêtre sous tente" },
            { time: "22:00", title: "Bal", description: "DJ et piste de danse en plein air" },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#C08A8E" },
        },
      },
      {
        id: "gallery-1",
        type: "gallery",
        position: 3,
        config: {
          title: "Souvenirs",
          images: [
            { id: "i1", url: "/template/wedding/history/1eb966409f7df6c66d19cced456be097192c22da.jpg", alt: "Photo 1", caption: "" },
            { id: "i2", url: "/template/wedding/history/738024437f6f638fa6c41c658cc794706d98d1bf.jpg", alt: "Photo 2", caption: "" },
            { id: "i3", url: "/template/wedding/history/9b522d3d62bac778bf0e327dfeb6e4f024b1dc9e.jpg", alt: "Photo 3", caption: "" },
            { id: "i4", url: "/template/wedding/history/ed762162155533bbef612fd3943e57dc47cd22f8.jpg", alt: "Photo 4", caption: "" },
          ],
          layout: "grid",
          autoplay: false,
          showThumbnails: false,
          backgroundColor: "#FBF6F1",
          textColor: "#4A3540",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#C08A8E" },
        },
      },
      {
        id: "location-1",
        type: "location",
        position: 4,
        config: {
          title: "Le Domaine",
          address: "Domaine des Lilas, 33000 Bordeaux",
          mapUrl: "",
          mapImage: "/template/wedding/c1deccde84875dc0de4bad29593280f6e2b97159.jpg",
          description: "Parking gratuit sur place - Navette depuis la gare disponible",
          backgroundColor: "#F2E6DC",
          textColor: "#4A3540",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#C08A8E" },
        },
      },
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 5,
        config: {
          title: "Réponse souhaitée",
          description: "Avant le 30 juin, merci !",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
          ],
          buttonText: "Je viens !",
          backgroundColor: "#FBF6F1",
          textColor: "#4A3540",
          buttonBackgroundColor: "#C08A8E",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#C08A8E" },
        },
      },
      {
        id: "footer-1",
        type: "footer",
        position: 6,
        config: {
          text: "Emma & Lucas • Avec tout notre amour",
          links: [],
          backgroundColor: "#4A3540",
          textColor: "#FBF6F1",
          fontSize: "sm",
        },
      },
    ],
  },
  // ENTREPRISE 2 - Séminaire Leadership
  {
    id: "seminaire-leadership",
    name: "Séminaire Leadership",
    thumbnail: "/template/entreprise/bb424d201010ccf56b1e04978be2ce4735e8b7a5.jpg",
    description:
      "Template clair et professionnel pour séminaires, formations et événements corporate",
    category: "entreprise",
    theme: {
      primaryColor: "#1565C0",
      secondaryColor: "#00ACC1",
      backgroundColor: "#FFFFFF",
      textColor: "#0D2538",
      fontFamily: "modern",
      colors: {
        primary: "#1565C0",
        secondary: "#00ACC1",
        background: "#FFFFFF",
        text: "#0D2538",
      },
      typography: { fontFamily: "modern" },
      navbar: { backgroundColor: "#FFFFFF", textColor: "#0D2538" },
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Séminaire Leadership 2025",
          subtitle: "Inspirer • Décider • Transformer",
          eventDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/entreprise/bb424d201010ccf56b1e04978be2ce4735e8b7a5.jpg",
          backgroundColor: "#1565C0",
          showCountdown: true,
          ctaText: "S'inscrire",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#00ACC1",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "xl", fontFamily: "modern", textColor: "#FFFFFF" },
        },
      },
      {
        id: "text-image-1",
        type: "text-image",
        position: 1,
        config: {
          title: "Deux jours pour faire évoluer vos pratiques",
          text: "Notre séminaire annuel rassemble managers et dirigeants autour des thématiques clés du leadership moderne. Conférences, ateliers et études de cas vous donnent les outils pour mener vos équipes vers la réussite.<br><br>Format intensif et concret, animé par des experts reconnus du secteur.",
          image: "/template/entreprise/eab15f8c56d46e71afa64ed896ae484671ed3854.jpg",
          imageAlt: "Séminaire",
          layout: "text-left",
          backgroundColor: "#FFFFFF",
          textColor: "#0D2538",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#1565C0" },
        },
      },
      {
        id: "agenda-1",
        type: "agenda",
        position: 2,
        config: {
          title: "Programme des 2 jours",
          backgroundColor: "#F1F8FD",
          textColor: "#0D2538",
          events: [
            { time: "J1 - 09:00", title: "Ouverture", description: "Accueil café et présentation des objectifs" },
            { time: "J1 - 10:30", title: "Keynote", description: "Les nouveaux modèles de leadership" },
            { time: "J1 - 14:00", title: "Atelier 1", description: "Communication d'impact en équipe" },
            { time: "J1 - 19:30", title: "Dîner networking", description: "Échanges informels" },
            { time: "J2 - 09:00", title: "Atelier 2", description: "Prise de décision en environnement complexe" },
            { time: "J2 - 14:00", title: "Études de cas", description: "Travail en sous-groupes" },
            { time: "J2 - 17:00", title: "Clôture", description: "Plan d'action personnel" },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#1565C0" },
        },
      },
      {
        id: "speakers-1",
        type: "speakers",
        position: 3,
        config: {
          title: "Vos intervenants",
          speakers: [
            { id: "s1", name: "Claire Fontaine", role: "Coach Executive", bio: "20 ans d'expérience en accompagnement de dirigeants", image: "/template/entreprise/speakers/56d89863cdbee8658a18aa3923b174601bb472b7.jpg" },
            { id: "s2", name: "Thomas Rivière", role: "Auteur & Conférencier", bio: "Spécialiste du leadership transformationnel", image: "/template/entreprise/speakers/520b4b36a6e3b85b61722587042eaa8295cb52de.jpg" },
            { id: "s3", name: "Léa Vasseur", role: "Directrice RH, Groupe Atlas", bio: "Experte en gestion du changement", image: "/template/entreprise/speakers/bb34f96be90f7d42710c9aeaf704c4af53cdb48e.jpg" },
          ],
          backgroundColor: "#FFFFFF",
          textColor: "#0D2538",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#1565C0" },
        },
      },
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 4,
        config: {
          title: "Tarifs",
          description: "TVA incluse - facture sur demande",
          backgroundColor: "#1565C0",
          textColor: "#FFFFFF",
          tickets: [
            { id: "t1", name: "Solo", price: 890, description: "Accès complet aux 2 jours, supports inclus", image: "/template/entreprise/Logo entier.png", available: true },
            { id: "t2", name: "Duo", price: 1590, description: "Deux participants d'une même entreprise", image: "/template/entreprise/Logo entier.png", available: true },
            { id: "t3", name: "Équipe (4+)", price: 3200, description: "Forfait équipe à partir de 4 personnes", image: "/template/entreprise/Logo entier.png", available: true },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#00ACC1" },
        },
      },
      {
        id: "location-1",
        type: "location",
        position: 5,
        config: {
          title: "Lieu",
          address: "Hôtel Métropole, Lyon",
          mapUrl: "",
          mapImage: "/template/entreprise/7b8e8789eb3f690bb7103f065f468707275501e6.jpg",
          description: "À 5 min de la gare Part-Dieu - Parking partenaire",
          backgroundColor: "#F1F8FD",
          textColor: "#0D2538",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#1565C0" },
        },
      },
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 6,
        config: {
          title: "Inscription",
          description: "Places limitées - inscription jusqu'à 7 jours avant",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email professionnel", type: "email", placeholder: "vous@entreprise.com", required: true },
            { id: "f3", label: "Entreprise", type: "text", placeholder: "Votre entreprise", required: true },
            { id: "f4", label: "Fonction", type: "text", placeholder: "Votre poste", required: false },
          ],
          buttonText: "Réserver ma place",
          backgroundColor: "#FFFFFF",
          textColor: "#0D2538",
          buttonBackgroundColor: "#1565C0",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#1565C0" },
        },
      },
      {
        id: "footer-1",
        type: "footer",
        position: 7,
        config: {
          text: "Séminaire Leadership 2025 - Tous droits réservés",
          links: [],
          backgroundColor: "#0D2538",
          textColor: "#FFFFFF",
          fontSize: "sm",
        },
      },
    ],
  },
  // BILLETTERIE 2 - Festival de Musique Live
  {
    id: "festival-live",
    name: "Festival Live",
    thumbnail: "/template/billeterie/Theme 1.jpg",
    description:
      "Template énergique pour concerts, festivals et événements musicaux avec billetterie",
    category: "billetterie",
    theme: {
      primaryColor: "#9333EA",
      secondaryColor: "#EC4899",
      backgroundColor: "#0F0A1F",
      textColor: "#FFFFFF",
      fontFamily: "modern",
      colors: {
        primary: "#9333EA",
        secondary: "#EC4899",
        background: "#0F0A1F",
        text: "#FFFFFF",
      },
      typography: { fontFamily: "modern" },
      navbar: { backgroundColor: "#0F0A1F", textColor: "#FFFFFF" },
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "NEON NIGHTS",
          subtitle: "Le festival qui illumine l'été",
          eventDate: new Date(Date.now() + 110 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/billeterie/Theme 1.jpg",
          backgroundColor: "#0F0A1F",
          showCountdown: true,
          ctaText: "J'achète mon billet",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#EC4899",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "xl", fontFamily: "modern", textColor: "#FFFFFF" },
        },
      },
      {
        id: "text-image-1",
        type: "text-image",
        position: 1,
        config: {
          title: "Trois jours, trois scènes, vingt artistes",
          text: "Neon Nights revient pour sa 5ème édition avec une programmation explosive : électro, rap, indie et live acoustique. Foodtrucks, espace chill, camping sur place et lumières à perte de vue. L'expérience festival que vous attendiez.",
          image: "/template/billeterie/ff7505d4078f67f579509b6218a751b106a78d27.jpg",
          imageAlt: "Festival",
          layout: "text-right",
          backgroundColor: "#0F0A1F",
          textColor: "#FFFFFF",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#EC4899" },
        },
      },
      {
        id: "agenda-1",
        type: "agenda",
        position: 2,
        config: {
          title: "Line-up",
          backgroundColor: "#1A1030",
          textColor: "#FFFFFF",
          events: [
            { time: "VEN 18h", title: "Scène Néon", description: "DJ Lumis · openings indie" },
            { time: "VEN 22h", title: "Scène Main", description: "Headliner surprise" },
            { time: "SAM 16h", title: "Scène Acoustique", description: "Sessions intimistes" },
            { time: "SAM 21h", title: "Scène Main", description: "Soirée électro" },
            { time: "DIM 17h", title: "Scène Néon", description: "Hip-hop & beats" },
            { time: "DIM 22h", title: "Clôture", description: "Set géant + feu d'artifice" },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#EC4899" },
        },
      },
      {
        id: "speakers-1",
        type: "speakers",
        position: 3,
        config: {
          title: "Les artistes",
          speakers: [
            { id: "a1", name: "MAVA", role: "Headliner - Électro", bio: "Première scène à Coachella 2024", image: "/template/billeterie/players/d69c5604faaaae7fd611ee322014d4c8944a5252.jpg" },
            { id: "a2", name: "Jules Noir", role: "Rap français", bio: "Disque d'or - nouvel album live", image: "/template/billeterie/players/47c0833692cda83026bf03bc7e59a15957be3bcf.jpg" },
            { id: "a3", name: "The Velvet Echo", role: "Indie rock", bio: "Tournée européenne 2025", image: "/template/billeterie/players/d96d5ae3324becc5101eb61378217b2bf225554b.jpg" },
          ],
          backgroundColor: "#0F0A1F",
          textColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#EC4899" },
        },
      },
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 4,
        config: {
          title: "Billets",
          description: "Achetez les vôtres avant qu'il ne soit trop tard",
          backgroundColor: "#1A1030",
          textColor: "#FFFFFF",
          tickets: [
            { id: "t1", name: "Pass Jour", price: 55, description: "Accès une journée au choix", image: "/template/billeterie/46723a81a35ce9ddb87808c4ebfb0d3da762a372.jpg", available: true },
            { id: "t2", name: "Pass 3 Jours", price: 140, description: "Vendredi, samedi et dimanche - meilleure offre", image: "/template/billeterie/46723a81a35ce9ddb87808c4ebfb0d3da762a372.jpg", available: true },
            { id: "t3", name: "Pass VIP", price: 280, description: "3 jours + lounge VIP + meet & greet", image: "/template/billeterie/46723a81a35ce9ddb87808c4ebfb0d3da762a372.jpg", available: true },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#EC4899" },
        },
      },
      {
        id: "gallery-1",
        type: "gallery",
        position: 5,
        config: {
          title: "Édition 2024",
          images: [
            { id: "g1", url: "/template/billeterie/tickets/7e7a292575233405ab2f2acef97b1781c6ab2d09.jpg", alt: "Festival 1", caption: "" },
            { id: "g2", url: "/template/billeterie/tickets/9228639b1981b33705258cbabf29f3555b8cfe2a.jpg", alt: "Festival 2", caption: "" },
            { id: "g3", url: "/template/billeterie/tickets/dbc6fc6dc7559cf78b4fd78fde42c409c4cfb225.jpg", alt: "Festival 3", caption: "" },
          ],
          layout: "grid",
          autoplay: false,
          showThumbnails: false,
          backgroundColor: "#0F0A1F",
          textColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#EC4899" },
        },
      },
      {
        id: "location-1",
        type: "location",
        position: 6,
        config: {
          title: "Sur place",
          address: "Parc des Festivals, Marseille",
          mapUrl: "",
          mapImage: "/template/billeterie/ff7505d4078f67f579509b6218a751b106a78d27.jpg",
          description: "Camping inclus - Navettes depuis la gare St-Charles",
          backgroundColor: "#1A1030",
          textColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "modern", textColor: "#EC4899" },
        },
      },
      {
        id: "footer-1",
        type: "footer",
        position: 7,
        config: {
          text: "NEON NIGHTS Festival © 2025",
          links: [],
          backgroundColor: "#0F0A1F",
          textColor: "#888888",
          fontSize: "sm",
        },
      },
    ],
  },
  // PARTICULIER 2 - Anniversaire Festif
  {
    id: "anniversaire-30",
    name: "Anniversaire Surprise",
    thumbnail: "/template/particulier/Theme 1.png",
    description:
      "Template joyeux et coloré pour anniversaires, fêtes et célébrations entre proches",
    category: "particulier",
    theme: {
      primaryColor: "#EC407A",
      secondaryColor: "#26C6DA",
      backgroundColor: "#FFF9F5",
      textColor: "#3D2C3F",
      fontFamily: "classic",
      colors: {
        primary: "#EC407A",
        secondary: "#26C6DA",
        background: "#FFF9F5",
        text: "#3D2C3F",
      },
      typography: { fontFamily: "classic" },
      navbar: { backgroundColor: "#EC407A", textColor: "#FFFFFF" },
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Les 30 ans de Léa !",
          subtitle: "Une soirée à ne pas manquer",
          eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/particulier/Theme 1.png",
          backgroundColor: "#EC407A",
          showCountdown: true,
          ctaText: "Je viens !",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#26C6DA",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "xl", fontFamily: "classic", textColor: "#FFFFFF" },
        },
      },
      {
        id: "text-image-1",
        type: "text-image",
        position: 1,
        config: {
          title: "Le mot du jour",
          text: "30 ans ça se fête, et surtout pas tout seul ! On vous attend pour une soirée pleine de musique, de rires et (forcément) de gâteau. Tenue festive vivement conseillée. Aucune excuse acceptée — sauf si vous apportez les bonbons.",
          image: "/template/particulier/Theme 1.png",
          imageAlt: "Anniversaire",
          layout: "text-left",
          backgroundColor: "#FFF9F5",
          textColor: "#3D2C3F",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "classic", textColor: "#EC407A" },
        },
      },
      {
        id: "agenda-1",
        type: "agenda",
        position: 2,
        config: {
          title: "Le programme",
          backgroundColor: "#FFE4F0",
          textColor: "#3D2C3F",
          events: [
            { time: "19:00", title: "Apéro géant", description: "Cocktails, planches & bonne humeur" },
            { time: "20:30", title: "Dîner buffet", description: "Tapas du monde et plats à partager" },
            { time: "22:00", title: "Gâteau & surprises", description: "Avec un petit discours peut-être..." },
            { time: "23:00", title: "Dance floor", description: "DJ et playlist 100% années 2000" },
            { time: "02:00", title: "After", description: "Pour les courageux !" },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "classic", textColor: "#EC407A" },
        },
      },
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 3,
        config: {
          title: "Au menu",
          description: "Buffet généreux et cocktails",
          backgroundColor: "#26C6DA",
          textColor: "#FFFFFF",
          tickets: [
            { id: "m1", name: "Apéro Tapas", price: 0, description: "Olives marinées, charcuterie, fromages affinés", image: "/template/particulier/Theme 1.png", available: true },
            { id: "m2", name: "Buffet du Monde", price: 0, description: "Tacos, sushis, samosas, salades fraîches", image: "/template/particulier/Theme 1.png", available: true },
            { id: "m3", name: "Sweet Bar", price: 0, description: "Gâteau d'anniversaire, bonbons, mignardises", image: "/template/particulier/Theme 1.png", available: true },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "classic", textColor: "#FFFFFF" },
        },
      },
      {
        id: "text-image-2",
        type: "text-image",
        position: 4,
        config: {
          title: "Dress code",
          text: "Le thème de la soirée : <strong>FLASHY & FUN</strong> ! Sortez vos couleurs néon, paillettes, tenues kitsch ou rétro. Plus c'est voyant, mieux c'est. Prix du look le plus stylé en fin de soirée 🎉",
          image: "/template/particulier/Theme 1.png",
          imageAlt: "Dress code",
          layout: "text-right",
          backgroundColor: "#FFF9F5",
          textColor: "#3D2C3F",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "classic", textColor: "#EC407A" },
        },
      },
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 5,
        config: {
          title: "Tu viens ?",
          description: "Confirme avant le week-end !",
          fields: [
            { id: "f1", label: "Ton prénom", type: "text", placeholder: "Prénom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "ton@email.com", required: true },
            { id: "f3", label: "Allergies / Régime", type: "text", placeholder: "Si besoin", required: false },
          ],
          buttonText: "Compte sur moi !",
          backgroundColor: "#FFE4F0",
          textColor: "#3D2C3F",
          buttonBackgroundColor: "#EC407A",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "classic", textColor: "#EC407A" },
        },
      },
      {
        id: "location-1",
        type: "location",
        position: 6,
        config: {
          title: "Le lieu",
          address: "Rooftop du 12, 75011 Paris",
          mapUrl: "",
          mapImage: "/template/particulier/Theme 1.png",
          description: "Métro Bastille - Ascenseur jusqu'au 6ème étage",
          backgroundColor: "#FFF9F5",
          textColor: "#3D2C3F",
          titleConfig: { fontSize: "lg", fontFamily: "classic", textColor: "#EC407A" },
        },
      },
      {
        id: "footer-1",
        type: "footer",
        position: 7,
        config: {
          text: "Léa fête ses 30 ans • Merci d'être là !",
          links: [],
          backgroundColor: "#EC407A",
          textColor: "#FFFFFF",
          fontSize: "sm",
        },
      },
    ],
  },
  // ASSOCIATION 2 - Gala de Charité
  {
    id: "gala-charite",
    name: "Gala de Charité",
    thumbnail: "/template/association/Theme 1 (1).jpg",
    description:
      "Template prestigieux pour galas, levées de fonds et événements caritatifs",
    category: "association",
    theme: {
      primaryColor: "#800020",
      secondaryColor: "#D4AF37",
      backgroundColor: "#F8F4ED",
      textColor: "#2A1A1F",
      fontFamily: "elegant",
      colors: {
        primary: "#800020",
        secondary: "#D4AF37",
        background: "#F8F4ED",
        text: "#2A1A1F",
      },
      typography: { fontFamily: "elegant" },
      navbar: { backgroundColor: "#2A1A1F", textColor: "#D4AF37" },
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        position: 0,
        config: {
          title: "Gala de Charité 2025",
          subtitle: "Une soirée pour soutenir l'enfance défavorisée",
          eventDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundType: "image",
          backgroundImage: "/template/association/Theme 1 (1).jpg",
          backgroundColor: "#2A1A1F",
          showCountdown: true,
          ctaText: "Réserver ma table",
          ctaAction: "rsvp",
          textColor: "#FFFFFF",
          buttonBackgroundColor: "#D4AF37",
          buttonTextColor: "#2A1A1F",
          titleConfig: { fontSize: "xl", fontFamily: "elegant", textColor: "#FFFFFF" },
        },
      },
      {
        id: "text-image-1",
        type: "text-image",
        position: 1,
        config: {
          title: "Notre engagement",
          text: "Depuis 15 ans, notre fondation soutient des projets éducatifs pour les enfants en situation précaire. Chaque année, le gala permet de financer écoles, fournitures, et bourses d'études. En 2024, ce sont plus de 800 enfants qui ont pu être accompagnés grâce à votre générosité.",
          image: "/template/association/Theme 1 (1).jpg",
          imageAlt: "Engagement",
          layout: "text-left",
          backgroundColor: "#F8F4ED",
          textColor: "#2A1A1F",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#800020" },
        },
      },
      {
        id: "agenda-1",
        type: "agenda",
        position: 2,
        config: {
          title: "Déroulement de la soirée",
          backgroundColor: "#EFE7D9",
          textColor: "#2A1A1F",
          events: [
            { time: "19:00", title: "Cocktail d'accueil", description: "Champagne et présentation des œuvres" },
            { time: "20:00", title: "Dîner gastronomique", description: "Menu signé par le chef étoilé Maxime Rolland" },
            { time: "21:30", title: "Vente aux enchères", description: "Lots exclusifs et expériences uniques" },
            { time: "22:30", title: "Concert privé", description: "Récital de pianiste invité" },
            { time: "23:30", title: "Bal de clôture", description: "Orchestre et danse" },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#800020" },
        },
      },
      {
        id: "ticketing-1",
        type: "ticketing",
        position: 3,
        config: {
          title: "Réservation",
          description: "Une partie du prix est reversée à la fondation",
          backgroundColor: "#2A1A1F",
          textColor: "#F8F4ED",
          tickets: [
            { id: "t1", name: "Place individuelle", price: 350, description: "Cocktail, dîner et accès aux enchères", image: "/template/association/Theme 1 (1).jpg", available: true },
            { id: "t2", name: "Table de 8", price: 2600, description: "Table privée, bouteille de champagne offerte", image: "/template/association/Theme 1 (1).jpg", available: true },
            { id: "t3", name: "Mécène", price: 5000, description: "Table VIP + mention au programme + invitation rencontre privée", image: "/template/association/Theme 1 (1).jpg", available: true },
          ],
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#D4AF37" },
        },
      },
      {
        id: "speakers-1",
        type: "speakers",
        position: 4,
        config: {
          title: "Comité d'honneur",
          speakers: [
            { id: "c1", name: "Mme. Hélène de Verneuil", role: "Présidente d'honneur", bio: "Mécène et fondatrice", image: "/template/association/Theme 1 (1).jpg" },
            { id: "c2", name: "M. Antoine Dubreuil", role: "Parrain 2025", bio: "Acteur et ambassadeur", image: "/template/association/Theme 1 (1).jpg" },
            { id: "c3", name: "Dr. Camille Roussel", role: "Directrice scientifique", bio: "Pédiatre et chercheuse", image: "/template/association/Theme 1 (1).jpg" },
          ],
          backgroundColor: "#F8F4ED",
          textColor: "#2A1A1F",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#800020" },
        },
      },
      {
        id: "text-image-2",
        type: "text-image",
        position: 5,
        config: {
          title: "Dress code",
          text: "Tenue de soirée exigée — smoking ou costume sombre pour ces messieurs, robe longue ou de cocktail pour ces dames. Une vestiaire est mis à votre disposition à l'entrée.",
          image: "/template/association/Theme 1 (1).jpg",
          imageAlt: "Dress code",
          layout: "text-right",
          backgroundColor: "#EFE7D9",
          textColor: "#2A1A1F",
          fontSize: "md",
          padding: "lg",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#800020" },
        },
      },
      {
        id: "custom-form-1",
        type: "custom-form",
        position: 6,
        config: {
          title: "Confirmer ma présence",
          description: "Inscription jusqu'au 1er du mois précédent",
          fields: [
            { id: "f1", label: "Nom complet", type: "text", placeholder: "Votre nom", required: true },
            { id: "f2", label: "Email", type: "email", placeholder: "votre@email.com", required: true },
            { id: "f3", label: "Téléphone", type: "phone", placeholder: "+33 1 00 00 00 00", required: true },
            { id: "f4", label: "Allergies / régime", type: "text", placeholder: "Précisez si besoin", required: false },
          ],
          buttonText: "Réserver",
          backgroundColor: "#F8F4ED",
          textColor: "#2A1A1F",
          buttonBackgroundColor: "#800020",
          buttonTextColor: "#FFFFFF",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#800020" },
        },
      },
      {
        id: "location-1",
        type: "location",
        position: 7,
        config: {
          title: "Lieu de la soirée",
          address: "Hôtel de Crillon, Paris 8ème",
          mapUrl: "",
          mapImage: "/template/association/Theme 1 (1).jpg",
          description: "Voiturier disponible - Tenue de soirée requise",
          backgroundColor: "#EFE7D9",
          textColor: "#2A1A1F",
          titleConfig: { fontSize: "lg", fontFamily: "elegant", textColor: "#800020" },
        },
      },
      {
        id: "footer-1",
        type: "footer",
        position: 8,
        config: {
          text: "Fondation pour l'Enfance © 2025 - Reconnue d'utilité publique",
          links: [],
          backgroundColor: "#2A1A1F",
          textColor: "#D4AF37",
          fontSize: "sm",
        },
      },
    ],
  },
]
