import Navbar from "../components/Navbar";
import classes from './index.module.css'

export default function Home() {
  return (
    <>
      <Navbar home={true} />
      <section className={classes.hero}>
        <div>
          <h1>Unleash your creativity !</h1>
          <p>Art is not what you see,
            but what you make others see.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/bilal-23/Paint-React/main/public/Draw.png" alt="" />
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
        <div>
          <iframe src="https://www.youtube.com/embed/EP_f4fZ-LOk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </section>
      <section className={classes.tech}>
        <h2>Tech Used</h2>
        <ul>
          <li><img src="/nextjs.svg" alt="Next JS" /> <p>NextJS</p></li>
          <li><img src="/next-auth.png" alt="next auth" /> <p>Next Auth</p></li>
          <li><img src="/mongodb.svg" alt="Mongo DB" /> <p>MongoDB</p></li>
          <li><img src="/react-canvas.png" alt="React Canvas" /> <p>React-Canvas-Sketch</p></li>
        </ul>
      </section>
      <section className={classes.about}>
        <h2>About Me</h2>
        <div className={classes.about_container}>
          <div>
            <p>I am a self-taught frontend developer and an Electronics and Communication Engineering student currently in my penultimate year at Medi-Caps University, Indore, India.</p>
            <p>My Skills: Reactjs, Nextjs, Javascript,React-router, TailwindCSS, Bootstrap, SCSS, CSS3, HTML5, Firebase, MongoDB, Redux, and Responsive web design.</p>
            <div className={classes.links}>
              <p>On The Web :</p>
              <a href="https://www.linkedin.com/in/bilalmansuri" target="_blank" rel="noreferrer noopener" className={classes.link_linkedin}>
                <img src="/linkedin.png" alt="linkeind" /> <span>/bilalmansuri</span>
              </a>
              <a href="https://github.com/bilal-23" target="_blank" rel="noreferrer noopener" className={classes.link_github}>
                <img src="/github.png" alt="github" /> <span>/bilal-23</span>
              </a>
              <a href="mailto:mansuribilal101@gmail.com" target="_blank" rel="noreferrer noopener" className={classes.link_gmail}>
                <img src="/gmail.png" alt="gmail" /> <span>/mansuribilal101</span>
              </a>
              <a href="https://www.bilalmansuri.tech/" target="_blank" rel="noreferrer noopener" className={classes.link_portfolio}>
                <img src="/portfolio.png" alt="portfolio" /> <span>/bilalmasuri.tech</span>
              </a>
            </div>
          </div>
          <div>
            <img src="/me.jpg" alt="" />
          </div>
        </div>
      </section>
      <footer className={classes.footer}>
        <p>This project was built as part of the Mintbean Jr. Developer Hackathon.</p>
        <img src="/mintbean.png" alt="" />
      </footer>
    </>
  )
}
