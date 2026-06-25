import { Link } from 'react-router-dom'

export default function Logo({ size = 'md', showTagline = false }) {
  const sizes = {
    sm: { svg: 28, text: 'text-lg', tag: 'text-xs' },
    md: { svg: 36, text: 'text-2xl', tag: 'text-xs' },
    lg: { svg: 52, text: 'text-4xl', tag: 'text-sm' },
  }
  const s = sizes[size]

  return (
    <Link to="/" className="flex items-center gap-2 group select-none" aria-label="Nubecitta - Inicio">
      <svg
        width={s.svg}
        height={s.svg}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
      >
        <ellipse cx="26" cy="34" rx="20" ry="12" fill="#F7C5CC" />
        <ellipse cx="17" cy="28" rx="10" ry="10" fill="#F7C5CC" />
        <ellipse cx="30" cy="25" rx="13" ry="13" fill="#F7C5CC" />
        <ellipse cx="26" cy="34" rx="20" ry="10" fill="#F7C5CC" />
        <ellipse cx="26" cy="36" rx="20" ry="9" fill="#F7C5CC" />
        <circle cx="26" cy="27" r="11" fill="#F7C5CC" />
        <circle cx="16" cy="30" r="9" fill="#F7C5CC" />
        <circle cx="36" cy="30" r="7" fill="#F7C5CC" />
        <path
          d="M6 36 Q26 46 46 36"
          stroke="#F7C5CC"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <polygon
          points="33,10 35,16 41,16 36,20 38,26 33,22 28,26 30,20 25,16 31,16"
          fill="#D8C5F0"
          opacity="0.9"
        />
      </svg>
      <div>
        <span
          className={`font-display font-bold text-cacao ${s.text} leading-none tracking-tight`}
        >
          Nubecitta
        </span>
        {showTagline && (
          <p className={`font-body text-arena ${s.tag} mt-0.5 leading-none`}>
            Suave desde el primer día
          </p>
        )}
      </div>
    </Link>
  )
}
