function callback(err, successObject) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Success object: ');
  console.log(JSON.stringify(successObject));
}
