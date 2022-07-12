import styles from '../styles/homepage.module.css'
import { useEffect, useState } from 'react';
import ForumCard from '../components/forumCard';

const Home = () => {
    const [questions, setQuestion] = useState([])
    const [answer, setAnswer] = useState([])
    const [auth, setAuth] =useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/questions')
            .then(res => res.json())
            .then(data => setQuestion(data));
        fetch('http://localhost:5000/answers')
            .then(res => res.json())
            .then(data => setAnswer(data))
    }, [])
    return (
        <div className={styles.homepage}>

            {
                questions.map(item => (
                    <ForumCard
                    key={item.id}
                    question={item}
                    answer={answer}
                    />

                ))
            }
        </div>
    );
}

export default Home;