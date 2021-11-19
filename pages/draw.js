import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import CanvasReact from "../components/Canvas";
import Navbar from "../components/Navbar";
import useWindowDimensions from "../hooks/usewindowDimension";
import classes from './draw.module.css';

export default function Draw() {
    const canvasRef = useRef();
    const dimensions = useWindowDimensions();
    const [canvasWidth, setCanvasWidth] = useState();
    const [strokeColor, setStrokeColor] = useState('#000');
    const [strokeWidth, setStrokWidth] = useState("4");
    const [canvasColor, setCanvasColor] = useState('White');
    const [eraserWidth, setEraserWidth] = useState("4");
    const [eraserMode, setEraserMode] = useState(false);

    //Set canvas width according to window width
    useEffect(() => {
        const width = dimensions?.width;
        if (!width) return;
        if (width > 1100) {
            setCanvasWidth("800px")
        }
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

    }, [dimensions])

    // UNDO REDO CLEAR FUNCTION
    function canvasHandler(property) {
        console.log(canvasRef.current)
        switch (property) {
            case 'undo':
                canvasRef.current.undo();
                break;
            case 'redo':
                canvasRef.current.redo();
                break;
            case 'clear':
                canvasRef.current.clearCanvas();
                deactivateEraserHandler();
                break;
            case 'reset':
                canvasRef.current.resetCanvas();
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
            case 'strokeColor':
                setStrokeColor(e.target.value);
                break;
            case 'canvasColor':
                setCanvasColor(e.target.value);
                break;
        }
    }

    // DOwnload
    function downloadCanvas(ImgType) {
        // Download as svg
        if (ImgType === 'svg') {
            canvasRef.current.exportSvg().then(data => {
                console.log(data);
            }).catch(e => alert(e.message));
            return;
        }

        //Download as png or jpg
        canvasRef.current.exportImage(ImgType).then(data => {
            const link = document.createElement('a')
            link.href = data
            link.download = 'Image'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }).catch(e => alert(e.message));
    }

    // Active Eraser
    function activateEraserHandler() {
        canvasRef.current.eraseMode(true);
        setEraserMode(true)
    }
    //Activate Pen
    function deactivateEraserHandler() {
        canvasRef.current.eraseMode(false);
        setEraserMode(false)
    }
    return (
        <>
            <Navbar />
            <div className={classes.canvas_container}>
                <div className={classes.canvas_left}>
                    <div className={classes.controls_group}>
                        <div className={classes.undo_redo_clear}>
                            {/* UNDO BUTTON */}
                            <img src="./undo.png" alt="Undo" onClick={canvasHandler.bind(null, 'undo')} />
                            {/* REDO BUTTON */}
                            <img src="./redo.png" alt="Redo" onClick={canvasHandler.bind(null, 'redo')} />

                            {!eraserMode && <img src="./eraser.png" alt="Erase Canvas" onClick={activateEraserHandler} />}
                            {eraserMode && <img src="./eraser-active.png" alt="Erase Canvas" onClick={activateEraserHandler} />}
                            {eraserMode && <img src="./paintbrush.png" alt="Erase Canvas" onClick={deactivateEraserHandler} />}
                            {!eraserMode && <img src="./paintbrush-active.png" alt="Erase Canvas" onClick={deactivateEraserHandler} />}

                            {/* CLEAR CANVAS */}
                            <img src="./clear.png" alt="Clear Canvas" onClick={canvasHandler.bind(null, 'clear')} />
                        </div>
                    </div>
                    <div className={classes.canvas}>
                        <CanvasReact
                            width={canvasWidth}
                            height="500px"
                            strokeColor={strokeColor}
                            strokeWidth={strokeWidth}
                            canvasColor={canvasColor}
                            eraserWidth={eraserWidth}
                            ref={canvasRef} />
                    </div>

                </div>

                {/* CONTROLS */}
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
                        <div className={classes.canvas_control_group}>
                            <label htmlFor="strokeColor">Stroke Color :</label>
                            <input id="strokeColor" type="color" value={strokeColor} onChange={(e) => changeCanvasProps(e, 'strokeColor')} />
                        </div>
                        <div className={`${classes.canvas_control_group} ${classes.canvas_control_export}`}>
                            <label htmlFor="export"> Export as: </label>
                            <Button onClick={downloadCanvas.bind(null, 'png')}>PNG</Button>
                            <Button onClick={downloadCanvas.bind(null, 'svg')}>SVG</Button>
                        </div>
                        <div className={`${classes.canvas_control_group} ${classes.reset_canvas}`}>
                            <Button reset={true} onClick={canvasHandler.bind(null, 'reset')}>Reset Canvas</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}