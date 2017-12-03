const map = (stride, length) =>
  Array.from({
    length: stride * length,
  }, (_, i) => (i % 2) * 10 + Math.floor(i/2))


export default map
