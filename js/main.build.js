(function () {
'use strict';

var style = Object.assign(
  document.createElement('style'),
  {innerHTML: "\n    .🔈 {\n      background: hsla(0,0%,100%,.5);\n      border: 1px solid hsla(0, 0%, 0%, 0.09);\n\n      display: grid;\n\n      padding: 1em;\n      grid-gap: 1em;\n    }\n    .🔈 input {\n      grid-column: 2/4;\n      grid-row: 1;\n      justify-self: stretch\n    }\n\n    .🔈 canvas {\n      grid-column: 1/4;\n      grid-row: 2;\n      justify-self: stretch;\n      height: 75px;\n    }\n\n    .🔈 button {\n      border: 1px solid #3f3f46;\n      padding: .2em;\n    }\n  "
  }
);

document.body.appendChild(style);

//https://github.com/Rich-Harris/Points

(function(){function t(){this.originalEvent.preventDefault();}var e,n,i,r,o,a,c,d,s,v,u,l;if(void 0===window.onpointerdown){l="screenX screenY clientX clientY ctrlKey shiftKey altKey metaKey relatedTarget detail button buttons pointerId pointerType width height pressure tiltX tiltY isPrimary".split(" ");try{r=new UIEvent("test"), a=function(t,e){return new UIEvent(t,{view:window,bubbles:e})};}catch(p){document.createEvent&&(a=function(t,e){var n=document.createEvent("UIEvents");return n.initUIEvent(t,e,!0,window), n});}if(!a){ throw Error("Cannot create events. You may be using an unsupported browser."); }if(c=function(e,n,i,r){var o,c;for(o=a(e,!r), c=l.length;c--;){ Object.defineProperty(o,l[c],{value:i[l[c]],writable:!1}); }return Object.defineProperty(o,"originalEvent",{value:n,writable:!1}), Object.defineProperty(o,"preventDefault",{value:t,writable:!1}), o}, navigator.pointerEnabled=!0, void 0!==window.onmspointerdown){ return["MSPointerDown","MSPointerUp","MSPointerCancel","MSPointerMove","MSPointerOver","MSPointerOut"].forEach(function(t){var e;e=t.toLowerCase().substring(2), "pointerover"===e||"pointerout"===e?window.addEventListener(t,function(t){var n=c(e,t,t,!1);t.target.dispatchEvent(n), t.target.contains(t.relatedTarget)||(n=c("pointerover"===e?"pointerenter":"pointerleave",t,t,!0), t.target.dispatchEvent(n));},!0):window.addEventListener(t,function(t){var n=c(e,t,t,!1);t.target.dispatchEvent(n);},!0);}), navigator.maxTouchPoints=navigator.msMaxTouchPoints, void 0; }u={0:1,1:4,2:2}, d=function(e,n,i){var r,o,a,d;return void 0!==n.buttons?(o=n.buttons, r=n.buttons?n.button:-1):0===event.button&&0===event.which?(r=-1, o=0):(r=n.button, o=u[r]), a=n.pressure||n.mozPressure||(o?.5:0), d={screenX:n.screenX,screenY:n.screenY,clientX:n.clientX,clientY:n.clientY,ctrlKey:n.ctrlKey,shiftKey:n.shiftKey,altKey:n.altKey,metaKey:n.metaKey,relatedTarget:n.relatedTarget,detail:n.detail,button:r,buttons:o,pointerId:1,pointerType:"mouse",width:0,height:0,pressure:a,tiltX:0,tiltY:0,isPrimary:!0,preventDefault:t}, c(e,n,d,i)}, s=void 0!==window.ontouchstart?function(t){for(var e,n=i.length,r=10;n--;){ if(e=i[n], r>Math.abs(t.clientX-e.clientX)&&r>Math.abs(t.clientY-e.clientY)){ return!0 } }}:function(){return!1}, o=function(t){"over"===t||"out"===t?window.addEventListener("mouse"+t,function(e){var n;s(e)||(n=d("pointer"+t,e), e.target.dispatchEvent(n), e.target.contains(e.relatedTarget)||(n=d("over"===t?"pointerenter":"pointerleave",e,!0), e.target.dispatchEvent(n)));}):window.addEventListener("mouse"+t,function(e){var n;s(e)||(n=d("pointer"+t,e), e.target.dispatchEvent(n));});}, ["down","up","over","out","move"].forEach(function(t){o(t);}), void 0!==window.ontouchstart&&(e={}, n=0, i=[], v=function(n,i,r,o,a){var d;return d={screenX:i.screenX,screenY:i.screenY,clientX:r.clientX,clientY:r.clientY,ctrlKey:i.ctrlKey,shiftKey:i.shiftKey,altKey:i.altKey,metaKey:i.metaKey,relatedTarget:a||i.relatedTarget,detail:i.detail,button:0,buttons:1,pointerId:r.identifier+2,pointerType:"touch",width:20,height:20,pressure:.5,tiltX:0,tiltY:0,isPrimary:e[r.identifier].isPrimary,preventDefault:t}, c(n,i,d,o)}, window.addEventListener("touchstart",function(t){var o,a;for(o=t.changedTouches, a=function(r){var o,a,c,d;d={target:r.target,isPrimary:n?!1:!0}, e[r.identifier]=d, n+=1, o=v("pointerdown",t,r), a=v("pointerover",t,r), c=v("pointerenter",t,r,!0), r.target.dispatchEvent(a), r.target.dispatchEvent(c), r.target.dispatchEvent(o), i.push(r), setTimeout(function(){var t=i.indexOf(r);-1!==t&&i.splice(t,1);},1500);}, r=0;o.length>r;r+=1){ a(o[r]); }}), window.addEventListener("touchmove",function(t){var n,i;for(n=t.changedTouches, i=function(n){var i,r,o,a,c,d,s,u;return d=e[n.identifier], u=document.elementFromPoint(n.clientX,n.clientY), d.target===u?(i=v("pointermove",t,n), u.dispatchEvent(i), void 0):(s=d.target, d.target=u, s.contains(u)||(c=v("pointerleave",t,n,!0,u), s.dispatchEvent(c)), o=v("pointerout",t,n,!1), s.dispatchEvent(o), i=v("pointermove",t,n,!1), u.dispatchEvent(i), r=v("pointerover",t,n,!1), u.dispatchEvent(r), u.contains(s)||(a=v("pointerenter",t,n,!0,s), u.dispatchEvent(a)), void 0)}, r=0;n.length>r;r+=1){ i(n[r]); }}), window.addEventListener("touchend",function(t){var i,o;for(i=t.changedTouches, o=function(i){var r,o,a,c;c=document.elementFromPoint(i.clientX,i.clientY), r=v("pointerup",t,i,!1), o=v("pointerout",t,i,!1), a=v("pointerleave",t,i,!0), delete e[i.identifier], n-=1, c.dispatchEvent(r), c.dispatchEvent(o), c.dispatchEvent(a);}, r=0;i.length>r;r+=1){ o(i[r]); }}), window.addEventListener("touchcancel",function(t){var i,o;for(i=t.changedTouches, o=function(i){var r,o,a;r=v("pointercancel",t,i), o=v("pointerout",t,i), a=v("pointerleave",t,i), i.target.dispatchEvent(r), i.target.dispatchEvent(o), i.target.dispatchEvent(a), delete e[i.identifier], n-=1;}, r=0;i.length>r;r+=1){ o(i[r]); }}));}})();

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
      var s = sound(0.25, harmony(freq(i + 48)));
      key.addEventListener('pointerenter', s);
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
