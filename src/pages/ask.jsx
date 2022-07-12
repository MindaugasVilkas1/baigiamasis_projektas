import { useState } from "react";
import Button from '../components/button'
import styles from '../styles/form.module.css'
import style from '../styles/registration.module.css'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()
    //verify pages
    useEffect(() => {
        const token = localStorage.getItem('Token');
        fetch('http://localhost:5000/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) {
                    localStorage.removeItem('Token');
                    return navigate('/');
                }
            }
            )
    },[navigate])
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
                            styles={style.button}
                        />}
                    {isPending &&
                        <Button
                            disabled
                            title="Loading..."
                            styles={style.button}
                        />}
                </form>
            </div>
        </>
     );
}
 
export default Register;