import * as types from './action-types';

/**
 * create game action creator. Creates an action which is picked up
 * by the reducer 
 * @func
 * @param {Number} rows The number of rows in the game
 * @param {Number} cols The number of columns in the game
 * @param {Number} poops The number of poops it
 * @return an action object
 */
export const createGame = (rows, cols, poops) => {
    return {
        type: types.CREATE_GAME,
        rows,
        cols,
        poops,
    }
}

/**
 * Reveal tile action creator. Creates an action which is picked up
 * by the reducer
 * @func
 * @param {Number} tile The tile to be revealed
 * @return an action object
 */
export const revealTile = (tile) => {
    return {
        type: types.REVEAL_TILE,
        tile,
    }
}

/**
 * Undo action creator. Creates an action which is picked up
 * by the reducer
 * @func
 * @return an action object
 */
export const undo = () => {}