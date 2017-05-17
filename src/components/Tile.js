import React from 'react'
import './Tile.css';

/**
 * Function for slowing down an application for testing purposes
 */
const sleepFor = ( sleepDuration ) => {
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

export default class Tile extends React.Component {

    /**
     * Determines whether or not a tile component needs to re-render
     * @param {object} newProps The new props being sent to the component for rendering
     */
    shouldComponentUpdate(newProps) {
        return true
    }

    /**
     * Renders an individual tile
     */
    render() {
        console.log('rendering tile ', this.props.tile.get('id'));
        sleepFor(5);    // Intentionally make the render of a tile slow
        if (this.props.tile.get('isRevealed')) {
            return (
            <div className='Tile'>
                {this.props.tile.get('isPoop') ? '💩' : this.props.tile.get('threatCount') > 0 ? this.props.tile.get('threatCount') : ''}
            </div>)
        }
        return (
            <div className='Tile lid' onClick={() => this.props.revealTile(this.props.tile.get('id'))}>
            </div>
        )
    }
}
