import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100",
          buttonBlu:
            "bg-sky-400 text-primary-foreground houver:bg-sky-400/90 border-sky-600 border-b-4 active:border-b-0 ",
          buttonBluO:
            "bg-white text-sky-500 hover:bg-slate-100  ",
          buttonGre:
            "bg-green-400 text-primary-foreground houver:bg-green-400/90 border-green-600  border-b-4 active:border-b-0 ",
          buttonGreO:
            "bg-white text-green-400 hover:bg-slate-100  ",
          danger:
            "bg-red-500 text-primary-foreground houver:bg-red-500/90 border-red-700  border-b-4 active:border-b-0 ",
          dangerOutline:
            "bg-white text-red-400 hover:bg-slate-100  ",
          premium:
            "bg-yellow-400 text-yellow-900 border-yellow-600 border-b-4 active:border-b-0",
          buttonRox:
            "bg-purple-500 text-white  border-purple-700 border-b-4 active:border-b-0",
          buttonRoxO:
            "bg-white text-purple-500 hover:bg-slate-100 ",
          buttonOran:
            "bg-orange-400 text-white  border-orange-600 border-b-4 active:border-b-0",
          buttonOranO:
            "bg-white text-orange-500 hover:bg-slate-100 ",
          ghost:
            "bg-transparent text-slate-500 border-0 border-transparent hover:bg-slate-100 ",
          sidebar:
            "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none ",
          sidebarO:
            "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20  transition-none",
          },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "w-10 h-10",
        rounded: "rounded-full",
      },
      font: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      font: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
