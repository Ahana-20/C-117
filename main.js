function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw() {
    strokeWeight(13);
    stroke(0)

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }

}

function clearCanvas() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("label").innerHTML = "Label : " + results[0].label;
        document.getElementById("Confidence").innerHTML = "Confidence : " + results[0].confidence;

        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}