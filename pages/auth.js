import classes from './auth.module.css';
import Button from "../components/Button";
import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Auth() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLogin, setIsLogin] = useState(true);

    //toggle sign in create-account form
    function toggleHandler() {
        setIsLogin(prevState => !prevState);
    }
    return (
        <>
            <Navbar />
            <section className={classes.auth}>
                <div className={classes.auth_heading}>
                    {isLogin && <h3>Sign In</h3>}
                    {!isLogin && <h3>Create Your Account</h3>}
                </div>
                <form >
                    <div className={classes.form_input_group}>
                        <input type="email" placeholder="Email" ref={emailRef} />
                    </div>
                    <div className={classes.form_input_group}>
                        <input type="password" placeholder="Password" ref={passwordRef} min="6" />
                    </div>
                    <div className={classes.form_input_group}>
                        <Button type="submit" authBtn={true}>{isLogin ? 'Sign In' : 'Create Account'}</Button>
                    </div>
                    {/* <div className={classes.form_input_group}>
                        <Button onClick={demoUserSignIn} type="button" tall={true}>{'Demo User'}</Button>
                    </div> */}
                </form>
                <div className={classes.auth_change}>
                    {isLogin && <p>Don&apos;t have an account? <span onClick={toggleHandler}>Create One</span></p>}
                    {!isLogin && <p>Already have an account? <span onClick={toggleHandler}>Sign In</span></p>}
                </div>
            </section>
        </>

    )
}
