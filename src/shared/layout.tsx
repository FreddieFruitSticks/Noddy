import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PublicLayout =  ({children}) => {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="m-1 h-full bg-background">
            <nav className="bg-gray-800 mb-5">
                <div className="max-w-7xl mx-auto px-2 min-sm:px-6 min-lg:px-8">
                    <div className="relative flex items-center justify-between h-21">
                    <div className="absolute inset-y-0 left-0 flex items-center min-sm:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                        <svg onClick={() => setMenuOpen(!menuOpen)} className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center min-sm:items-stretch min-sm:justify-start">
                        <div className="flex-shrink-0">
                        <img className="block min-lg:hidden h-20 w-auto" src="/img/noddypartylogo.png" alt="Noddy logo"/>
                        <img className="hidden min-lg:block h-20 w-auto" src="/img/noddypartylogo.png" alt="Noddy logo"/>
                        </div>
                        <div className="hidden min-sm:block min-sm:ml-6">
                        <div className="flex">
                            <Link href="/" as="/"> 
                                <a className={`px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"}  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                    Home
                                </a>
                            </Link>
                            <Link href="/projects" as="/projects"> 
                                <a className={`ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/projects' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"} focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                    Projects
                                </a>
                            </Link>
                            <Link href="/party-details"> 
                                <a className={`ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/party-details' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"} focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                    Party Details
                                </a>
                            </Link>
                            <Link href="/blog" as="/blog">
                                <a className={`ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/blog' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"} focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                    Blog
                                </a>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className={`${!menuOpen && "hidden min-sm:hidden"}`}>
                    <div className="px-2 pt-2 pb-3">
                        <Link href="/" as="/"> 
                            <a className={`block px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"}  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                Home
                            </a>
                        </Link>
                        <Link href="/projects" as="/projects"> 
                            <a className={`block px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/projects' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"} focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                Projects
                            </a>
                        </Link>
                        <Link href="/party-details"> 
                            <a className={`block px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/party-details' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"} focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                Party Details
                            </a>
                        </Link>
                        <Link href="/blog" as="/blog">
                            <a className={`block px-3 py-2 rounded-md text-sm font-medium leading-5 ${router.pathname === '/blog' ? "text-white bg-gray-900" : "text-gray-300 hover:text-white hover:bg-gray-700"} focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}>
                                Blog
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    )
}

export default PublicLayout