import Homechepper from "./Homechepper"
import Homefare from "./Homefare"
import Sliderhome from "./Sliderhome"


function Home() {
  return (
    <div>

    <h1 className="align-self-center">Welcome Everyone</h1>
     
     <div className="container">
        <div className="row justify-content-center align-items-center">
        <div className="col-xs-4 col-md-8- col-lg-12 align-self-center text-center">
        <Homefare/>
        </div>
        </div>
     </div>


    <div className="container">
    <div className="row justify-content-center align-items-center">

    <div className="col-xs-4 col-md-8- col-lg-12 align-self-center text-center"> 
     <Homechepper/>
    </div>
    
    </div>
    
    </div>





    <div className="container">
     
      <div className="row justify-content-center">
          
      <div className=" col-xs-4 col-md-8- col-lg-12 align-self-center text-center" >
      <Sliderhome/>
      </div>
      
      </div>
    </div>
    
    </div>
  )
}

export default Home