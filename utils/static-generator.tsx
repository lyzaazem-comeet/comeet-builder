import type { BlockData, Theme } from "@/types/blocks"

export interface ExportOptions {
  siteName: string
  description: string
  includeAnalytics: boolean
  analyticsId?: string
  customDomain?: string
}

export function generateStaticSite(
  blocks: BlockData[],
  theme: Theme,
  options: ExportOptions,
): { html: string; css: string; js: string } {
  const css = generateCSS(theme)
  const html = generateHTML(blocks, theme, options)
  const js = generateJS(blocks)

  return { html, css, js }
}

function generateCSS(theme: Theme): string {
  return `
/* Generated CSS for Event Site */
:root {
  --primary: ${theme.colors.primary};
  --secondary: ${theme.colors.secondary};
  --background: ${theme.colors.background};
  --text: ${theme.colors.text};
  --font-family: ${theme.typography.fontFamily};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 60px 0;
}

.section:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.02);
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  font-weight: 600;
}

h1 { font-size: 3rem; }
h2 { font-size: 2.5rem; }
h3 { font-size: 2rem; }
h4 { font-size: 1.5rem; }

p {
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--secondary);
}

.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.countdown {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.countdown-item {
  text-align: center;
  min-width: 80px;
}

.countdown-number {
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary);
  display: block;
}

.countdown-label {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s;
}

.gallery img:hover {
  transform: scale(1.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(var(--primary), 0.2);
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}

.faq-question {
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  opacity: 0.8;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .section {
    padding: 40px 0;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.8rem; }
  h3 { font-size: 1.5rem; }
  
  .countdown {
    gap: 1rem;
  }
  
  .countdown-number {
    font-size: 2rem;
  }
}
`
}

function generateHTML(blocks: BlockData[], theme: Theme, options: ExportOptions): string {
  const blocksHTML = blocks.map((block) => generateBlockHTML(block)).join("\n")

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${options.siteName}</title>
    <meta name="description" content="${options.description}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${theme.typography.fontFamily.replace(" ", "+")}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    ${
      options.includeAnalytics && options.analyticsId
        ? `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${options.analyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${options.analyticsId}');
    </script>
    `
        : ""
    }
</head>
<body>
    ${blocksHTML}
    <script src="script.js"></script>
</body>
</html>`
}

function generateBlockHTML(block: BlockData): string {
  switch (block.type) {
    case "header":
      return `
<section class="section" id="header">
    <div class="container text-center">
        <h1>${block.data.title || "Titre de l'événement"}</h1>
        <p class="mb-8">${block.data.subtitle || "Sous-titre de l'événement"}</p>
        <p class="mb-4">${block.data.date || "Date de l'événement"}</p>
        <p class="mb-8">${block.data.location || "Lieu de l'événement"}</p>
        <a href="#rsvp" class="btn">S'inscrire maintenant</a>
    </div>
</section>`

    case "agenda":
      const agendaItems = block.data.items || []
      return `
<section class="section" id="agenda">
    <div class="container">
        <h2 class="text-center mb-8">Programme</h2>
        <div class="grid grid-2">
            ${agendaItems
              .map(
                (item: any) => `
            <div class="card">
                <h4>${item.time}</h4>
                <h3 class="mb-4">${item.title}</h3>
                <p>${item.description}</p>
                ${item.speaker ? `<p class="mt-4"><strong>Intervenant:</strong> ${item.speaker}</p>` : ""}
            </div>
            `,
              )
              .join("")}
        </div>
    </div>
</section>`

    case "speakers":
      const speakers = block.data.speakers || []
      return `
<section class="section" id="speakers">
    <div class="container">
        <h2 class="text-center mb-8">Intervenants</h2>
        <div class="grid grid-3">
            ${speakers
              .map(
                (speaker: any) => `
            <div class="card text-center">
                <img src="${speaker.image || "/placeholder.svg?height=150&width=150"}" alt="${speaker.name}" style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 1rem; object-fit: cover;">
                <h3>${speaker.name}</h3>
                <p class="mb-4">${speaker.title}</p>
                <p>${speaker.bio}</p>
            </div>
            `,
              )
              .join("")}
        </div>
    </div>
