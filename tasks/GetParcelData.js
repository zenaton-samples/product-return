module.exports.handle = async function(parcelReturn) {
  /* In order to keep this sample simple, it is not tied into an actual database.
   * Because of that, this Task does not actualy do anything.
   *
   * You'd likely want this to add the information into your database.
   */

  /* For testing purposes, the status that will be returned is in the `parcelReturn`
   * object. So we'll just return that instead of actually accessing a database.
   */
  return parcelReturn.status;
};
