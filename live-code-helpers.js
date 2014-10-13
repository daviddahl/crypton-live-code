function callback(err, successObject) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Success object: ');
  try {
    console.log(JSON.stringify(successObject));
  } catch (ex) {
    console.log(successObject);
  }
}
