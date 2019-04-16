function mean(distances) {
  var sum = 0;
  for ( var i = 0; i < distances.length; i++ ) {
    sum += distances[i];
  }
  return sum/distances.length;
}

function std(distances) {
  var m = mean(distances);
  var sum = 0;
  for ( var i = 0; i < distances.length; i++ ) {
    sum += pow((m - distances[i]), 2);
  }
  return sqrt(sum/distances.length);
}
