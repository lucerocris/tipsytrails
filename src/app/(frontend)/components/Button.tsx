import Link from 'next/link'

type ButtonProps = {
  href: string
  variant?: 'filled' | 'skeleton'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Button({ href, variant = 'filled', children, className = 'w-fit', onClick }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-5 py-3 text-sm md:text-md font-medium rounded-sm'
  const styles = {
    filled: 'text-white bg-primary',
    skeleton: 'text-primary border-primary border',
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`} onClick = {onClick}>
      {children}
    </Link>
  )
}
