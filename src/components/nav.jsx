import { Link } from 'react-router-dom';
import img from '../images/logo.png'
import styles from '../styles/nav.module.css'
const Nav = () => {
    return (
        <div className={styles.navigation}>
            <div>
                <img alt="logo" src={img} />
            </div>
            <div>
                <Link to={'./register'}>Register</Link>
                <Link to={'./login'}>Login</Link>
                <Link to={'./ask'}>Ask</Link>
                <div>

                </div>
            </div>

        </div>
    );
}

export default Nav;