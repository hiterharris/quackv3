import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Linking,
    PanResponder,
    Animated,
} from 'react-native';

panResponder = (props) => {
    this.pan = new Animated.ValueXY();
    this.cardPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.pan.x, dy: this.pan.y },
        ]),
        onPanResponderRelease: (e, { dx }) => {
            const absDx = Math.abs(dx);
            const direction = absDx / dx;
            if (absDx > 120) {
                Animated.decay(this.pan, {
                    velocity: { x: 3 * direction, y: 0 },
                    deceleration: 0.995,
                }).start(props.onSwipeOff);
            } else {
                Animated.spring(this.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 4.5,
                }).start();
            }
        },
    });
}

export default function Card(props) {

    panResponder(props);

    const rotateCard = this.pan.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['10deg', '0deg', '-10deg'],
    });
    const animatedStyle = {
        transform: [
            { translateX: this.pan.x },
            { translateY: this.pan.y },
            { rotate: rotateCard },
        ],
    }

    // const restaurant = props.restaurant;
    console.log(props.restaurant.categories[0].alias);

    return (
        <Animated.View
            {...this.cardPanResponder.panHandlers}
            style={[styles.cardContainer, animatedStyle]} >
            <View style={styles.card}>
                <Image 
                    style={styles.restaurantImage}
                    source={{ uri: props.restaurant.image_url }}
                />
                <View style={styles.restaurantDetailsContainer}>
                    <View style={styles.restaurantDetails}>
                        <Text style={styles.restaurantTitle}>{props.restaurant.name}</Text>
                        <Text style={styles.restaurantCategory}>Category: {props.restaurant.categories[0].alias.toUpperCase()} </Text>
                        <Text style={styles.restaurantRating}>Rating: {props.restaurant.rating} ({props.restaurant.review_count})</Text>
                    </View>
                    <View style={styles.info} onPress={() => Linking.openURL(props.restauraunt.url)}>
                        <Image style={styles.infoImage} source={require('../assets/images/info-icon.png')} />
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    restaurantImage: {
        position: 'absolute',
        width: width * 0.90,
        height: height * .82,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
    },
    restaurantDetailsContainer: {
        flex: 1,
    },
    restaurantTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    restaurantDistance: {
        fontSize: 20,
        fontWeight: '300',
        color: '#FFFFFF',
    },
    restaurantCategory: {
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: 5,
        marginBottom: 5,
    },
    restaurantRating: {
        fontSize: 20,
        fontWeight: '300',
        color: '#FFFFFF',
    },
    info: {
        marginTop: 5,
    },
    infoImage: {
        width: 25,
        height: 25,
    },
  });
