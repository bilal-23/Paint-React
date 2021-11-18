import classes from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={classes.header}>
            <div className={classes.left}>
                <img src="./logo.png" alt="Draw" />
                <h1>Remíza</h1>
            </div>
            <div className={classes.right}>
                <a href="#">Home</a>
                <a href="#" className={classes.btn}>Try it now</a>
            </div>

        </header>
    )
}