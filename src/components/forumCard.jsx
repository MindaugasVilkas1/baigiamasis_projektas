import styles from "../styles/forumCard.module.css"
import style from '../styles/registration.module.css'
import Button from "./button";
const ForumCard = ({ question, answer }) => {

    return (
        <div className={styles.forumCard}>
            <div className={styles.title}>
                <h3>{question.description}</h3>
                <div>
                <Button
                title="comment"
                styles={style.button}
                />
            </div>
            </div>
            {
                answer.filter((item, i) => item.question_id === question.id).map((element, i) =>
                    <div key={i} className={styles.content}>
                        <p key={i}>{element.answer}</p>
                    </div>
                )
            }


        </div>
    );
}

export default ForumCard;