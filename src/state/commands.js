import { fromJS, List } from 'immutable';
import * as queries from './queries';
import { shuffle } from '../utils';

export const revealMine = (tile) => tile.get('isMine') ? tile.set('isRevealed', true) : tile;
export const revealMines = (state) => state.updateIn(['tiles'], (tiles) => tiles.map(revealMine));
export const attemptWinning = (state) => queries.safe(state) ? state.set('isSafe', true) : state;
export const addThreatCount = (state, tile) => state.setIn(['tiles', tile, 'threatCount'], queries.mineCount(state, tile));

export const revealAdjacentSafeTiles = (state, tile) => {
  if (queries.isMine(state, tile)) {
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

export const initTiles = (cols, rows, mines) => {
    const tiles = [];
    for(let i = 0; i < (cols * rows); i++) {
        tiles.push(fromJS({isMine: i < mines, isRevealed: false}));
    }
    return List(shuffle(tiles).map((tile, idx) => tile.set('id', idx)));
}