import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';
import * as actions from '../state/actions';
import UndoButton from './UndoButton';

import './Game.css';

const Game = (props) => (
    <div style={{width: '100%'}}>
        <button className='start-game' onClick={props.startGame}>
            {props.safe ? '😎' : props.dead ? '☠️' : '😀'}
        </button>
        {props.tiles.size && props.tiles.size > 0 &&
            <Board revealTile={props.revealTile} tiles={props.tiles} cols={props.cols} />
        }
    </div>
)

const mapStateToProps = (state) => ({
    tiles: state.get('tiles'),
    cols: state.get('cols'),
    dead: state.get('isDead'),
    safe: state.get('isSafe'),
});

const mapDispatchToProps = (dispatch) => ({
    startGame: (obj) => dispatch(actions.createGame(9, 9, 8)),
    revealTile: (evt) => dispatch(actions.revealTile(evt)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);
