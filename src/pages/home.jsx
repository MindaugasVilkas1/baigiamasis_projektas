import styles from '../styles/homepage.module.css'
import { useEffect, useState } from 'react';
import ForumCard from '../components/forumCard';

const Home = ({ setLoggedIn, setUser, questions, answer, allUsers }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        // fetch verify
        setLoading(true)
        fetch('http://localhost:5000/verify', {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.verify === false) {
                    setLoggedIn(false)
                } else {
                    setLoggedIn(true)
                    setLoading(false)
                    setUser({ user_name: data.user_name, id: data.id, email: data.email })
                }
                
            })
            .catch((err) => {
                setError(err.message)
            })

    }, [])
    return (
        <>
            <div className={styles.homepage}>
            {error && <div>{error}</div>}
            {loading && <div><h1>Loading...</h1></div>}
                {questions &&
                questions.map(item => (
                    <ForumCard
                        key={item.id}
                        question={item}
                        answer={answer}
                        allUsers={allUsers}
                    />

                ))}
            </div>
        </>
    );
}

export default Home;