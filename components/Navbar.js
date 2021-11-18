import classes from './Navbar.module.css';
import Link from 'next/link'

export default function Navbar() {
    return (
        <header className={classes.header}>
            <div className={classes.left}>
                <img src="./logo.png" alt="Draw" />
                <h1>Remíza</h1>
            </div>
            <div className={classes.right}>
                <a href="#">Home</a>
                <Link href="/draw">
                    <a><p href="#" className={classes.btn}>Try it now</p>
                    </a></Link>
            </div>

        </header>
    )
}