import * as React from "react";
import { URLBarView } from "./URLBarView";
import { TopTabsViewController } from "./TopTabsViewController";
import { Header, RetractibleHeaderConnected } from "./Header";
import { TabToolbar } from "./TabToolbar";
import { connect } from "react-redux";
import { WholeStoreState } from "~/store/store";
import { webViews, updateUrlBarText, TabStateRecord, setProgressOnWebView } from "~/store/navigationState";
import { setBarsRetraction, RetractionState } from "~/store/barsState";
import { View, Text, ViewProps, StyleSheet, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, ScrollView, SafeAreaView, Platform, findNodeHandle } from "react-native";
import { WebView } from 'react-native-webview';
import { IOSWebViewProps, WebViewNavigationEvent, WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes';
import { SafeAreaProvider, SafeAreaConsumer, EdgeInsets } from 'react-native-safe-area-context';
import { GradientProgressBarConnected } from "~/Widgets/GradientProgressBar";
import Animated, { not } from "react-native-reanimated";
import { FooterConnected } from "./Footer";
import { HEADER_RETRACTED_HEIGHT, HEADER_REVEALED_HEIGHT, HEADER_RETRACTION_DISTANCE } from "./TabLocationView";
import { DRAG_END_INITIAL } from "./barSpring";
import { WebViewContainerConnected, WebViewContainerBackdrop } from "./WebViewContainer";
const { diffClamp, interpolate, event: reanimatedEvent, multiply, add, cond, lessThan, neq, Clock, Extrapolate, clockRunning, set, startClock, spring, sub, stopClock, eq } = Animated;

const BrowserViewControllerUX = {
    ShowHeaderTapAreaHeight: 0,
    BookmarkStarAnimationDuration: 0.5,
    BookmarkStarAnimationOffset: 80,
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L128
class TopTabsContainer extends React.Component<{}, {}> {
    render(){
        return (
            // UIView()
            <View style={{ flexDirection: "column" }}>
                {/* topTabsViewController.view */}
                <TopTabsViewController/>
            </View>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L70
class AlertStackView extends React.Component<ViewProps, {}> {
    render(){
        const { style, children, ...rest } = this.props;

        return (
            <View
                style={StyleSheet.compose(
                    {
                        flexDirection: "column",
                    },
                    style
                )}
                {...rest}
            />
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L65
class OverlayBackground extends React.Component<ViewProps, {}> {
    render(){
        const { style, ...rest } = this.props;

        return (
            // UIVisualEffectView()
            <View
                style={StyleSheet.compose(
                    {
                        flexDirection: "column",
                    },
                    style
                )}
            />
        );
    }
}

interface Props {
    orientation: "portrait"|"landscape"|"unknown",
}

interface State {

}

export class BrowserViewController extends React.Component<Props, State> {
    private readonly scrollY = new Animated.Value(HEADER_RETRACTION_DISTANCE);
    private readonly scrollEndDragVelocity = new Animated.Value(DRAG_END_INITIAL);
    private readonly snapOffset = new Animated.Value(0);
    private readonly animatedNavBarTranslateY: Animated.Node<number>;
    private readonly animatedTitleOpacity: Animated.Node<number>;

    render(){
        const { orientation } = this.props;
        // Visibility of certain components changes when switching app (if in private browsing mode)
        // https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L343

        return (
            <View
                // stretchLastChild={true}
                style={{
                    flex: 1,
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                }}
            >
                <RetractibleHeaderConnected
                    scrollY={this.scrollY}
                    animatedTitleOpacity={this.animatedTitleOpacity}
                    animatedNavBarTranslateY={this.animatedNavBarTranslateY}
                    orientation={orientation}
                />

                <View
                    // dock={"bottom"}
                    // stretchLastChild={true}
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        flexGrow: 1,
                        alignItems:"center",
                        // justifyContent: "flex-start",
                        backgroundColor:"green",
                        flexDirection: "column",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            width: "100%",
                            // height: "100%",
                            // flexGrow: 1,
                        }}
                    >
                        <WebViewContainerBackdrop
                            style={{
                                backgroundColor: "gold",
                                position: "absolute",
                            }}
                        />
                        <WebViewContainerConnected
                            style={{
                                position: "absolute",
                                flexGrow: 1,
                            }}
                            scrollY={this.scrollY}
                            scrollEndDragVelocity={this.scrollEndDragVelocity}
                            snapOffset={this.snapOffset}
                            animatedNavBarTranslateY={this.animatedNavBarTranslateY}
                            animatedTitleOpacity={this.animatedTitleOpacity}
                        />
                    </View>

                    <FooterConnected
                        scrollY={this.scrollY}
                        orientation={orientation}
                        showToolbar={true}
                    />
                </View>
            </View>
        );
    }
}