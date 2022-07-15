import { Link } from "react-router-dom";
import styles from '../styles/notFound.module.css'
const NotFound = () => {
    return ( 
        <div className={styles.notfound}>
            <h2>Sorry</h2>
            <p>That page can not be found</p>
            <Link to='/'>Back to the homepage...</Link>
        </div>
     );
}
 
export default NotFound;