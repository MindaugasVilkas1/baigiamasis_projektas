import styles from "../styles/forumCard.module.css"
import Button from "./button";
const ForumCard = ({ question, answer }) => {

    return (
        <div className={styles.forumCard}>
            <div className={styles.title}>
                <h3>{question.description}</h3>
                <div>
                <Button
                title="comment"
                />
            </div>
            </div>
            
            {

                answer.filter(item => item.question_id === question.id).map((element, i) =>
                    <div className={styles.content}>
                        <p key={i}>{element.answer}</p>
                    </div>
                )
            }


        </div>
    );
}

export default ForumCard;