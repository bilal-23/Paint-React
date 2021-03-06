import React, { forwardRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const CanvasReact = forwardRef((props, ref) => {
    const styles = {
        border: '2px solid gray',
        borderRadius: '3px',
        '-webkit-tap-highlight-color': 'transparent'
    };
    return (
        <ReactSketchCanvas
            style={styles}
            ref={ref}
            exportWithBackgroundImage={true}
            width={props.width}
            height={props.height}
            canvasColor={"white"}
            strokeWidth={props.strokeWidth}
            strokeColor={props.strokeColor}
            eraserWidth={props.eraserWidth}
        />
    )
});
CanvasReact.displayName = "canvasReact";

export default CanvasReact;