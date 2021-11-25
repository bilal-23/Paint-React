import classes from './Spinner.module.css';

function Spinner() {
    return (
        <>
            <div className={classes.backdrop}></div>
            <div className={classes["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </>
    )
}

export default Spinner;