const rand = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

const angleToRadian = function(angle) {
    return Math.PI/180 * angle;
}
