import React from 'react';
import './UndoButton.css';

const UndoButton = (props) => (
    <button className='Undo' onClick={props.undo}>
        Undo
    </button>
)

export default UndoButton;