
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


export const interleaveMap = (length, n) =>
  Array.from({
    length: length
  }, (_, i) => ((i % n) * length / n) + ~~(i / 2))

export const invertMap = arr => {
  const out = new Array(arr.length)
  arr.forEach((v, i) => out[v] = i)
  return out
}


/*
  Convert image data to an array of grayscale pixels (values from Rec. 601)

  TODO - typedArray.from (+ polyfill)
*/
export const imageDataToGrayscale = data =>
  Array.from({
    length: data.length / 4
  }, (_,i) => ~~ (
      data[i *= 4] * 0.2989 +
      data[i += 1] * 0.5870 +
      data[i += 1] * 0.1140
    )
  )

/*
  Write grayscale pixels to imageData.

  This one is a little less functional because typically we'll already have an
  image data to write to, and it saves up from creating a new array
*/
export const grayscaleToImageData = (pixels, data, offset = 0) => {
  for (var i = 0; i < data.length; i+=4) {
    const srcIdx = (i / 4)
    data[i] = data[i + 1] = data[i + 2] = pixels[srcIdx]
    data[i + 3] = 255
  }
}
