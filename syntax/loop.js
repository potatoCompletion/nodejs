for(var i = 1; i <= 5; i++) {
  for(var j = 0; j < i; j++) {
    process.stdout.write("*");
  }
  if (i + 1 < 6) {
    process.stdout.write("\n");
  }
}