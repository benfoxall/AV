
/*
  This creates a map from pixels to audio samples in a vertical scan way,
  which can be used to maintain a bit more locality in the source image:

    1 4 7 10 13
    2 5 8 11 14
    3 6 9 12 15

  It's probably got a better name (like, transpose) but:
    1. I'm not totally sure
    2. I like the word intermingle

*/
export const intermingle = (stride, vertical) =>
  Array.from({
    length: stride * vertical,
  }, (_, i) => (i % vertical) * stride + Math.floor(i / vertical))
