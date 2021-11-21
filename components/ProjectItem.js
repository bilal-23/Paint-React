import { useRouter } from 'next/router';
import classes from './ProjectItem.module.css';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

export default function ProjectItem({ name, timestamp, id }) {
    const router = useRouter();

    const newDate = new Date(timestamp);
    const month = monthNames[newDate.getMonth()];
    const date = newDate.getDate();
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();

    function openProjectHandler() {
        router.push(`/draw/${id}`)
    }
    return (
        <div className={classes.project_item} onClick={openProjectHandler}>
            <div className={classes.project_item_left}>
                <img src="./project.png" alt="" />
                <p>{name}</p>
            </div>
            <div className={classes.project_item_right}>
                <p>{`${date} ${month}`}</p>
                <p>{`${hour}:${minutes}`}</p>
            </div>
        </div>
    )
}