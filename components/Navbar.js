import classes from './Navbar.module.css';
import Link from 'next/link'
import { signout, signOut, useSession } from 'next-auth/client'

export default function Navbar(props) {
    const [session, loading] = useSession();

    return (
        <header className={classes.header} style={{ background: `${props.home && 'linear-gradient(to bottom, rgba(255,255,255,1),transparent)'}` }}>
            <div className={classes.left}>
                <img src="/logo.png" alt="Draw" />
                <h1>Remíza</h1>
            </div>
            <div className={classes.right}>
                <Link href="/"><a>
                    <p href="#">Home</p>
                </a></Link>
                {session && <Link href="/account"><a>
                    <p href="#">Account</p>
                </a></Link>}
                {!session && <Link href="/auth">
                    <a><p href="#">Sign In</p>
                    </a></Link>} {!session && <Link href="/draw">
                        <a><p href="#" className={classes.btn}>Try it now</p>
                        </a></Link>}
            </div>

        </header>
    )
}