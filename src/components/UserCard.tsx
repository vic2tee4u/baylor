import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { User } from '../redux/authentication/action';

interface IUsercard extends User {
    onPress: () => void;
}

const UserCard = ({ onPress, name, email }: IUsercard) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    name: {
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    email: {
        fontStyle: 'normal',
        fontWeight: '200',
        color: 'grey',
    },
    container: {
        width: '90%',
        height: 50,
        margin: 5,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginVertical: 10,
        alignSelf: 'center',
        marginHorizontal: 10,
        borderBottomWidth: 0.2,
    }
});
