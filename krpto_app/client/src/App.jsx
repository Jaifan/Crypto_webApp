import { Navbar , Welcome , Service , Transaction , Footer  } from "./components"

const   App= ()=>   {
  return (
   
    <div className="min-h-screen">
      <div className="gradiant-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Service />
      <Transaction />
      <Footer />
    </div>    

  )
}

export default App
