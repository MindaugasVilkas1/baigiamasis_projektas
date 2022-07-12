import { useState } from "react";
import Button from '../components/button'
import styles from '../styles/form.module.css'
import style from '../styles/registration.module.css'
import { useNavigate } from 'react-router-dom'
const Login = () => {
   const [isPending, setIsPending] = useState(false)
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const reg = {
            user_name: e.target.elements.user_name.value,
            password: e.target.elements.password.value
        }
        setIsPending(true)
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reg)
        })
            .then(res => res.json())
            .then(res => {
                setIsPending(false)
                if (res.err) return alert(res.err)
                if (res.token) {
                    localStorage.setItem('Token', res.token)
                    navigate('/')
                }
            })
    }
    return ( 
        <>
        <div className={style.registration}>
                <div className={style.registerTitle}>
                    <h1>Login</h1>
                </div>
                <form 
                onSubmit={handleSubmit}
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
                            styles={style.button}
                        />}
                    {isPending &&
                        <Button
                            disabled
                            title="Logiing..."
                            styles={style.button}
                        />}
                </form>
            </div>
        </>
     );
}
 
export default Login;