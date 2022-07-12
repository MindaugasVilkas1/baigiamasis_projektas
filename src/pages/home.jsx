import styles from '../styles/homepage.module.css'
import { useEffect, useState } from 'react';
import ForumCard from '../components/forumCard';

const Home = () => {
    const token = localStorage.getItem('Token');
    const [questions, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    useEffect(() => {
        // get all questions
        fetch('http://localhost:5000/questions')
            .then(res => res.json())
            .then(data => setQuestion(data));
        // get all answers
        fetch('http://localhost:5000/answers')
            .then(res => res.json())
            .then(data => setAnswer(data));
    }, [])
    return (
        <>
            {!token
                ? (<div className={styles.title}>
                    <h1>Only registered and loged in users can see this content</h1>
                </div>

                ) :
                <div className={styles.homepage}>
                    {questions.map(item => (
                        <ForumCard
                            key={item.id}
                            question={item}
                            answer={answer}
                        />

                    ))}
                </div>
            }
        </>
    );
}

export default Home;