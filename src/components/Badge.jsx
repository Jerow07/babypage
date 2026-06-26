export default function Badge({ children, variant = 'lila', className = '' }) {
  const variants = {
    lila: 'bg-lila text-cacao',
    rosa: 'bg-rosa text-cacao',
    menta: 'bg-menta text-cacao',
    celeste: 'bg-celeste text-cacao',
    arena: 'bg-arena/20 text-arena',
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-display font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
