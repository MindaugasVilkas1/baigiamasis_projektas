import styles from '../styles/homepage.module.css'
import ForumCard from "../components/forumCard";
const QuestionById = ({questionsByid, answer,answerGet, allUsers, loggedIn, user, }) => {
console.log(questionsByid)
    return (
        <>
            <div className={styles.homepage}>
                {typeof questionsByid &&
                    <ForumCard
                    key={questionsByid.id}
                    question={questionsByid}
                    answer={answer}
                    allUsers={allUsers}
                    loggedIn={loggedIn}
                    user={user}
                    answerGet={answerGet}
                    />
                }
            </div>
        </>
    );
}

export default QuestionById;