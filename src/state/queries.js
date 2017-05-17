/*
 * Queries
 * 
 * This file contain functions relating to queries that we might want
 * to perform on our state
 */

/**
 * isPoop function
 * @func
 * @param {immutable object} state our application state
 * @param {immutable object} tile a tile to investigate
 */
export const isPoop = (state, tile) => state.getIn(['tiles', tile, 'isPoop']);

/**
 * Function to determine if a tile is on the west edge of the board
 * @func
 * @param {Map} state The game state
 * @return {Boolean} true if on the west edge, false otherwise
 */
const onWestEdge = (state, tile) => tile % state.get('cols') === 0;

/**
 * Function to determine if a tile is on the east edge of the board
 * @func
 * @param {Map} state The game state
 * @return {Boolean} true if on the east edge, false otherwise
 */
const onEastEdge = (state, tile) => tile % state.get('cols') === state.get('cols') - 1;

const idx = (state, tile) => {
    if (tile < 0) {
        return null;
    }
    return state.getIn(['tiles', tile]) ? tile : null;
}

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the north west
 */
const nw = (state, tile) => onWestEdge(state, tile) ? null : idx(state, tile - state.get('cols') - 1);

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the north
 */
const n = (state, tile) => idx(state, tile - state.get('cols'));

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the north east
 */
const ne = (state, tile) => onEastEdge(state, tile) ? null : idx(state, tile - state.get('cols') + 1);

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the east
 */
const e = (state, tile) => onEastEdge(state, tile) ? null : idx(state, tile + 1);

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the south east
 */
const se = (state, tile) => onEastEdge(state, tile) ? null : idx(state, tile + state.get('cols') + 1);

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the south
 */
const s = (state, tile) => idx(state, tile + state.get('cols'));

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the south west
 */
const sw = (state, tile) => onWestEdge(state, tile) ? null : idx(state, tile + state.get('cols') - 1);

/**
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Number} the index of a tile to the west
 */
const w = (state, tile) => onWestEdge(state, tile) ? null : idx(state, tile - 1);

export const directions = [nw, n, ne, e, se, s, sw, w];

/**
 * A function to return the tiles neigbouring a given tile
 * @func
 * @param {Map} state The game state
 * @param {Map} tile A tile to evaluate
 * @return {Map[]} An array of the surrounding tiles
 */
const neighbours = (state, tile) => {
    return directions.map((direction) => {
        return state.getIn(['tiles', direction(state, tile)])
    })
};

/**
 * A function to determine if the game has been completed
 * @func
 * @param {Map} state The state of the game
 */
export const completedGame = (state) => {
    const tiles = state.get('tiles');
    const poops = tiles.filter((tile) => tile.get('isPoop'));
    return poops.filter((tile) => tile.get('isRevealed')).size === 0 && tiles.size - poops.size === tiles.filter((tile) => tile.get('isRevealed')).size;
};

/**
 * A function to return the number of poops in the neighbours for a tile
 * @func
 * @param {Map} state The state of the game
 * @param {Map} tile The tile to find the poop count for
 */
export const neighboursPoopCount = (state, tile) => 
    neighbours(state, tile)
        .filter((neigbour) => neigbour && neigbour.get('isPoop')).length;