</section>`

    case "location":
      return `
<section class="section" id="location">
    <div class="container">
        <h2 class="text-center mb-8">Lieu</h2>
        <div class="grid grid-2">
            <div>
                <h3 class="mb-4">${block.data.name || "Nom du lieu"}</h3>
                <p class="mb-4">${block.data.address || "Adresse du lieu"}</p>
                <p class="mb-4">${block.data.description || "Description du lieu"}</p>
                <a href="${block.data.mapsUrl || "#"}" class="btn" target="_blank">Voir sur la carte</a>
            </div>
            <div class="card">
                <h4 class="mb-4">Informations pratiques</h4>
                <p><strong>Accès:</strong> ${block.data.access || "Informations d'accès"}</p>
                <p><strong>Parking:</strong> ${block.data.parking || "Informations parking"}</p>
                <p><strong>Transport:</strong> ${block.data.transport || "Informations transport"}</p>
            </div>
        </div>
    </div>
</section>`

    case "rsvp":
      return `
<section class="section" id="rsvp">
    <div class="container">
        <h2 class="text-center mb-8">Inscription</h2>
        <div class="card" style="max-width: 600px; margin: 0 auto;">
            <form id="rsvp-form">
                <div class="form-group">
                    <label for="name">Nom complet *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="company">Entreprise</label>
                    <input type="text" id="company" name="company">
                </div>
                <div class="form-group">
                    <label for="dietary">Restrictions alimentaires</label>
                    <textarea id="dietary" name="dietary" rows="3"></textarea>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Confirmer mon inscription</button>
            </form>
        </div>
    </div>
</section>`

    case "gallery":
      const images = block.data.images || []
      return `
<section class="section" id="gallery">
    <div class="container">
        <h2 class="text-center mb-8">Galerie</h2>
        <div class="gallery">
            ${images
              .map(
                (image: any) => `
            <img src="${image.url || "/placeholder.svg?height=200&width=300"}" alt="${image.caption || "Image de galerie"}" onclick="openModal('${image.url}')">
            `,
              )
              .join("")}
        </div>
    </div>
</section>`

    case "faq":
      const faqItems = block.data.items || []
      return `
<section class="section" id="faq">
    <div class="container">
        <h2 class="text-center mb-8">Questions fréquentes</h2>
        <div style="max-width: 800px; margin: 0 auto;">
            ${faqItems
              .map(
                (item: any, index: number) => `
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFaq(${index})">
                    <span>${item.question}</span>
                    <span id="faq-icon-${index}">+</span>
                </div>
                <div class="faq-answer" id="faq-answer-${index}" style="display: none; margin-top: 1rem;">
                    ${item.answer}
                </div>
            </div>
            `,
              )
              .join("")}
        </div>
    </div>
</section>`

    case "contact":
      return `
<section class="section" id="contact">
    <div class="container">
        <h2 class="text-center mb-8">Contact</h2>
        <div class="grid grid-2">
            <div>
                <h3 class="mb-4">Informations de contact</h3>
                <p class="mb-4"><strong>Email:</strong> ${block.data.email || "contact@event.com"}</p>
                <p class="mb-4"><strong>Téléphone:</strong> ${block.data.phone || "+33 1 23 45 67 89"}</p>
                <p class="mb-4"><strong>Adresse:</strong> ${block.data.address || "Adresse de contact"}</p>
            </div>
            <div class="card">
                <form id="contact-form">
                    <div class="form-group">
                        <label for="contact-name">Nom *</label>
                        <input type="text" id="contact-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Email *</label>
                        <input type="email" id="contact-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message *</label>
                        <textarea id="contact-message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Envoyer le message</button>
                </form>
            </div>
        </div>
    </div>
</section>`

    case "footer":
      return `
