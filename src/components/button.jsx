const Button = ({ title, logout, styles, handleClick}) => {
    return (
        <button
        onClick={logout ? logout : null|| handleClick}
        className={styles}
        >
        {title} 
        </button>
    );
}

export default Button;