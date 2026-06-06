const RESERVED_SUBDOMAINS = new Set([
  "www",
  "api",
  "app",
  "admin",
  "staging",
  "dev",
  "comeet",
  "comeet-builder",
])

export function getRootDomain(): string | undefined {
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN || process.env.ROOT_DOMAIN
}

export function isReservedSubdomain(subdomain: string): boolean {
  return RESERVED_SUBDOMAINS.has(subdomain.toLowerCase())
}

/** Extract tenant slug from Host header, or null for the builder app itself. */
export function getSubdomainFromHost(host: string, rootDomain?: string): string | null {
  const hostname = host.split(":")[0].toLowerCase()
  const root = (rootDomain || getRootDomain())?.toLowerCase()

  // Local dev: slug.localhost → slug
  if (hostname.endsWith(".localhost")) {
    const subdomain = hostname.slice(0, -".localhost".length)
    return subdomain && !isReservedSubdomain(subdomain) ? subdomain : null
  }

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return null
  }

  if (!root) {
    return null
  }

  if (hostname === root || hostname === `www.${root}`) {
    return null
  }

  if (!hostname.endsWith(`.${root}`)) {
    return null
  }

  const subdomain = hostname.slice(0, -(root.length + 1))
  if (!subdomain || isReservedSubdomain(subdomain)) {
    return null
  }

  return subdomain
}

/** Normalize a value for use as website slug / subdomain (always lowercase). */
export function normalizeWebsiteSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
}

/** Build the public URL for a published event site. */
export function getPublishedSiteUrl(slug: string): string {
  const normalizedSlug = normalizeWebsiteSlug(slug)
  const rootDomain = getRootDomain()

  if (rootDomain) {
    const protocol =
      process.env.NEXT_PUBLIC_APP_PROTOCOL ||
      (process.env.NODE_ENV === "production" ? "https" : "http")
    return `${protocol}://${normalizedSlug}.${rootDomain}`
  }

  const rawAppUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

  const appUrl = rawAppUrl.replace(/\/+$/, "")

  return `${appUrl}/site/${normalizedSlug}`
}
