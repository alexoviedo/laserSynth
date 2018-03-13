// create web audio api context
var audioCtx = new(AudioContext || webkitAudioContext)();
//create first oscillator node
var oscillator = audioCtx.createOscillator();
// create first panning node
var panner = audioCtx.createStereoPanner();
//create second oscillator node
var oscillator2 = audioCtx.createOscillator();
//create second panning node
var panner2 = audioCtx.createStereoPanner();

var gain = audioCtx.createGain();
var gain2 = audioCtx.createGain();

//connect first oscillator to first panning node
oscillator.connect(gain);
//start first oscillator (oscillators can't be started more than once, so we will need to connect/disconnect the panner from the output in order to start and stop the oscillator)
gain.connect(panner);
oscillator.start();
// value between 1 and -1. -1 is left 1 is right
panner.pan.value = -1;

//Follows the same pattern as the code in the first oscillator. The only difference being this oscillator is panned to the right speaker output.
oscillator2.connect(gain2);
gain2.connect(panner2);
oscillator2.start();
panner2.pan.value = 1;

//Captures range slider values from HTML and applies it to the oscillator frequency value as Hz (initial value 440Hz)
document.getElementById('frequencyX').oninput = function() {
  oscillator.frequency.value = +this.value;
};
document.getElementById('frequencyY').oninput = function() {
  oscillator2.frequency.value = +this.value;
};

document.getElementById('amplitudeX').oninput = function() {
  gain.gain.value = +this.value;
};
document.getElementById('amplitudeY').oninput = function() {
  gain2.gain.value = +this.value;
};

//Controls muting and unmuting of sound by connecting/disconnecting panner nodes from AudioContext(web audio api context) output
document.getElementById('start').onclick = function() {
  panner.connect(audioCtx.destination);
  panner2.connect(audioCtx.destination);
};
document.getElementById('stop').onclick = function() {
  panner.disconnect(audioCtx.destination);
  panner2.disconnect(audioCtx.destination);
};

//Controls wave types of X(horizontal) and Y(vertical) with onclick
document.getElementById('sineX').onclick = function() {
  oscillator.type = 'sine';
};
document.getElementById('squareX').onclick = function() {
  oscillator.type = 'square';
};
document.getElementById('sawtoothX').onclick = function() {
  oscillator.type = 'sawtooth';
};
document.getElementById('triangleX').onclick = function() {
  oscillator.type = 'triangle';
};
document.getElementById('sineY').onclick = function() {
  oscillator2.type = 'sine';
};
document.getElementById('squareY').onclick = function() {
  oscillator2.type = 'square';
};
document.getElementById('sawtoothY').onclick = function() {
  oscillator2.type = 'sawtooth';
};
document.getElementById('triangleY').onclick = function() {
  oscillator2.type = 'triangle';
};
