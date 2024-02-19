"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import logo from '../../public/assets/images/logo-text.svg'
import menuIcon from '../../public/assets/icons/menu.svg'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button";
  

const MobileNav = () => {
    const pathname = usePathname()
  return (
    <header className="header">
        {/* for logo image */}
        <Link href="/" className="flex items-center gap-2 md:py-2">
            <Image
            src={logo}
            alt="logo"
            width={180}            
            height={28}
            />
        </Link>
        {/* for nav links */}
        <nav className="flex gap-2">
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <Sheet>
                    <SheetTrigger>
                        <Image 
                        src={menuIcon}
                        alt="menu-icon"
                        width={32}
                        height={32}
                        className="cursor-pointer"
                        />
                    </SheetTrigger>
                    <SheetContent className="sheet-content sm:w-64" >
                        <>
                            <Image 
                                src="/assets/images/logo-text.svg"
                                alt="logo"
                                width={152}
                                height={23}
                            />
                            <ul className="header-nav_elements">
                                {
                                    navLinks.slice(0,6).map((link)=>{
                                        const isActive = link.route === pathname
                                        return(
                                            <li 
                                                key={link.route}
                                                className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                                            >
                                            <Link href={link.route} className='sidebar-link cursor-pointer'>
                                                <Image src={link.icon} 
                                                alt="logo" 
                                                width={24} 
                                                height={24} 
                                            />
                                            {link.label}
                                            </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                    </SheetContent>
                    </Sheet>
            </SignedIn>
            <SignedOut>
              <Button asChild className="button bg-purple-gradient bg-cover">
                <Link href="/sign-in">
                  Login
                </Link>
              </Button>
            </SignedOut>

        </nav>
        
    </header>
  )
}

export default MobileNav