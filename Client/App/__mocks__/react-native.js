const rn = require('react-native')

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
});

jest.mock("react-native-google-sign-in", () => {
  return {
    configure: jest.fn(),
    signInPromise: jest.fn()
  }
})

// jest.dontMock("react-native-code-push");

// jest.mock("react-native-code-push", () => {
//   return {
//     CheckFrequency: {},
//   }
// })

jest.doMock("react-native-code-push");

module.exports = rn