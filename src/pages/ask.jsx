import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../components/button'
import styles from '../styles/form.module.css'
import style from '../styles/registration.module.css'
import st from '../styles/ask.module.css'
const Register = ({ loggedIn, user, questionGet}) => {
    const [isPending, setIsPending] = useState(false)
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const question = {
            user_id: user.id,
            title: e.target.elements.title.value,
            description: e.target.elements.description.value
        }
        console.log(question)
        setIsPending(true)
        fetch('http://localhost:5000/questions', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(question)
        })
            .then(() => {
                setIsPending(false)
                questionGet()
                navigate('/')
            })
            
    }
    //verify pages
    return (
        <>
            {loggedIn ? (
                <div className={style.registration}>
                    <div className={style.registerTitle}>
                        <h1>Ask question</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
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
            ) :
                <div className={st.message}>
                    <h1>You do not have permision to add a question. Log in!</h1>
                </div>
            }
        </>
    );
}

export default Register;