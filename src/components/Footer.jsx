import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-cacao text-cream/80 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo size="sm" />
            </div>
            <p className="font-body text-sm text-cream/60 leading-relaxed mb-4">
              Ropa de bebé con algodón orgánico certificado. Suave desde el primer día.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center hover:bg-rosa/60 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center hover:bg-rosa/60 transition-colors"
                aria-label="TikTok"
              >
                <TiktokIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center hover:bg-rosa/60 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-cream text-sm uppercase tracking-wide mb-4">
              Tienda
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/catalogo', label: 'Todos los productos' },
                { to: '/catalogo?categoria=bodies', label: 'Bodies' },
                { to: '/catalogo?categoria=pijamas', label: 'Pijamas' },
                { to: '/catalogo?categoria=conjuntos', label: 'Conjuntos' },
                { to: '/catalogo?categoria=accesorios', label: 'Accesorios' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-cream text-sm uppercase tracking-wide mb-4">
              Ayuda
            </h4>
            <ul className="space-y-2">
              {[
                'Guía de talles',
                'Envíos y tiempos',
                'Cambios y devoluciones',
                'Preguntas frecuentes',
                'Contacto',
              ].map((l) => (
                <li key={l}>
                  <span className="font-body text-sm text-cream/60 hover:text-cream transition-colors cursor-pointer">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-cream text-sm uppercase tracking-wide mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {['Términos y condiciones', 'Política de privacidad', 'Cookies'].map(
                (l) => (
                  <li key={l}>
                    <span className="font-body text-sm text-cream/60 hover:text-cream transition-colors cursor-pointer">
                      {l}
                    </span>
                  </li>
                )
              )}
            </ul>

            <div className="mt-6">
              <h4 className="font-display font-bold text-cream text-sm uppercase tracking-wide mb-3">
                Medios de pago
              </h4>
              <div className="flex flex-wrap gap-2">
                <PayIcon label="Visa" />
                <PayIcon label="MC" />
                <PayIcon label="MP" />
                <PayIcon label="Naranja" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-cream/40">
          <p>© 2025 Nubecitta · Hecho con ♡ en Argentina</p>
          <p>CUIT 30-12345678-9 · Inscripta en AFIP</p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TiktokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function PayIcon({ label }) {
  return (
    <div className="bg-cream/10 rounded-lg px-2 py-1 text-xs font-display font-bold text-cream/60">
      {label}
    </div>
  )
}
