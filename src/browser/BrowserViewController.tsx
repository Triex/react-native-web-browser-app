import * as React from "react";
import { RetractibleHeaderConnected } from "./header/Header";
import { View, ViewProps, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { FooterConnected } from "./footer/Footer";
import { HEADER_RETRACTION_DISTANCE } from "./header/TabLocationView";
import { DRAG_END_INITIAL } from "./bothBars/barSpring";
import { WebViewContainerConnected, WebViewContainerBackdrop } from "./WebViewContainer";
import { isPortrait, updateOrientation } from "~/store/uiState";
import { connect } from "react-redux";
import { WholeStoreState } from "~/store/store";

const BrowserViewControllerUX = {
    ShowHeaderTapAreaHeight: 0,
    BookmarkStarAnimationDuration: 0.5,
    BookmarkStarAnimationOffset: 80,
}

// // https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L70
// class AlertStackView extends React.Component<ViewProps, {}> {
//     render(){
//         const { style, children, ...rest } = this.props;

//         return (
//             <View
//                 style={StyleSheet.compose(
//                     {
//                         flexDirection: "column",
//                     },
//                     style
//                 )}
//                 {...rest}
//             />
//         );
//     }
// }

// // https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L65
// class OverlayBackground extends React.Component<ViewProps, {}> {
//     render(){
//         const { style, ...rest } = this.props;

//         return (
//             // UIVisualEffectView()
//             <View
//                 style={StyleSheet.compose(
//                     {
//                         flexDirection: "column",
//                     },
//                     style
//                 )}
//             />
//         );
//     }
// }

interface Props {
    updateOrientation: typeof updateOrientation,
}

interface State {

}

export class BrowserViewController extends React.Component<Props, State> {
    private readonly scrollY = new Animated.Value(HEADER_RETRACTION_DISTANCE);
    private readonly scrollEndDragVelocity = new Animated.Value(DRAG_END_INITIAL);
    private readonly snapOffset = new Animated.Value(0);
    private readonly animatedNavBarTranslateY: Animated.Node<number>;
    private readonly animatedTitleOpacity: Animated.Node<number>;

    private readonly onOrientationChange = () => {
        this.props.updateOrientation(isPortrait() ? 'portrait' : 'landscape');
    };

    componentDidMount(){
        Dimensions.addEventListener('change', this.onOrientationChange);
    }
    
    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.onOrientationChange);
    }

    render(){
        const { } = this.props;
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
                />

                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        flexGrow: 1,
                        alignItems:"center",
                        backgroundColor:"green",
                        flexDirection: "column",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            width: "100%",
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
                        showToolbar={true}
                    />
                </View>
            </View>
        );
    }
}

export const BrowserViewControllerConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        // console.log(`wholeStoreState`, wholeStoreState);
        return {};
    },
    {
        updateOrientation: updateOrientation
    },
)(BrowserViewController);