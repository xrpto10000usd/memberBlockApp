module.exports = {
  project: {
    android: {
      // 여기에 본인의 패키지명을 명시적으로 적어주면 에러 해결에 도움이 됩니다.
      packageName: 'com.memberblock',
    },
    ios: {},
  },
   dependencies: {
      '@react-native-async-storage/async-storage': {
        platforms: {
          android: {
            sourceDir:
              '../node_modules/@react-native-async-storage/async-storage/android',
          },
        },
      },
    },
};