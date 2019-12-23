// Helper function to extract inner object from array
export function getSubArray(targetArray, objProperty, value) {
  var i,
    totalItems = targetArray.length,
    objFound = false,
    idxArr = [];

  for (i = 0; i < totalItems; i++) {
    if (targetArray[i][objProperty] === value) {
      objFound = true;
      idxArr.push(targetArray[i]);
    }
  }
  return idxArr;
}