<footer class="section" style="background: rgba(0, 0, 0, 0.2); margin-top: 4rem;">
    <div class="container text-center">
        <h3 class="mb-4">${block.data.title || "Titre de l'événement"}</h3>
        <p class="mb-4">${block.data.description || "Description de l'événement"}</p>
        <div class="mb-4">
            ${
              block.data.socialLinks
                ?.map(
                  (link: any) => `
            <a href="${link.url}" class="btn btn-secondary" style="margin: 0 0.5rem;" target="_blank">${link.platform}</a>
            `,
                )
                .join("") || ""
            }
        </div>
        <p style="opacity: 0.6; font-size: 0.9rem;">© 2025 ${block.data.title || "Événement"}. Tous droits réservés.</p>
    </div>
</footer>`

    default:
      return ""
  }
}

function generateJS(blocks: BlockData[]): string {
  const hasHero = blocks.some((block) => block.type === "hero")
  const hasFaq = blocks.some((block) => block.type === "faq")
  const hasGallery = blocks.some((block) => block.type === "gallery")
  const hasRsvp = blocks.some((block) => block.type === "rsvp")
  const hasContact = blocks.some((block) => block.type === "contact")

  let js = `// Generated JavaScript for Event Site\n\n`

  if (hasHero) {
    const heroBlock = blocks.find((block) => block.type === "hero")
    const targetDate = heroBlock?.data?.eventDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    js += `
// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('${targetDate}').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown-timer').innerHTML = '<h3>L\\'événement a commencé!</h3>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
`
  }

  if (hasFaq) {
    js += `
// FAQ Toggle
function toggleFaq(index) {
    const answer = document.getElementById('faq-answer-' + index);
    const icon = document.getElementById('faq-icon-' + index);
    
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        icon.textContent = '-';
    } else {
        answer.style.display = 'none';
        icon.textContent = '+';
    }
}
`
  }

  if (hasGallery) {
    js += `
// Gallery Modal
function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.style.cssText = \`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    \`;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = \`
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    \`;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.onclick = function() {
        document.body.removeChild(modal);
    };
}
`
  }

  if (hasRsvp) {
    js += `
// RSVP Form
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('RSVP Data:', data);
    
    alert('Merci pour votre inscription! Nous vous confirmerons par email.');
    this.reset();
});
`
  }

  if (hasContact) {
    js += `
// Contact Form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Contact Data:', data);
    
    alert('Merci pour votre message! Nous vous répondrons rapidement.');
    this.reset();
});
`
  }

  js += `
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Event site loaded successfully');
});
`

  return js
}

export function downloadStaticSite(blocks: BlockData[], theme: Theme, options: ExportOptions) {
  const { html, css, js } = generateStaticSite(blocks, theme, options)

  // Create ZIP file content
  const files = [
    { name: "index.html", content: html },
    { name: "styles.css", content: css },
    { name: "script.js", content: js },
    { name: "README.md", content: generateReadme(options) },
  ]

  // Create and download ZIP
  downloadZip(files, `${options.siteName.toLowerCase().replace(/\s+/g, "-")}-site.zip`)
}

function generateReadme(options: ExportOptions): string {
  return `# ${options.siteName}

${options.description}

## Installation

1. Téléchargez tous les fichiers dans un dossier
2. Ouvrez \`index.html\` dans votre navigateur web
3. Pour héberger le site, uploadez tous les fichiers sur votre serveur web

## Fichiers inclus

- \`index.html\` - Page principale du site
- \`styles.css\` - Styles CSS
- \`script.js\` - JavaScript interactif
- \`README.md\` - Ce fichier

## Personnalisation

Vous pouvez modifier les fichiers CSS et JavaScript pour personnaliser davantage votre site.

## Support

Pour toute question, contactez le créateur du site.

---

Site généré avec le Visual Event Builder
`
}

function downloadZip(files: Array<{ name: string; content: string }>, filename: string) {
  // This is a simplified version - in a real implementation, you'd use a library like JSZip
  const zip = files.map((file) => `${file.name}:\n${file.content}\n\n---\n\n`).join("")

  const blob = new Blob([zip], { type: "text/plain" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
