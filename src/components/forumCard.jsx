import styles from "../styles/forumCard.module.css"
import style from '../styles/registration.module.css'
import Button from "./button";
import { useState } from "react";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const ForumCard = ({ question, answer, allUsers, user, loggedIn, answerGet, questionGet }) => {
    const [isActive, setIsActive] = useState(false)
    const [isPending, setIsPending] = useState(false)
    // funkcija pakeisti formos className
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
    // delete answer
    const answerDelete = (answerId) => {
        fetch(`http://localhost:5000/answers/${answerId}`, {
            method: "DELETE"
        })
            .then(() => {
                console.log("answer deleted")
            })
            .then(() => {
                answerGet()
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
                            <Button
                                title={<DeleteIcon />}
                                styles={style.button}
                                id={question.id}
                                handleClick={() => handleDelete(question.id)}
                            />
                        ) : null
                        }
                        <Button
                            title={<ModeCommentIcon />}
                            styles={style.button}
                            handleClick={handleClick}
                        />
                    </div>
                ) :
                    <div className={styles.span}>
                        <span>Prisijunkite, noredami komentuoti arba trinti</span>
                    </div>
                }
            </div>
            {typeof answer && (
                answer.filter((item) => item.question_id === question.id).map((element, i) =>
                    <div key={i} className={styles.content}>
                        <p >
                            <span> Posted by:
                                {typeof allUsers !== "undefined" ? (
                                    allUsers.filter((user) => {
                                        return user.id === element.user_id
                                    }).map(item => item.user_name
                                    )
                                ) : (
                                    <span>Loading</span>
                                )}
                            </span>{" "}
                            {element.answer}

                        </p>
                        {loggedIn ? (
                            <div>
                                {user.id === element.user_id ? (
                                    <div>
                                        <Button
                                            title={<DeleteIcon />}
                                            styles={style.button}
                                            handleClick={(() => answerDelete(user.id === element.user_id ? element.id : null))}
                                        />
                                        <Button
                                            title={<EditIcon />}
                                            styles={style.button}

                                        />
                                    </div>
                                ) : null

                                }
                            </div>
                        ) :
                            <div className={styles.span}>
                                <span>Prisijunkite, noredami trinti arba redaguoti savo komentarus</span>
                            </div>
                        }
                    </div>

                )
            )}
            <div>
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