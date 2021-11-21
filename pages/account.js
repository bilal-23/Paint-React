import classes from './account.module.css';
import Navbar from "../components/Navbar";
import { getSession, signout } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProjectItem from '../components/ProjectItem';
import { connectToDatabase } from '../util/database';


export default function Account(props) {
    const projects = JSON.parse(props.projects);
    const router = useRouter();
    async function logoutHandler() {
        const data = await signout({ redirect: true, callbackUrl: "/" });
    }
    function newProjectHandler() {
        router.push('/draw')
    }
    return (
        <>
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
                {projects?.map(item => <ProjectItem key={item._id} id={item._id} name={item.name} time={item.time} />)}
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