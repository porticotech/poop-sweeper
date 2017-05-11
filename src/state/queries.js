/*
 * Queries
 * 
 * This file contain functions relating to queries that we might want
 * to perform on our state
 */

/**
 * isMine function
 * 
 * @param {immutable object} state - our application state
 * @param {immutable object} tile - a tile to investigate
 */
export const isMine = (state, tile) => state.getIn(['tiles', tile, 'isMine']);

export const cols = (state) => state.get('cols');

const onWestEdge = (state, tile) => tile % cols(state) === 0;

const onEastEdge = (state, tile) => tile % cols(state) === cols(state) - 1;

const idx = (state, tile) => {
    if (tile < 0) {
        return null;
    }
    return state.getIn(['tiles', tile]) ? tile : null;
}

const nw = (state, tile) => onWestEdge(state, tile) ? null : idx(state, tile - cols(state) - 1);

const n = (state, tile) => idx(state, tile - cols(state));

const ne = (state, tile) => onEastEdge(state, tile) ? null : idx(state, tile - cols(state) + 1);

const e = (state, tile) => onEastEdge(state, tile) ? null : idx(state, tile + 1);

const se = (state, tile) => onEastEdge(state, tile) ? null : idx(state, tile + cols(state) + 1);

const s = (state, tile) => idx(state, tile + cols(state));

const sw = (state, tile) => onWestEdge(state, tile) ? null : idx(state, tile + cols(state) - 1);

const w = (state, tile) => onWestEdge(state, tile) ? null : idx(state, tile - 1);

export const directions = [nw, n, ne, e, se, s, sw, w];

const neighbours = (state, tile) => {
    return directions.map((direction) => {
        return state.getIn(['tiles', direction(state, tile)])
    })
};

export const tiles = (state) => state.get('tiles');

export const dead = (state) => state.get('isDead');

export const safe = (state) => {
    const tiles = state.get('tiles');
    const mines = tiles.filter((tile) => tile.get('isMine'));
    return mines.filter((tile) => tile.get('isRevealed')).size === 0 && tiles.size - mines.size === tiles.filter((tile) => tile.get('isRevealed')).size;
};

export const mineCount = (state, tile) => neighbours(state, tile).filter((nb) => {
    return nb && nb.get('isMine')
}).length;

