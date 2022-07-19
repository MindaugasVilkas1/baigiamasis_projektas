import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../styles/forumCard.module.css"
import style from '../styles/registration.module.css'
import Button from "./button";
import { useState } from "react";
const AnswerCard = ({ answer, user, loggedIn, allUsers, answerGet,isPending}) => {
    const [active, setActive] = useState(false)
    const [update, setUpdate] = useState("")

    const handleClick1 = () => {
        // 👇️ toggle isActive state on click
        setActive(current => !current)
    };
    // delete answer
    const answerDelete = (answerId) => {

        fetch(`http://localhost:5000/answers/${answerId}`, {
            method: "DELETE"
        })
            .then(() => {
                answerGet()
            })
    }
   
    // edit answer
    const edit = (e, id) => {
        e.preventDefault();
        fetch(`http://localhost:5000/answers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                answer: update

            }),

        })
            .then(() => {
                answerGet()
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <div className={styles.content}>
                <p >
                    <span> Posted by:
                        {typeof allUsers !== "undefined" ? (
                            allUsers.filter((user) => {
                                return user.id === answer.user_id
                            }).map(item => item.user_name)
                        ) : (
                            <span>Loading</span>
                        )}
                    </span>{" "}
                    {answer.answer}
                </p>
                {loggedIn ? (
                    <div>
                        {user.id === answer.user_id ? (
                            <div>
                                <Button
                                    title={<DeleteIcon />}
                                    styles={style.button}
                                    handleClick={(() => answerDelete(user.id === answer.user_id ? answer.id : null))}
                                />
                                <Button
                                    title={<EditIcon />}
                                    styles={style.button}
                                    handleClick={() => handleClick1(answer.id)}
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
                <div className={styles.forms}>
                    <form
                        onSubmit={(e) => edit(e, answer.id)}
                        className={active ? `${styles.formDisplay}` : `${styles.form}`}>
                        <input type="text" value={update} onChange={(e) => setUpdate(e.target.value)} />
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
            </div>
        </>
    );
}

export default AnswerCard;