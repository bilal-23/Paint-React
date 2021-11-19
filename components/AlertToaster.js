import ReactDOM from 'react-dom';
import Alert from '@material-ui/lab/Alert'
import classes from './AlertToaster.module.css';

function AlertToaster(props) {

    return ReactDOM.createPortal(
        <Alert severity={props.severity} color={props.color} className={classes.alert}>
            {props.children}
        </Alert>,
        document.getElementById('alert')
    );
}
export default AlertToaster;