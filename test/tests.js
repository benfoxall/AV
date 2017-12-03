import pixelMap from '../js/lib/pixelMap.js'

const {expect} = chai

describe('pixel map', () => {
  it('is a function', () => {
    expect(typeof pixelMap).to.equal('function')
  })


  it('works for a simple case', () => {
    const result = pixelMap(
      10, 2
    )

    const expected = [0,10,1,11,2,12,3,13,4,14,5,15,6,16,7,17,8,18,9,19]

    expect(result)
      .to.eql(
        expected
      )

  })

})
