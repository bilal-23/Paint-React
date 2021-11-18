import classes from './Button.module.css';

export default function Button(props) {
    return (
        <button className={classes.btn} onClick={props.onClick}>
            <span className={classes.btn_span}>{props.children}</span>
        </button>
    )
}