import buble from 'rollup-plugin-buble'

export default {
  input: 'js/main.js',
  plugins: [buble()],

  output: {
    file: 'js/main.build.js',
    format: 'iife'
  }
}
