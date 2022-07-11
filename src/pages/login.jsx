import { useState } from "react";
import Button from '../components/button'
import styles from '../styles/form.module.css'
import style from '../styles/registration.module.css'
const Login = () => {
    const [isPending, setIsPending] = useState(false)
    return ( 
        <>
        <div className={style.registration}>
                <div className={style.registerTitle}>
                    <h1>Login</h1>
                </div>
                <form 
                className={styles.form}>
                     <label>User name</label>
                    <input
                        type="text"
                        required
                        name="user_name"

                    />
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        name="password"
                    />
                   {!isPending &&
                        <Button
                            title="Login"
                        />}
                    {isPending &&
                        <Button
                            disabled
                            title="Logiing..."
                        />}
                </form>
            </div>
        </>
     );
}
 
export default Login;