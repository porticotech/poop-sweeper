import React from 'react';
import Tile from './Tile';

const Row = (props) => (
    <div>
        {props.tiles.map((tile, key) => <Tile tile={tile} key={key} revealTile={props.revealTile} />)}
    </div>
)

export default Row;