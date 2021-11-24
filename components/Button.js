import classes from './Button.module.css';

export default function Button(props) {
    return (
        <button type={props.type} className={`${classes.btn} ${props.reset && classes.reset_btn} ${props.authBtn && classes.auth_btn} ${props.saveToDB && classes.saveDB}`} onClick={props.onClick}>
            <span className={classes.btn_span}>{props.children}</span>
        </button>
    )
}