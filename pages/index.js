import Navbar from "../components/Navbar";
import classes from './index.module.css'

export default function Home() {
  return (
    <>
      <Navbar home={true} />
      <section className={classes.hero}>
        <div>
          <h1>Unleash your creativity !</h1>
          <p>Draw whatever you want, with <span>Remíza</span></p>
        </div>
        <div>
          <img src="/screenshots/draw.png" alt="" />
        </div>
      </section>
      <div className={classes.hero_bg}>
        <video src="/art-bg.mp4" autoPlay muted loop></video>
      </div>
      <section className={classes.features}>
        <div >
          <ul>
            <h2>Features</h2>
            <li> <img src="/list-style.png" alt="List style image" />Stroke and erase width- Variable Width for paint brush and eraser</li>
            <li> <img src="/list-style.png" alt="List style image" />Undo Redo - made a mistake, just undo it</li>
            <li> <img src="/list-style.png" alt="List style image" />Export as PNG - liked your art, save it as a png</li>
            <li> <img src="/list-style.png" alt="List style image" />Save for future purpose - want to work later on your art, save it in the database</li>
            <li> <img src="/list-style.png" alt="List style image" />User Authentication - your art is secure here</li>
            <li> <img src="/list-style.png" alt="List style image" />Color Pallette - Choose your favorite color</li>
            <li> <img src="/list-style.png" alt="List style image" />Reset Canvas - want to start over, reset the canvas</li>
          </ul>
        </div>
      </section>
      <section className={classes.tour}>
        <h2>Tutorial</h2>
      </section>
    </>
  )
}
