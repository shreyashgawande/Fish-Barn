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
    console.log(prediction);
    textField = document.getElementById("textField1");
    textField.value = y;
    $('#predict_btn').show();


});

function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function(e) {
        let dataURL = reader.result;
      $('.image-upload-wrap').hide();
      $('.file-upload-image').attr('src',dataURL);
        $('#selected_image').attr('src',dataURL);
      $('.file-upload-content').show();
      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

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

  model = await tf.loadLayersModel('https://fish-predictor.onrender.com/models/model.json');
  $('#progress-bar').hide();
  model.summary();
})();
