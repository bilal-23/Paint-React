import { forwardRef } from 'React';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const CanvasReact = forwardRef((props, ref) => {

    const styles = {
        border: '2px solid gray',
        borderRadius: '3px'
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

export default CanvasReact;