
import Perfil from '../recursos/perfilvoid.webp';


function CompLogin() {

return (
 <div className='ContenedorLogin'>  
    
    <li className="login">
       <div className="logdiv1"> <p>Invitado</p> <p><a href="/Login">Iniciar Sesion</a> </p></div>
       <div className="logdiv2">
       <img className="fperfil" src={Perfil} alt="minibanner" />
       </div>
                            
    </li>

    </div>
)
}

export default CompLogin