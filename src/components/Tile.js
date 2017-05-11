import React from 'react'
import './Tile.css';

const Tile = (props) =>  {
    if (props.tile.get('isRevealed')) {
        return (
        <div className='Tile'>
            {props.tile.get('isMine') ? '💩' : props.tile.get('threatCount') > 0 ? props.tile.get('threatCount') : ''}
        </div>)
    }
    return (<div className='Tile lid' onClick={() => props.revealTile(props.tile.get('id'))} />)
}

export default Tile