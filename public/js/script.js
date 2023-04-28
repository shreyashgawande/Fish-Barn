$('#predict_btn').hide();
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
    // console.log(prediction);
    textField = document.getElementById("textField1");
    textField.value = y;
    $('#predict_btn').show();


});
  // $('.file-upload-content').show();

$('#file_input').change(function(){
  let reader = new FileReader();
  reader.onload = function(){
    let dataURL = reader.result;
    $('.image-upload-wrap').hide();
    $('.file-upload-content').show();
    // alert("HI");
    $('#selected_image').attr("src",dataURL);
    // $('.image-title').html(input.files[0].name);
    $('#pred').text("");

  }
let file =$("#file_input").prop('files')[0];
reader.readAsDataURL(file);

});


function removeUpload() {
  $('#predict_btn').hide();
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
  });
  $('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

let model;
(async function(){

  model = await tf.loadLayersModel('http://localhost:3000/models/model.json');
  $('#progress-bar').hide();
  model.summary();
})();
