import styles from '../styles/homepage.module.css'

const Home = () => {
    return (
        <div className={styles.homepage}>
            <h1>Welcome to our forum</h1>
            <h2>Only registered and online users can see content</h2>
        </div>
    );
}

export default Home;