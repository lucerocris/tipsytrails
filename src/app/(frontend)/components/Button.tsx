import Link from 'next/link'

type ButtonProps = {
  href: string
  variant?: 'filled' | 'skeleton' | 'light'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Button({
  href,
  variant = 'filled',
  children,
  className = 'w-fit',
  onClick,
}: ButtonProps) {
  const styles = {
    filled: 'btn-primary',
    skeleton: 'btn-secondary',
    light: 'btn-light',
  }

  return (
    <Link href={href} className={`btn ${styles[variant]} ${className}`} onClick={onClick}>
      {children}
    </Link>
  )
}
