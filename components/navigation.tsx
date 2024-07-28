"use client"
import { Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { NavButton } from "./nav-button";
import {useMedia} from "react-use"


const routes = [
    {
    href: "/",
    label:"Overview",
    },
    {
        href: "/transaction",
        label:"Transaction",
    },
    {
        href: "/accounts",
        label:"Account",
    },
    {
        href: "/categories",
        label:"Category",
    },
    {
        href: "/settings",
        label:"Settings",
    },
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMedia("(max-width:1024px)", false)
    const router = useRouter();

    console.log({isMobile})
    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }
    const pathname = usePathname();

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outlinenone text-white focus:bg-white/30 transition' variant="outline" size="sm">
                        <Menu className='h-4 w-4'/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className='px-2'>
                    <nav className='flex flex-col gap-y-2 pt-6'>
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className='w-full justify-start'
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    label={ route.label}
                    href={route.href}
                    isActive={route.href === pathname}
                />
            ))}
        </nav>
    )
}