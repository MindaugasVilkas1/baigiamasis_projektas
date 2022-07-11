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
                    <h1>Ask question</h1>
                </div>
                <form 
                className={styles.form}>
                     <label>Theme</label>
                    <input
                        type="text"
                        required
                        name="title"

                    />
                    <label>Description</label>
                    <textarea
                        type="text"
                        required
                        name="description"
                    />
                   {!isPending &&
                        <Button
                            title="Ask"
                        />}
                    {isPending &&
                        <Button
                            disabled
                            title="Loading..."
                        />}
                </form>
            </div>
        </>
     );
}
 
export default Register;