import {
  intermingle,
  imageDataToGrayscale,
  grayscaleToImageData,
  interleaveMap
} from '../js/lib/pixelUtil.js'

const {expect} = chai

describe('intermingle', () => {

  it('is a function', () => {
    expect(typeof intermingle).to.equal('function')
  })

  it('works for a simple case', () => {
    const result = intermingle(
      10, 2
    )

    const expected = [0,10,1,11,2,12,3,13,4,14,5,15,6,16,7,17,8,18,9,19]

    expect(result).to.eql(expected)

  })

  it('works for another simple case', () => {
    const result = intermingle(
      4, 2
    )

    const expected = [0,4,1,5,2,6,3,7]

    expect(result).to.eql(expected)
  })

})

describe('interleaving', () => {

  it('is a function', () => {
    expect(typeof interleaveMap).to.equal('function')
  })

  it('creates a map for interleaving imageData', () => {
    expect(interleaveMap(4, 2))
      .to.eql([0, 2, 1, 3])
  })

  it('works with other inputs', () => {
    expect(interleaveMap(12, 3))
      .to.eql([0, 4, 9, 1, 6, 10, 3, 7, 12, 4, 9, 13])
  })
})


describe('grayscale conversion', () => {

  describe('to grayscale', () => {
    it('is a function', () => {
      expect(typeof imageDataToGrayscale).to.equal('function')
    })

    it('converts stuff', () => {

      const source = [
        0, 255, 0, 255,
        0, 0, 255, 255,
        255, 0, 0, 255,
      ]

      expect(imageDataToGrayscale(source))
        .to.eql([
          149, 29, 76
        ])

    })
  })

  describe('from grayscale', () => {
    it('is a function', () => {
      expect(typeof grayscaleToImageData).to.equal('function')
    })

    it('does stuff', () => {
      const imageData = new ImageData(2,2)

      const gray = [0,255,150,0]

      grayscaleToImageData(gray, imageData.data)

      expect(Array.from(imageData.data))
        .to.eql([
          0,0,0,255,
          255,255,255,255,
          150,150,150,255,
          0,0,0,255
        ])
    })


  })

})
