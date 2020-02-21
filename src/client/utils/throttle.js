/**
 * @name throttle
 * @description throttle utility
 * @param  {function} func    [function to throttle]
 * @param  {integer}  ms      [throttle timer]
 * @param  {object}   context [optional contexct to bind]
 * @return {function} [the throttled function]
 * @example
 *
 *  window.addEventListener('resize', throttle(() => {
 *    console.log('resize');
 *  }, 500));
 */
const throttle = (func, ms = 50, context = window) => {
  let wait = false;
  return (...args) => {
    const later = () => {
      func.apply(context, args);
    };
    if (!wait) {
      later();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, ms);
    }
  };
};
export default throttle;
