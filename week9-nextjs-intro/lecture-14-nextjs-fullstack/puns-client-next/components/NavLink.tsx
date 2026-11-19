"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
    href: string
    children: React.ReactNode
}

export default function NavLink({href, children}: NavLinkProps) {
    const pathname = usePathname()
    return <Link href={href} className={`${pathname === href ? 'active' : ''}`}>{children}</Link>
}