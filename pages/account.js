import classes from './account.module.css';
import Navbar from "../components/Navbar";
import { getSession, signout } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProjectItem from '../components/ProjectItem';
import { connectToDatabase } from '../util/database';
import { useEffect, useState } from 'react';
import AlertToaster from "../components/AlertToaster";
import Spinner from '../components/Spinner';


export default function Account(props) {
    const projects = JSON.parse(props.projects);
    const [error, setError] = useState(false);
    const [success, SetSuccess] = useState(false);
    const [Spinnerloading, setSpinnerLoading] = useState(false);
    const [projectsList, setProjectsList] = useState(projects);

    const router = useRouter();
    //Unmount toaster
    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(false);
            SetSuccess(false);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [error, success]);


    async function logoutHandler() {
        const data = await signout({ redirect: true, callbackUrl: "/" });
    }

    function newProjectHandler() {
        router.push('/draw')
    }
    async function deleteHandler(id) {
        setSpinnerLoading(true);
        try {
            const res = await fetch("/api/deleteCanvas", {
                method: 'POST',
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            SetSuccess(data.message);
            updateList(id);
        }
        catch (err) {
            setError(err.error)
        }
    }

    function updateList(id) {
        const updatedProjectsList = projectsList.filter(item => item._id !== id);
        setProjectsList(updatedProjectsList)
        setSpinnerLoading(false);
    }


    return (
        <>
            {error && <AlertToaster severity="error" className="alert">{error}</AlertToaster>}
            {success && <AlertToaster severity="success" className="alert">{success}</AlertToaster>}
            {Spinnerloading && <Spinner />}
            <Navbar />
            <div className={classes.header}>
                <h1>Your Art</h1>
                <p onClick={logoutHandler} className={classes.logout}>Logout <img src="./logout.png" alt="Logout" /></p>
            </div>
            <div className={classes.new_art}>
                <p onClick={newProjectHandler}>Create New Art
                    <img src="./add.png" alt="Add new Project" /></p>
            </div>
            <div className={classes.user_art_list}>

                {projectsList?.map(item => <ProjectItem key={item._id} id={item._id} name={item.name} timestamp={item.timestamp} onDelete={deleteHandler.bind('null', item._id)} />)}

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }
    if (session) {
        let client;
        let projectList;
        try {
            client = await connectToDatabase();
            if (!client) throw new Error('Database Connection Failed');
        }
        catch (error) {
            client?.close();
            return {
                props: { error: error.message }
            }
        }

        try {
            const db = client.db();
            projectList = await db.collection('canvasPaths').find({ email: session.user.email }).sort({ timestamp: -1 }).toArray();
            client.close();
            return {
                props: { projects: JSON.stringify(projectList) },
            }
        }
        catch (error) {
            client.close();
            return {
                props: {
                    error: error.message
                }
            }
        }

    }
}