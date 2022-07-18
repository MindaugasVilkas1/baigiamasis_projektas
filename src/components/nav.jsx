import { Link } from 'react-router-dom';
import img from '../images/logo1.gif'
import styles from '../styles/nav.module.css'
import Button from './button';

const Nav = ({ loggedIn, user, handleClick }) => {
    return (
        <div className={styles.navigation}>
            <div>
                <img alt="logo" src={img} />
            </div>
            <div>
                {loggedIn ? (
                     <div>
                     <Link to={'/'}>Home</Link>
                     <Link to={'/ask'}>Ask</Link>
                     <Button
                         title="logout"
                         styles={styles.logout}
                         handleClick={handleClick}
                     />
                     <div>
                         <h3>Sveiki prisijungę: {user.user_name}</h3>
                     </div>
                 </div>
                ) :
                <div>
                <Link to={'/register'}>Register</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/'}>Home</Link>
            </div>
                }


            </div>

        </div>
    );
}

export default Nav;