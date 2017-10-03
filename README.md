# ios-login.js 

## Prerequisites

Install local packages:

```
npm install
```

## Setup build path

- Open helpers/apps.js
- Setup Build path
Example : For simulator build testing(/Path to/Debug-iphonesimulator/app.app). You can see example debug path in same file.
- Start project npm local server (npm start)
- Create a test script and place into the Appium directory. example- 'ios-login.js'

Note: To test simulator build, Local npm server should be in running state.

## Setup device/simulator ==> You can change the device simulator configuration 

We can setup the configuration in 'helpers/caps.js' Device or Simulator with the versions.

### To run tests locally

Install appium and start the appium server, please refer to:

- http://appium.io
- https://github.com/appium/appium/blob/master/README.md

## Running tests 
- Run below commands from this same node(Appium) client. 

### iOS

```
npm run ios-login
```

### Android (In progress)

```
npm run android-login
```

