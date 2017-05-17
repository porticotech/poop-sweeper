import Immutable from 'immutable';
import * as queries from './queries';
import { shuffle } from '../utils';

/** 
 * Initialize an immutable tile. 
 */
const initializeTile = (isPoop) => {};

const idEachTile = (tiles) => {};

/**
 * A function to initialize the tiles. 
 * 
 * A tile is aware of four things:
 *  
 *   1. If it is a poop
 *   2. If it has been revealed
 *   3. What the the threat count of poops around it is
 *   4. What its ID is
 * 
 * @func
 * @param {Number} cols The number of columns for the game
 * @param {Number} rows The number of rows for the game
 * @param {Number} poops The number of poops in the game
 * @return {List} a list of tiles read for the start of the game
 * 
 * they each have index like so
 *  -------------
 *  | 0 | 1 | 2 |
 *  -------------
 *  | 3 | 4 | 5 |
 *  -------------
 *  | 6 | 7 | 8 |
 *  -------------
 * 
 *  but they need to be shuffled and they need to be an immutable List containing
 *  immutable tile objects. This function is not PURE
 * 
 */
export const initTiles = (cols, rows, poops) => {
   const tiles = [];
   for(let i = 0; i < (cols * rows); i++) {
       tiles.push(initializeTile(i < poops));
   }
   return Immutable.List(idEachTile(shuffle(tiles)));
}

/**
 * A function which reveals a tile if it is a poop
 * @func
 * @param {Map} tile The tile to check
 * @return {Map} a revealed tile if it is a poop otherwise the tile being checked
 * 
 * This function is pure. It doesn't mutate the state of a tile, it will either return
 * the tile as it was or a new version of the 
 */
export const revealPoop = (tile) => {};

/**
 * A function that will reveal all of the poops. All of the poops are revealed
 * when the user picks any poop tile.
 * @func
 * @param {Map} state The state of the game
 * @return {Map} a new version of the state with all of the poops revealed
 */
export const revealAllPoops = (state) => {};

/**
 * A function which sets the state of the game to isSafe if the game is won.
 * @func
 * @param {Map} state The state of the game
 * @return {Map} a new immutable version of the state with the isSafe flag set to true
 */
export const attemptWinning = (state) => queries.completedGame(state) ? state.set('isSafe', true) : state;

/**
 * A function to add the threat count to a revealed tile. The game depends on knowing how many
 * poops are neighbours of a tile
 * @func
 * @param {Map} state The state of the game
 * @param {Map} tile The tile to reveal the threat count for
 * @return {Map} a new immutable version of the state with the threat count set for the tile
 */
export const addThreatCount = (state, tile) => state.setIn(['tiles', tile, 'threatCount'], queries.neighboursPoopCount(state, tile));

/**
 * A function which reveals all of the adjacent safe tiles. When the threat is revealed to have
 * no threatening neighbours then they can all be revealed so this is done automatically.
 * The function then recurses.
 * @func
 * @param {Map} state The state of the game
 * @param {Map} tile The tile to attempt to reveal
 * @return {Map} The state with the adjancent safe tiles revealed
 */
export const revealAdjacentSafeTiles = (state, tile) => {
  if (queries.isPoop(state, tile)) {
    return state;
  }
  state = addThreatCount(state, tile).setIn(['tiles', tile, 'isRevealed'], true);
  if (state.getIn(['tiles', tile, 'threatCount']) === 0) {
      return queries.directions.map((direction) => direction(state, tile))
        .reduce((state, pos) => {
            return !state.getIn(['tiles', pos, 'isRevealed'])
                ? revealAdjacentSafeTiles(state, pos)
                : state
        }, state);
  }
  return state;
}
