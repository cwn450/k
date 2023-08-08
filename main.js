
prediction  = "";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(photo){
        document.getElementById("result").innerHTML = "<img id='image' src="+photo+">"
    });
}
console.log("ml5.version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BqdSLp9F5/model.json", modelloaded);
function modelloaded(){
    console.log("Model Is Loaded");
}
function check(){
    img = document.getElementById("image");
    classifier.classify(img, gotresults);
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data = prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function  gotresults(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("hand_gesture_result").innerHTML = results[0].label;
        prediction = "";
        if (results[0].label == "Victory") {
            prediction = "That's a great victory!"
            document.getElementById("emoji_result").innerHTML = "&#9996;"
            speak()
        }
        if (results[0].label == "Good") {
            prediction = "That's good!"
            document.getElementById("emoji_result").innerHTML = "&#128077;"
            speak()
        }
        if (results[0].label == "Amazing") {
            prediction = "That's amazing!"
            document.getElementById("emoji_result").innerHTML = "&#128076;"
            speak()
        }
        if (results[0].label == "Bad") {
            prediction = "That's really bad"
            document.getElementById("emoji_result").innerHTML = "&#128078;"
            speak()
        }
    }
}