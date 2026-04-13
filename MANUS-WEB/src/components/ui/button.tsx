import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import BorderGlow from "@/components/BorderGlow.tsx"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
        outline: "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "bg-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3.5 py-2",
        lg: "h-12 px-6 py-3",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const glowPalette = ["#c084fc", "#f472b6", "#38bdf8"] as const

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    const isFullWidth = className?.split(/\s+/).includes("w-full") ?? false
    const glowBackground = variant === "default" || variant === "destructive" ? "#060010" : "transparent"

    return (
      <BorderGlow
        className={cn("button-glow", isFullWidth ? "w-full" : "inline-grid")}
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor={glowBackground}
        borderRadius={16}
        glowRadius={24}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={[...glowPalette]}
        fillOpacity={0.22}
      >
        <button
          ref={ref}
          type={type}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        />
      </BorderGlow>
    )
  },
)

Button.displayName = "Button"

export { buttonVariants }
