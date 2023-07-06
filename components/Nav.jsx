"use client";

import Link from 'next/link' //allow us to move to the other pages of our application
import Image from 'next/image' // optimize image
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const handleNewUser = () => {
    alert("Please contact admin at Skype id, live:msaifuladham_1")
  }

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/pne_logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className='logo_text'>PNE Electric Sdn Bhd</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            {session?.user.pneUser ? (
              <Link href="/create-prompt"
              className='black_btn'>
                Create Project
              </Link>
            ):(
              <button href="/"
              onClick={handleNewUser}
              className='black_btn'>
                Contact Admin
              </button>
            )}

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
               src={session?.user.image}
               width={37}
               height={37}
               className='rounded-full'
               alt='profile' 
              />
            </Link>
          </div>
        ):(
          <>
          {providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
            </button>
          ))}
          </>
        )}
      </div>
            
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile' 
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ):(
          <>
          {providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
            </button>
          ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav