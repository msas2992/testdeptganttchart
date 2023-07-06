"use client"

import { useState, useEffect } from "react"
import Feed from "@components/Feed"
import { useSession } from "next-auth/react"



const Home = () => {
  const { data: session } = useSession();
  const [ isPneUser, setIsPneUser] = useState(false);

  useEffect (() => {
    if (session?.user && session?.user.pneUser){
      setIsPneUser(true)
    }else{
      setIsPneUser(false)
    }

  }, [session?.user.id])

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Gantt Chart
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">
                 <span className="text-3xl font-bold text-gray">For</span> Test Department 
            </span>
        </h1>
        <p className="desc text-center">
        The Gantt Chart System is a project management tool that facilitates efficient planning, 
        scheduling, and tracking of tasks within projects. 
        </p>
        {isPneUser ? (
          <Feed />
        ) : (
          <span></span>
        )}
        
    </section>
  )
}

export default Home 