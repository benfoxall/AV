const style = Object.assign(
  document.createElement('style'),
  {innerHTML: `
    .🔈 {
      background: hsla(0,0%,100%,.5);
      border: 1px solid hsla(0, 0%, 0%, 0.09);

      display: grid;

      padding: 1em;
      grid-gap: 1em;
    }
    .🔈 input {
      grid-column: 2/4;
      grid-row: 1;
      justify-self: stretch
    }

    .🔈 canvas {
      grid-column: 1/4;
      grid-row: 2;
      justify-self: stretch;
      height: 75px;
    }

    .🔈 button {
      border: 1px solid #3f3f46;
      padding: .2em;
    }

    .🔈 svg {
      grid-column: 1/4;
      justify-self: stretch;
      width: 100%;
    }

    .🔈 .emoji {
      grid-column: 1/4;
      justify-self: stretch;
      width: 100%;
      margin-top: 1em;
    }

    .🔈 .emoji span {
      display: inline-block;
    }
  `
  }
)

document.body.appendChild(style)

export default style
