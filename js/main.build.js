(function () {
'use strict';

document.body.appendChild(
  Object.assign(
    document.createElement('style'),
    {innerHTML: "\n      .🔈 {\n        background: hsla(0,0%,100%,.5);\n        border: 1px solid hsla(0, 0%, 0%, 0.09);\n\n        display: grid;\n\n        padding: 1em;\n        grid-gap: 1em;\n      }\n      .🔈 input {\n        grid-column: 2/4;\n        grid-row: 1;\n        justify-self: stretch\n      }\n\n      .🔈 canvas {\n        grid-column: 1/4;\n        grid-row: 2;\n        justify-self: stretch;\n        height: 75px;\n      }\n\n      .🔈 button {\n        border: 1px solid #3f3f46;\n        padding: .2em;\n      }\n    "
    }
  )
)

var generator = function (audioCtx, target) { return function (seconds, fn) {
  var sampleRate = audioCtx.sampleRate;

  var buffer = audioCtx.createBuffer(
      1, sampleRate * seconds, sampleRate
  );
  var data = buffer.getChannelData(0);

  for (var i = 0; i < data.length; i++) {
    data[i] = fn(i / sampleRate, seconds);
  }

  return function () {
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;

    source.connect(target || audioCtx.destination);
    source.start();
  }
}; };



var Scope = function Scope(analyser, canvas) {

  var ctx = canvas.getContext('2d');
  var frequencies = new Uint8Array(analyser.frequencyBinCount);
  var waveform = new Uint8Array(analyser.fftSize);

  Object.assign(this, {analyser: analyser, canvas: canvas, ctx: ctx, frequencies: frequencies, waveform: waveform});

};

Scope.prototype.render = function render () {

  var ref = this;
    var analyser = ref.analyser;
    var canvas = ref.canvas;
    var ctx = ref.ctx;
    var frequencies = ref.frequencies;
    var waveform = ref.waveform;

  analyser.getByteFrequencyData(frequencies);
  analyser.getByteTimeDomainData(waveform);

  var width = canvas.width;
    var height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = '#ff0043';
  ctx.beginPath();
  frequencies.forEach(function (value, i) {
    ctx.lineTo((i / frequencies.length) * width, (1-(value / 255)) * height * 0.95);
  });
  ctx.stroke();

  ctx.strokeStyle = '#3f023f';
  ctx.beginPath();
  waveform.forEach(function (value, i) {
    ctx.lineTo((i / waveform.length) * width, (value / 255) * height);
  });
  ctx.stroke();


};

var analyser = function (audioCtx, element) {

  var media = element.querySelector('audio');
  var range = element.querySelector('input');
  var canvas = element.querySelector('canvas');


  var source = audioCtx.createMediaElementSource(media);
  var gain = audioCtx.createGain();
  var analyser = audioCtx.createAnalyser();

  // create the audio graph
  source.connect(gain);
  gain.connect(analyser);
  analyser.connect(audioCtx.destination);

  // connect gain
  range.addEventListener('input', function () { return gain.gain.value = parseFloat(range.value); }
  );


  // draw to canvas
  var scope = new Scope(analyser, canvas);
  var animate = function () {
    requestAnimationFrame(animate);
    scope.render();
  };

  animate();

};

var gain = function (audioCtx, element) {

  var media = element.querySelector('audio');
  var range = element.querySelector('input');

  var source = audioCtx.createMediaElementSource(media);
  var gain = audioCtx.createGain();

  // create the audio graph
  source.connect(gain);
  gain.connect(audioCtx.destination);


  // connect gain
  range.addEventListener('input', function () { return gain.gain.value = parseFloat(range.value); }
  );

};

var basic = function (audioCtx, element) {

  var media = element.querySelector('audio');
  var source = audioCtx.createMediaElementSource(media);

  // create the audio graph
  source.connect(audioCtx.destination);

};

var setup = function (audioCtx, element) {

  var range = element.querySelector('input');
  var canvas = element.querySelector('canvas');

  var gain = audioCtx.createGain();
  var analyser = audioCtx.createAnalyser();


  gain.connect(analyser);
  analyser.connect(audioCtx.destination);


  // connect gain
  range.addEventListener('input', function () { return gain.gain.value = parseFloat(range.value); }
  );

  // draw to canvas
  var scope = new Scope(analyser, canvas);
  var animate = function () {
    requestAnimationFrame(animate);
    scope.render();
  };

  animate();


  return generator(audioCtx, gain)

};


// Math.sin with period of 0..1
var sin = function (v) { return Math.sin(Math.PI * 2 * v); };

var harmony = function (f) { return function (t) { return sin(f * t) +
  (sin(f * t * 3) / 3) +
  (sin(f * t * 7) / 7); }; };


var buttonNoise = function (audioCtx, element) {

  var sound = setup(audioCtx, element);

  var buttons = element.querySelectorAll('button');

  var noise = sound(0.5, function (t) { return Math.random() * 0.2; });

  buttons[0].addEventListener('click', noise);
};



var buttonHz = function (audioCtx, element) {

  var sound = setup(audioCtx, element);

  var buttons = element.querySelectorAll('button');

  var _440hz = sound(0.5, function (t) { return sin(t * 440); });
  var _880hz = sound(0.5, function (t) { return sin(t * 880); });

  buttons[0].addEventListener('click', _440hz);
  buttons[1].addEventListener('click', _880hz);


};


var buttonHarmony = function (audioCtx, element) {

  var sound = setup(audioCtx, element);

  var buttons = element.querySelectorAll('button');

  var _440hz = sound(0.5, harmony(440));
  var _880hz = sound(0.5, harmony(880));

  buttons[0].addEventListener('click', _440hz);
  buttons[1].addEventListener('click', _880hz);

};


var adsr = d3.scaleLinear()
    .domain([0, 0.2, 0.3, 0.4, 0.5])
    .range( [0, 1,   .3, .3,  0]);


var buttonADSR = function (audioCtx, element) {

 var sound = setup(audioCtx, element);

 var buttons = element.querySelectorAll('button');

 var h440 = harmony(440);
 var h880 = harmony(880);

 var _440hz = sound(.5, function (t) { return adsr(t) * h440(t); } );
 var _880hz = sound(.5, function (t) { return adsr(t) * h880(t); } );

 buttons[0].addEventListener('click', _440hz);
 buttons[1].addEventListener('click', _880hz);

};

var keyboard = function (audioCtx, element) {

  var canvas = element.querySelector('canvas');

  var analyser = audioCtx.createAnalyser();

  analyser.connect(audioCtx.destination);

  // draw to canvas
  var scope = new Scope(analyser, canvas);
  var animate = function () {
    requestAnimationFrame(animate);
    scope.render();
  };
  animate();

  var sound = generator(audioCtx, analyser);


  // Math.sin with period of 0..1
  var sin = function (v) { return Math.sin(Math.PI * 2 * v); };

  var freq = function (note) { return 27.5 * Math.pow(2, (note - 21) / 12); };

  var harmony = function (f) { return function (t) { return (sin(f * t) +
    (sin(f * t * 3) / 3) +
    (sin(f * t * 7) / 7))
    * 0.2 * sin(t * 2); }; };


  Array.from(element.querySelectorAll('svg rect'))
    .sort(function (a, b) { return parseFloat(a.getAttribute('x')) - parseFloat(b.getAttribute('x')); }
    )

    .forEach(function (key, i) {

      var s = sound(0.25, harmony(freq(i + 50)));

      key.addEventListener('mouseenter', function () {
        console.log(i);
        s();
      });


    });

};

var demos = {
  analyser: analyser,
  gain: gain,
  basic: basic,

  buttonNoise: buttonNoise,
  buttonHz: buttonHz,
  buttonHarmony: buttonHarmony,
  buttonADSR: buttonADSR,

  keyboard: keyboard
};


var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// run scripts on each section
Array.from(document.querySelectorAll('.🔈[data-demo]'))
  .forEach(function (section) {
    var name = section.dataset.demo;

    var demo = demos[name];

    if(!demo) { return console.warn(("Demo not found: \"" + name + "\"")) }

    demo(audioCtx, section);

  });

}());
