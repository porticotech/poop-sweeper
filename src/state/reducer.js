import { fromJS, List } from 'immutable';

import * as types from './action-types';
import * as queries from './queries';
import * as commands from './commands';
import { shuffle } from '../utils';

const initialState = {
    present: fromJS({
        cols: 0,
        rows: 0,
        tiles: [],
        isDead: false,
    }),
};

const createTile = (isMine) => fromJS({
    isMine,
    isRevealed: false
});


const initTiles = (cols, rows, mines) => {
    const tiles = [];
    for(let i = 0; i < (cols * rows); i++) {
        tiles.push(createTile(i < mines));
    }
    return List(shuffle(tiles).map((tile, idx) => tile.set('id', idx)));
}

/**
 * A reducer is a function that takes inputs of state + an action
 * and returns new state. Think of it like the function that you can 
 * use on an array reduce:
 * 
 *  const sumReducer = (total, num) => total + num;
 *  const sum = [3, 4, 5].reduce(sumReducer);   // 12
 *
 * However instead of it acting on an array it is happening on our state 
 * over time depending on what action we have done
 */
const gameReducer = (state = initialState, action) => {
    switch (action.type) {

        /** This action will create a new game with the number of 
         * rows and columns that the player has specified
         */
        case types.CREATE_GAME:
            return {
                present: fromJS({
                    cols: action.cols,
                    rows: action.rows,
                    tiles: initTiles(action.cols, action.rows, action.mines)
                }),
                past: List([]),
            }

        /** This action will reveal a tile
         */
        case types.REVEAL_TILE:
            const updated = state.present.setIn(['tiles', action.tile, 'isRevealed'], true);
            return {
                present: queries.isMine(updated, action.tile) ?
                    commands.revealMines(updated.set('isDead', true)) :
                    commands.attemptWinning(commands.revealAdjacentSafeTiles(updated, action.tile)),
                past: state.past.push(state.present),
            };

        case types.UNDO:
            return {
                present: state.past.last(),
                past: state.past.pop(),
            }

        default:
            return initialState
    }
}


export default gameReducer;