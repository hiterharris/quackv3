import React, {useEffect, useState} from 'react';
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
// import axios from 'axios';


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


    const restaurant = props.restaurant;
    console.log(props);

    return (
        <Animated.View
            {...this.cardPanResponder.panHandlers}
            style={[styles.cardContainer, animatedStyle]} >
            <View style={styles.cardContainer}>
                <Image 
                    style={styles.restaurantImage}
                    source={{ uri: restaurant.image_url }}
                />
                <View style={styles.restaurantDetailsContainer}>
                    <View>
                        <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                        <Text style={styles.restaurantCategory}>Category: </Text>
                        <Text style={styles.restaurantDistance}>Distance: </Text>
                    </View>
                    <View style={styles.info} onPress={() => Linking.openURL(restauraunt.url)}>
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
        // width: width * 0.90,
        // height: height * 0.82,
        // backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        // margin: 18,
        // padding: 10,
    },
    restaurantImage: {
        position: 'absolute',
        width: width * 0.90,
        height: height * .82,
    },
    restaurantDetailsContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: 50,
    },
    restaurantDetails: {
    },
    restaurantTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
        // width: width * .75,
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
    info: {
        marginTop: 5,
    },
    infoImage: {
        width: 25,
        height: 25,
    },
  });
