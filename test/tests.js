import {intermingle} from '../js/lib/pixelMap.js'

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
