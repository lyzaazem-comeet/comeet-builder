import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: { email: "demo@example.com", name: "Demo" },
  })

  const theme = {
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    fontFamily: "Inter",
  }

  // All Blocks template
  const existingTemplate = await prisma.template.findFirst({
    where: { name: "All Blocks" },
    include: { blocks: true },
  })
  const allBlocks =
    existingTemplate ??
    (await prisma.template.create({
      data: {
        name: "All Blocks",
        description: "Template showcasing all available blocks",
        theme,
        blocks: {
          create: [
            {
              type: "header",
              position: 0,
              config: {
                title: "Mon Événement",
                subtitle: "Une expérience inoubliable",
                backgroundImage: "",
                showNavigation: true,
              },
            },
            {
              type: "agenda",
              position: 1,
              config: {
                title: "Programme",
                events: [
                  {
                    time: "09:00",
                    title: "Accueil",
                    description: "Café et networking",
                  },
                  {
                    time: "10:00",
                    title: "Conférence principale",
                    description: "Présentation du thème",
                  },
                ],
              },
            },
            {
              type: "speakers",
              position: 2,
              config: {
                title: "Intervenants",
                speakers: [
                  {
                    name: "Jean Dupont",
                    role: "Expert",
                    bio: "Spécialiste reconnu",
                    image: "",
                  },
                ],
              },
            },
            {
              type: "location",
              position: 3,
              config: {
                title: "Lieu",
                address: "123 Rue de la Paix, Paris",
                mapUrl: "",
                description: "Un lieu d'exception",
              },
            },
            {
              type: "text-image",
              position: 4,
              config: {
                title: "À propos",
                text: "Présentation de l'événement.",
                image: "",
                imageAlt: "",
                layout: "text-left",
                backgroundColor: "#ffffff",
                fontSize: "md",
                padding: "md",
              },
            },
            {
              type: "gallery",
              position: 5,
              config: {
                title: "Galerie",
                images: [],
                layout: "grid",
                autoplay: false,
                showThumbnails: false,
              },
            },
            {
              type: "ticketing",
              position: 6,
              config: {
                title: "Billetterie",
                description: "Choisissez votre billet",
                tickets: [
                  {
                    id: "1",
                    name: "Standard",
                    price: 50,
                    description: "Accès complet",
                    image: "",
                    available: true,
                  },
                ],
              },
            },
            {
              type: "rsvp",
              position: 7,
              config: {
                title: "Inscription",
                description: "Réservez votre place",
                fields: ["name", "email", "company"],
                buttonText: "S'inscrire",
              },
            },
            {
              type: "countdown",
              position: 8,
              config: {
                title: "Compte à rebours",
                eventDate: new Date(
                  Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toISOString(),
                message: "L'événement commence dans",
              },
            },
            {
              type: "faq",
              position: 9,
              config: {
                title: "FAQ",
                questions: [
                  {
                    question: "Où se déroule l'événement ?",
                    answer: "À Paris.",
                  },
                ],
              },
            },
            {
              type: "contact",
              position: 10,
              config: {
                title: "Contact",
                email: "contact@event.com",
                phone: "+33 1 23 45 67 89",
                socialLinks: [],
              },
            },
            {
              type: "footer",
              position: 11,
              config: {
                text: "© 2025 Mon Événement. Tous droits réservés.",
                links: [],
              },
            },
          ],
        },
      },
      include: { blocks: true },
    }))

  // Example website from template
  await prisma.website.upsert({
    where: { slug: "demo-event" },
    update: {},
    create: {
      eventId: "seed-demo-event",
      ownerId: user.id,
      name: "Demo Event",
      slug: "demo-event",
      theme,
      templateId: allBlocks.id,
      published: false,
      blocks: {
        create: allBlocks.blocks.map((b) => ({
          type: b.type,
          position: b.position,
          // Cast or coerce config to Prisma.JsonNull or Prisma.InputJsonValue to satisfy typing
          config: b.config as Prisma.InputJsonValue,
        })),
      },
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
