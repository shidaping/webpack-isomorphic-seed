import { INCREASE, DECREASE } from '../constants';
export function increase() {
  return {
    type: INCREASE,
    amount: 1,
  };
}
export function decrease() {
  return {
    type: DECREASE,
    amount: 1,
  };
}
