import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import CanvasReact from "../components/Canvas";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/usewindowDimension";
import classes from './draw.module.css';

export default function Draw() {
    const canvasRef = useRef();
    const dimensions = useWindowDimensions();
    console.log(dimensions);
    const [canvasWidth, setCanvasWidth] = useState();
    const [strokeColor, setStrokeColor] = useState('#000');
    const [strokeWidth, setStrokWidth] = useState("4");
    const [canvasColor, setCanvasColor] = useState('White');
    const [eraserWidth, setEraserWidth] = useState("4");
    const [eraserMode, setEraserMode] = useState(false);

    useEffect(() => {
        const width = dimensions?.width;
        if (width) {
            if (width < 1100) {
                setCanvasWidth("800px")
            }
            if (width < 900) {
                setCanvasWidth("700px")

            }
            if (width < 700) {
                setCanvasWidth("600px")
            }
            if (width < 600) {
                setCanvasWidth("500px")
            }
            if (width < 500) {
                setCanvasWidth("400px")
            }
            if (width < 450) {
                setCanvasWidth("425px")
            }
            if (width < 400) {
                setCanvasWidth("300px")
            }

        }
    }, [dimensions])

    // UNDO REDO CLEAR FUNCTION
    function canvasHandler(property) {
        switch (property) {
            case 'undo':
                canvasRef.current.undo();
                break;
            case 'redo':
                canvasRef.current.redo();
                break;
            case 'clear':
                canvasRef.current.clearCanvas();
                break;
        }
    }

    // WIDTH COLOR and other stuff
    function changeCanvasProps(e, property) {
        switch (property) {
            case 'strokeWidth':
                setStrokWidth(e.target.value);
                break;
            case 'eraserWidth':
                setEraserWidth(e.target.value)
                break;
        }
    }

    // DOwnload
    function downloadCanvas(ImgType) {
        canvasRef.current.exportImage(ImgType).then(data => {
            const link = document.createElement('a')
            link.href = data
            link.download = 'Image'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }).catch(e => alert(e.message));
    }
    function eraseCanvasHandler() {
        setEraserMode(prevState => !prevState);
        canvasRef.current.eraseMode(eraserMode);
    }
    return (
        <>
            <Navbar />
            <div className={classes.canvas_container}>
                <div className={classes.canvas}>
                    <div className={classes.controls_group}>
                        <div className={classes.undo_redo_clear}>

                            {/* UNDO BUTTON */}
                            <img src="./undo.png" alt="Undo" onClick={canvasHandler.bind(null, 'undo')} />
                            {/* REDO BUTTON */}
                            <img src="./redo.png" alt="Redo" onClick={canvasHandler.bind(null, 'redo')} />

                            {eraserMode && <img src="./eraser.png" alt="Erase Canvas" onClick={canvasHandler.bind(null, 'erase')} />}
                            {!eraserMode && <img src="./paintbrush.png" alt="Erase Canvas" onClick={eraseCanvasHandler} />}

                            {/* CLEAR CANVAS */}
                            <img src="./clear.png" alt="Clear Canvas" onClick={canvasHandler.bind(null, 'clear')} />
                        </div>
                        {/* DOWNLOAD CANVAS */}
                        <div className={classes.save_img}>
                            <Button onClick={downloadCanvas.bind(null, 'jpg')}>Export as JPG</Button>
                        </div>
                    </div>
                    <CanvasReact
                        width={canvasWidth}
                        height="500px"
                        strokeColor={strokeColor}
                        strokeWidth={strokeWidth}
                        canvasColor={canvasColor}
                        eraserWidth={eraserWidth}
                        ref={canvasRef} />
                </div>
                <div className={classes.controls}>
                    <p className={classes.control_heading}>Options</p>
                    <div className={classes.canvas_controls}>
                        <div className={classes.canvas_control_group}>
                            <label htmlFor="strokeWidth">Stroke Width :</label>
                            <input id="strokeWidth" type="range" min="1" max="20" step="1" value={strokeWidth} onChange={(e) => changeCanvasProps(e, 'strokeWidth')} className={classes.range} />
                            <span className={classes.range_value}>{strokeWidth}</span>
                        </div>
                        <div className={classes.canvas_control_group}>
                            <label htmlFor="eraserWidth">Eraser Width :</label>
                            <input id="eraserWidth" type="range" min="1" max="20" step="1" value={eraserWidth} onChange={(e) => changeCanvasProps(e, 'eraserWidth')} className={classes.range} />
                            <span className={classes.range_value}>{eraserWidth}</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}