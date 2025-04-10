"use client"

import type React from "react"

import { Link } from "react-router-dom"

interface ButtonProps {
  onClick?: () => void
  to?: string
  disabled?: boolean
  as?: "button" | "submit" | "Link"
  children: React.ReactNode
  secondary?: boolean
  className?: string
}

const Button = ({
  onClick,
  to = "/#",
  disabled = false,
  as = "button",
  children,
  secondary = false,
  className = "",
}: ButtonProps) => {
  const baseClassName = `${secondary ? "bt-secondary" : "bt-primary"} ${className}`

  if (as === "Link") {
    return (
      <Link className={baseClassName} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <button type={as} className={baseClassName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
