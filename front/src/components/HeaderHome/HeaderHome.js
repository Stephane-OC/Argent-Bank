import { NavLink } from "react-router-dom"
import '../../components/HeaderHome/HeaderHome.css';
import argentBankLogo from "../../img/argentBankLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function HeaderHome(){
    return(
        <nav className="main-nav">
            <NavLink to='/' className="main-nav-logo">
                <img
                className="main-nav-logo-image"
                src={argentBankLogo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                <NavLink to='/sign-in' className="main-nav-item">
                    <FontAwesomeIcon icon={faUserCircle} />
                    Sign In
                </NavLink>
            </div>
        </nav>
    )
}

export default HeaderHome