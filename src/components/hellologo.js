
import '../style/hellologo.css'
import  bgp from '../assets/image/bgp.svg';
function Hellologo() {
  return (
      <div className='hellologo fade-in'>
        
        <div className='bg-cover bg-center 'style={{backgroundImage:`url(${bgp})`}}>
          
            <div className="mx-auto  flex  justify-center items-center min-h-screen">
              <img src='./logo2.svg' alt="logo"/>

            </div>

          
        </div>
      </div>

      
  );
}

export default Hellologo;
