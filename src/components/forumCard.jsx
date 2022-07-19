import styles from "../styles/forumCard.module.css"
import style from '../styles/registration.module.css'
import Button from "./button";
import { useState } from "react";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import DeleteIcon from '@mui/icons-material/Delete';
import AnswerCard from "./answer";
const ForumCard = ({ question, user, loggedIn, questionGet, answer, answerGet, allUsers}) => {
    const [isActive, setIsActive] = useState(false)
    const [isPending, setIsPending] = useState(null)
    const handleClick = () => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
    };
    // delete question
    const handleDelete = (questionId) => {
        fetch(`http://localhost:5000/questions/${questionId}`, {
            method: "DELETE"
        })
            .then(() => {
                console.log("question deleted")
            })
            .then(() => {
                questionGet()
            })
    }
     // post answer funkcija
     const handleSubmit = (e) => {
        e.preventDefault()
        const answer = {
            user_id: user.id,
            question_id: question.id,
            answer: e.target.elements.answer.value
        }
        setIsPending(true)
        fetch('http://localhost:5000/answers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answer)
        })
            .then(() => {
                setIsPending(false)

            })
            .then(() => {
                answerGet()
            })
            .then(() => e.target.reset())
    }

    return (
        <div className={styles.forumCard}>
            <div className={styles.title}>
                <h3>{question.description}</h3>
                {loggedIn ? (
                    <div>
                        {user.id === question.user_id ? (
                            <div>
                                <Button
                                    title={<DeleteIcon />}
                                    styles={style.button}
                                    id={question.id}
                                    handleClick={() => handleDelete(question.id)}
                                />
                                <Button
                                    title={<ModeCommentIcon />}
                                    styles={style.button}
                                    handleClick={handleClick}
                                />
                            </div>
                        ) : null
                        }
                    </div>
                ) :
                    <div className={styles.span}>
                        <span>Prisijunkite, noredami komentuoti arba trinti</span>
                    </div>
                }
            </div>
            {typeof answer && (
                answer.filter((item) => item.question_id === question.id).map((element) =>
                    <AnswerCard
                        key={element.id}
                        answer={element}
                        user={user}
                        loggedIn={loggedIn}
                        question={question}
                        handleClick={handleClick}
                        isActive={isActive}
                        isPending={isPending}
                        answerGet={answerGet}
                        allUsers={allUsers}
                    />
                ))}
             <div className={styles.forms}>
                    <form
                        onSubmit={handleSubmit}
                        className={isActive ? `${styles.formDisplay}` : `${styles.form}`}>
                        <input type="text" name='answer' placeholder="Comment" />
                        {!isPending &&
                            <Button
                                title="Submit"
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
        </div>
    );
}

export default ForumCard;