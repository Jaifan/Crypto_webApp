import { Navbar , Welcome , Service , Transaction , Footer  } from "./components"


const   App= ()=>   {

  return (
   
    <div>
      <div>
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
