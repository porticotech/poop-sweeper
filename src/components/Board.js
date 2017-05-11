import React from 'react';
import { fromJS } from 'immutable';

import Row from './Row';

const partition = (size, cols) => {
    let res = [];
    for (let i = 0, l = cols.size || cols.length; i < l; i += size) {
        res.push(cols.slice(i, i + size));
    }
    return fromJS(res);
}

const Board = (props) => {
    return (
    <div className='board'>
        {partition(props.cols, props.tiles).map((tiles) => <Row revealTile={props.revealTile} tiles={tiles} />)}
    </div>
)};

export default Board;
