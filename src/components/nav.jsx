import { Link } from 'react-router-dom';
import img from '../images/logo1.gif'
import styles from '../styles/nav.module.css'
import Button from './button';

const Nav = ({ token, logout }) => {

    return (
        <div className={styles.navigation}>
            <div>
                <img alt="logo" src={img} />
            </div>
            <div>
                {!token ? (
                    <div>
                        <Link to={'/register'}>Register</Link>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/'}>Home</Link>
                    </div>
                ) :
                    <div>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/ask'}>Ask</Link>
                        <Button
                            title="logout"
                            styles={styles.logout}
                            logout={logout}
                        />
                    </div>
                }


            </div>

        </div>
    );
}

export default Nav;