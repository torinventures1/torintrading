import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center',
          {
            'bg-gradient-to-r from-purple to-purple-dark hover:from-purple-light hover:to-purple text-white shadow-lg shadow-purple/20 hover:shadow-purple/30': variant === 'primary',
            'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple/30': variant === 'secondary',
            'bg-transparent hover:bg-white/5 text-white': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-8 py-3.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
