import * as types from './action-types';

export const createGame = (rows, cols, mines) => {
    return {
        type: types.CREATE_GAME,
        rows,
        cols,
        mines,
    }
}

export const revealTile = (tile) => {
    return {
        type: types.REVEAL_TILE,
        tile,
    }
}