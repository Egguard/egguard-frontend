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

const Button = (props: ButtonProps) => {
  const baseClassName = `${props.secondary ? "bt-secondary" : "bt-primary"} ${props.className}`

  if (props.as === "Link") {
    return (
      <Link className={baseClassName} to={props.to || "/#"}>
        {props.children}
      </Link>
    )
  }

  return (
    <button type={props.as} className={baseClassName} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export default Button
