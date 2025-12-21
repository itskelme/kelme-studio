"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27D182] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#F7F7F7] text-[#0F0E0D] hover:bg-[#F7F7F7]/80",
        secondary: "bg-[#0F0E0D] text-[#F7F7F7] hover:bg-[#1a1917] border border-[#27D182]",
        outline: "border border-[#27D182] text-[#F7F7F7] hover:bg-[#27D182]/10",
        ghost: "text-[#F7F7F7] hover:bg-[#27D182]/10",
        link: "text-[#27D182] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3 rounded-md",
        sm: "px-4 py-2 rounded-md text-xs",
        lg: "px-8 py-4 rounded-md text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "button" : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
