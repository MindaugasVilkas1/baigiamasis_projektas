import { useState } from "react";
import Button from '../components/button'
import styles from '../styles/form.module.css'
import style from '../styles/registration.module.css'
const Register = () => {
    const [isPending, setIsPending] = useState(false)
    return ( 
        <>
        <div className={style.registration}>
                <div className={style.registerTitle}>
                    <h1>Registration</h1>
                </div>
                <form 
                className={styles.form}>
                     <label>User name</label>
                    <input
                        type="text"
                        required
                        name="user_name"

                    />
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        name="email"

                    />
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        name="password"
                    />
                   {!isPending &&
                        <Button
                            title="Register"
                        />}
                    {isPending &&
                        <Button
                            disabled
                            title="Registering..."
                        />}
                </form>
            </div>
        </>
     );
}
 
export default Register;