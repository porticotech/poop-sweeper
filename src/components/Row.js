import React from 'react';
import Tile from './Tile';
import './Row.css';

const Row = (props) => (
    <div className="Row">
        {props.tiles.map((tile, key) => <Tile tile={tile} key={key} revealTile={props.revealTile} />)}
    </div>
)

export default Row;