const Button = ({ title, logout, styles }) => {
    return (
        <button
            onClick={logout ? logout : null}
            className={styles}>
            {title}

        </button>
    );
}

export default Button;