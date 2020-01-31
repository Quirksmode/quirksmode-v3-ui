/**
 * Generic express.js error handler, will invoke once
 * an exception is met in parent middleware or routing
 *
 * Custom errors can be emitted via next(throw new error('...'));
 *
 * @param  {Object}   err  [error object as defined in next()]
 * @param  {Object}   req  [express.js request object]
 * @param  {Object}   res  [express.js response object]
 * @return {void}
 */
module.exports = (err, req, res) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    console.trace();
  } else {
    res.send('Something went wrong, if the problem persits please contact us'); // Use a 500 error template
  }
};
