//
// alert("Javascript Connected");
// // const paragraphValue = document.getElementById("myParagraph").innerText
// const request = new XMLHttpRequest();
// request.open('POST', '/api/sendParagraphValue', true);
// request.setRequestHeader('Content-Type', 'application/json');
// const data = { "pred":2 };
// request.send(data);

$('#file_input').change(function(){
  let reader = new FileReader();
  reader.onload = function(){
    let dataURL = reader.result;
    $('#selected_image').attr("src",dataURL);
    $('#pred').text("");

  }
let file =$("#file_input").prop('files')[0];
reader.readAsDataURL(file);

});
let model;
(async function(){

  model = await tf.loadLayersModel('http://localhost:4000/models/model.json');
  $('#progress-bar').hide();
  model.summary();
})();


$('#predict-button').click(async function(){
  let image= $('#selected_image').get(0);
  // console.log(image);
  let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor(([224,224])).expandDims().toFloat().div(255.0);
  let prediction = await model.predict(tensor).data();
  console.log(prediction[0]);

  let max = prediction[0];
  for(let i=0;i<20;i++){
    if(prediction[i]>max){
      max = prediction[i];
    }

  }
  console.log(max);
  let y = prediction.indexOf(max);
  console.log(y);
//     // console.log(prediction);
    // textField = document.getElementById("textField1");
    // textField.value = "Method 1";
// // $.post('/api',{"pred":"2"});
//
//
//  if(prediction<=0){
//    $('#pred').text("");
//  }
//  // else{
//  //   $('#pred').text("Cat");
//  // }
});
