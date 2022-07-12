import { useState } from "react";
import Button from '../components/button'
import styles from '../styles/form.module.css'
import style from '../styles/registration.module.css'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    // use state
    const [isPending, setIsPending] = useState(false)
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const reg = {
            user_name: e.target.elements.user_name.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        setIsPending(true)
        fetch('http://localhost:5000/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reg)
        })
            .then(() => {
                console.log('new user added')
                setIsPending(false)
                navigate('/login')
            })
    }
    return ( 
        <>
        <div className={style.registration}>
                <div className={style.registerTitle}>
                    <h1>Registration</h1>
                </div>
                <form onSubmit={handleSubmit}
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
                            styles={style.button}
                        />}
                    {isPending &&
                        <Button
                            disabled
                            styles={style.button}
                            title="Registering..."
                        />}
                </form>
            </div>
        </>
     );
}
 
export default Register;