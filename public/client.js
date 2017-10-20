console.log('hello');

let getJson = () => {
  return $.ajax({
    method: 'GET',
    url: '/test'
  })
  .then( (result) => {
    console.log('result');
    console.log(result);
  });

};

getJson()