
import React ,{Component}from "react";
import {
  StyleSheet,
  View, ActivityIndicator 
} from "react-native";


export default class LoadingView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={this.props.loading} size="large" color="#252525"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
    }
});