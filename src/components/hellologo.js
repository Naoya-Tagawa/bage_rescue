
import '../style/hellologo.css'
import  bgp from '../assets/image/bgp.svg';
function Hellologo() {
  return (
      <div className='hellologo fade-in'>
        
        <body className='bg-cover bg-center 'style={{backgroundImage:`url(${bgp})`}}>
          <div className="flex flex-col mx-auto min-h-screen">
            <div className=" overflow-hidden h-screen w-screen flex flex-col justify-center items-center ">
              <img src='./logo2.svg' alt="logo"/>

            </div>

          </div>
        </body>
      </div>

      
  );
}

export default Hellologo;
