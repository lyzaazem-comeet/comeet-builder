export type BlockType =
  | "header"
  | "hero"
  | "agenda"
  | "speakers"
  | "location"
  | "rsvp" // legacy — kept for backward compatibility with saved data
  | "gallery"
  | "faq"
  | "contact"
  | "footer"
  | "text-image"
  | "ticketing"
  | "custom-form"

export interface Block {
  id: string
  type: BlockType
  position: number
  config: any
}

export interface BlockData {
  id: string
  type: BlockType
  position: number
  data: any
}

export interface Theme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
  }
  typography: {
    fontFamily: string
  }
  showNavbar?: boolean
  navbar?: {
    backgroundColor: string
    textColor: string
  }
}

export interface BlockLibraryItem {
  type: BlockType
  name: string
  description: string
  icon: string
  category: "structure" | "content" | "interactive" | "media"
}

export interface Ticket {
  id: string
  name: string
  price?: number
  description: string
  image?: string
  available: boolean
}

export type FontFamily = "classic" | "elegant" | "modern" | "playful"

export interface TitleConfig {
  textColor?: string
  fontSize?: "sm" | "md" | "lg" | "xl"
  fontFamily?: FontFamily
}

export interface TextConfig {
  textColor?: string
  fontSize?: "sm" | "md" | "lg" | "xl"
  fontFamily?: FontFamily
}

export interface GalleryConfig {
  title: string
  images: Array<{
    id: string
    url: string
    alt: string
    caption?: string
  }>
  layout: "grid" | "carousel-fade" | "carousel-slide"
  autoplay?: boolean
  showThumbnails?: boolean
  titleConfig?: TitleConfig
  textConfig?: TextConfig
}

export interface TextImageConfig {
  title: string
  text: string
  image: string
  imageAlt: string
  layout: "text-left" | "text-right"
  backgroundColor?: string
  textColor?: string
  titleConfig?: TitleConfig
  textConfig?: TextConfig
  padding?: "sm" | "md" | "lg"
  fontSize?: "sm" | "md" | "lg"
  fontFamily?: string
  hideImage?: boolean
}

export interface HeroConfig {
  title: string
  subtitle: string
  eventDate: string
  backgroundImage: string
  showCountdown: boolean
  ctaText: string
  ctaAction: string
  backgroundColor?: string
  titleConfig?: TitleConfig
  textConfig?: TextConfig
}

export interface CustomFormField {
  id: string
  label: string
  type: "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "radio"
  placeholder?: string
  required?: boolean
  options?: string[] // For select and radio fields
  locked?: boolean
}

export interface CustomFormConfig {
  title: string
  description?: string
  fields: CustomFormField[]
  buttonText: string
  backgroundColor?: string
  textColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  fontSize?: string
  fontFamily?: string
  titleConfig?: TitleConfig
  companionsLabel?: string
  companionsDescription?: string
}
