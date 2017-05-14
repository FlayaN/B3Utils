const rn = require('react-native')
// const cp = require('react-native-code-push')
jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
});
// jest.mock('react-native-code-push', () => {
//   return {
//     CheckFrequency: undefined
//   }
// });
// module.exports = Object.assign(rn, cp)
module.exports = rn