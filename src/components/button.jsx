const Button = ({ title, styles, handleClick}) => {
    return (
        <button
        onClick={handleClick}
        className={styles}
        >
        {title} 
        </button>
    );
}

export default Button;