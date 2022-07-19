import styles from "../styles/forumCard.module.css"
import style from '../styles/registration.module.css'
import Button from "./button";
import { useState } from "react";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import DeleteIcon from '@mui/icons-material/Delete';
import AnswerCard from "./answer";
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
const ForumCard = ({ question, user, loggedIn, questionGet, answer, answerGet, allUsers }) => {
    const [isActive, setIsActive] = useState(false)
    const [active, setActive] = useState(false)
    const [isPending, setIsPending] = useState(null)
    const [update, setUpdate] = useState("")
    const handleClick = () => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
    };
    const handleClick1 = () => {
        // 👇️ toggle isActive state on click
        setActive(current => !current)
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
    // edit answer
    const edit = (e, id) => {
        e.preventDefault();
        fetch(`http://localhost:5000/questions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: update,
                updated: true
            }),
        })
            .then(() => {
                questionGet()
            })
            .then(() => {
                setActive(false)
            })
            .catch((err) => console.log(err))
    }
    // post answer kiekvienam klausimui
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
            .then(() =>
                e.target.reset())
            .then(() =>
                setIsActive(false))
    }

    return (
        <div className={styles.forumCard}>
            <div className={styles.title}>
                <h3>{question.description}</h3>
                <div className={styles.forms}>
                    <form
                        onSubmit={(e) => edit(e, question.id)}
                        className={active ? `${styles.formDisplay}` : `${styles.form}`}>
                        <textarea type="text" value={update} required onChange={(e) => setUpdate(e.target.value)} />
                        {!isPending &&
                            <Button
                                title="Edit"
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
                {loggedIn ? (
                    <div className={styles.icons} >
                        <div>
                            <Button
                                title={<ModeCommentIcon />}
                                styles={style.button}
                                handleClick={handleClick}
                            />
                        </div>
                        {user.id === question.user_id ? (
                            <div className={styles.icons}>
                                <div>
                                    <Button
                                        title={<DeleteIcon />}
                                        styles={style.button}
                                        id={question.id}
                                        handleClick={() => handleDelete(question.id)}
                                    />
                                </div>
                                <div>
                                    <Button
                                        title={<EditIcon />}
                                        styles={style.button}
                                        handleClick={() => handleClick1(answer.id)}
                                    />
                                </div>
                                <div>
                                    {question.updated === true ? (
                                        <p className={styles.editedRed}><CircleIcon /></p>
                                    ) :
                                        <p className={styles.editedGreen}><CircleIcon /></p>
                                    }
                                </div>
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

        </div>
    );
}

export default ForumCard;