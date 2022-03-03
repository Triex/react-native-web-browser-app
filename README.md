# React Native Web Browser App

An open-source, extensible cross-platform (mobile and desktop) web browser made in React Native!

# T Notes
Set up for use as base for `TBA`
## Notes
- Updated some versions and bits, still not enough
- Need to look at [react-dom](https://github.com/facebook/react/tree/main/packages/react-dom) updates or changelog/commit history to find when it was removed and what the old version was + use that, or update to the new way.

```
💩
```


## Installation etc (not working yet, need to update react bits)
Globally install react-native-cli, expo if not done already
```
npm install -g react-native-cli
npm install -g expo
npm install -g expo-cli
npm install -g jest-expo
```

Install le modules
```
yarn install
```

Run as web, android or ios
```
yarn web
```
```
yarn android
```
```
yarn ios
```

react-native start
```
yarn start
```

expo jest
```
yarn test
```

jetify
```
yarn original_postinstall
```

npm run build
```
yarn prepare
```

yarn build
```
tsc --project ./tsconfig.build.json
```

### Run app

> iOS

- Go to ios folder
- Run `​pod install`
- Back to project directory
- Run ​react-native run-ios (`yarn ios`)

> Android

- Run ​react-native run-android (`yarn android`)

-----------------------

## Scope

The browser should:

* have a UI that is no less functional than that of Firefox's; 
* support at least iOS, Android, macOS, and Windows from one codebase;
* allow consumers to swap out the WebView for another one (for now, I'm using my fork of `react-native-webview`);

To be clear: This project is **purely** focused on building a browser UI, and forwarding user actions to a WebView. We are not trying to rebuild a browser engine here – just the UI around it.

## Roadmap

- [X] Functional navigation buttons (back, forward, stop, refresh)
- [X] Functional URL bar (can navigate to URL inputs and updates text upon page redirect)
- [X] Rotation
- [X] Bar retraction
- [X] Intelligent URL vs. search query determination in search bar
- [ ] Search suggestions / autocomplete text field
- [ ] Bars snapping to fully retracted/revealed upon gesture release
- [ ] Tabs
- [ ] History
- [ ] Browsing-state persistence
- [ ] Bookmarks
- [ ] Reading list
- [ ] Page-specific actions
- [ ] Branded app-specific actions (e.g. JS injection, popup blocking, whatever)

## Prior art

Cliqz give [good reasons](https://www.0x65.dev/blog/2019-12-17/why-we-forked-firefox-and-not-chromium.html) as to why they use Firefox as a basis rather than Chromium.

* [`cliqz-oss/browser-android`](https://github.com/cliqz-oss/browser-android): an Android web browser UI built in Java, based on Firefox for Android(?). Is the UI for the Cliqz Play Store Android app.
* [`cliqz/user-agent-ios`](https://github.com/cliqz/user-agent-ios): an iOS web browser UI built in Swift, based on Firefox for iOS. [Is the UI for the Cliqz AppStore iOS app](https://twitter.com/chrmod/status/1204771688824655872?s=20).
* [`cliqz-oss/cliqz-s`](https://github.com/cliqz-oss/cliqz-s): Cliqz's prototype Windows browser, written in React Native Windows ([not meant for production](https://twitter.com/chrmod/status/1204772242279809025?s=20)).
* [`cliqz-oss/browser-f`](https://github.com/cliqz-oss/browser-f): Cliqz's production desktop browser (Windows & Mac), based on Firefox desktop. There are a mixture of languages in the source: C++ and JS, at least. I'm not really sure what the dominant UI language is.
* [`cliqz-oss/browser-core`](https://github.com/cliqz-oss/browser-core): Cliqz's set of cross-platform (desktop & mobile) core modules such as their search UI.
* [Mozilla Application Services](https://github.com/mozilla/application-services/blob/master/README.md), recommended as a state storage solution by [Krzysztof Modras](https://twitter.com/chrmod/status/1208335429507960832?s=20) of Cliqz – particularly Places DB (explained by Krzysztof [here](https://twitter.com/chrmod/status/1208336158037557248?s=20)).

