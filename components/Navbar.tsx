"use client"

import Image from "next/image"

import Link from "next/link"

export function Navbar() {

  return (
    <header className="fixed top-0 w-full z-50 bg-black">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/assets/logoYwc20.png" alt="Logo bring from YWC" width={50} height={50} />
          </Link>
          <nav className="md:flex items-center gap-6 ml-6">
            <Link href="/candidate" className="text-sm font-medium hover:underline underline-offset-4 text-white">
              Candidate
            </Link>
          </nav>
        </div>

        {/* <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <Button variant="outline" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          <Button variant="default" size="sm">
            Sign In
          </Button>
        </div> */}
      </div>
    </header>
  )
}
