import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Test Department 
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">
                 Project Gantt Chart
            </span>
        </h1>
        <p className="desc text-center">
        The Gantt Chart System is a project management tool that facilitates efficient planning, 
        scheduling, and tracking of tasks within projects. 
        </p>

        <Feed />
    </section>
  )
}

export default Home 