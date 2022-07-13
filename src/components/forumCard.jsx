import styles from "../styles/forumCard.module.css"
import style from '../styles/registration.module.css'
import Button from "./button";
const ForumCard = ({ question, answer, allUsers }) => {
    console.log(allUsers)
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
            {typeof answer && (
                answer.filter((item) => item.question_id === question.id).map((element, i) =>
                    <div key={i} className={styles.content}>
                        <p>
                        <span> Posted by: 
                        {typeof allUsers !== "undefined" ? (
                           allUsers.filter((user) =>{
                         return user.id === element.user_id 
                           }).map(item => item.user_name
                         )
                        ):(
                            <span>Loading</span>
                        )}
                        </span>{" "}
                            {element.answer}
                        </p>
                    </div>
                )
            )}
        </div>
    );
}

export default ForumCard;