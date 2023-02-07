/**
 * Handling Navigation with State Component as opposed to including react navigation.
 * Primary Focus is on core functionality.
 */

import {
    FlatList,
    Linking,
    ListRenderItem,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelection, getAllUsers, getUserDetails, User } from '../src/redux/authentication/action';
import { RootState } from '../src/redux/root-reducer';
import UserCard from '../src/components/UserCard';

const App = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state: RootState) => state.user.users);
    const selectedUser = useSelector((state: RootState) => state.user.selecteduserDetails);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const renderItem: ListRenderItem<User> = ({ item }) => (
        <UserCard {...item} onPress={() => dispatch(getUserDetails({ user: item }))} />
    );
    const renderEmpty = () => <Text>No Users</Text>;

    const openMaps = (lat: number, lng: number) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
        });
        Linking.openURL(url as string);
    };

    const openPhone = (phoneNumber: number) => Linking.openURL(`tel:${phoneNumber}`);
    const openWebsite = (website: string) => Linking.openURL(`${website}`);

    const renderuserDetails = () => {
        return selectedUser ? (
            <View style={styles.detailWrapper}>
                <TouchableOpacity onPress={() => dispatch(clearSelection())} style={styles.back}>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
                <View style={styles.top}>
                    <Text style={styles.bold}>{selectedUser.name}</Text>
                    <Text>{selectedUser.company.name}</Text>
                </View>
                <View style={styles.align}>
                    <Text style={styles.bold}>Contact Information</Text>
                    <Text style={styles.flexStart}>{selectedUser.email}</Text>
                    <TouchableOpacity style={styles.align} onPress={() => openPhone(Number(selectedUser.phone))}>
                        <Text style={[styles.flexStart, { color: 'blue', marginBottom: 20 }]}>
                            {selectedUser.phone}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.align}
                        onPress={() =>
                            openMaps(Number(selectedUser.address.geo.let), Number(selectedUser.address.geo.lng))
                        }>
                        <Text style={[styles.flexStart, { color: 'blue' }]}>{selectedUser.address.street}</Text>
                        <Text style={[styles.flexStart, { color: 'blue' }]}>{selectedUser.address.suite}</Text>
                        <Text style={[styles.flexStart, { color: 'blue' }]}>{selectedUser.address.city}</Text>
                        <Text style={[styles.flexStart, { color: 'blue' }]}>{selectedUser.address.zipcode}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.align}>
                    <Text style={styles.bold}>Other Information</Text>
                    <Text style={styles.flexStart}>{selectedUser.email}</Text>
                    <View style={styles.align}>
                        <Text style={styles.flexStart}>User name: {selectedUser.username}</Text>
                        <Text style={styles.flexStart}>
                            Website:{' '}
                            <TouchableOpacity onPress={() => openWebsite(`http://www.${selectedUser.website}`)}>
                                <Text style={[styles.flexStart, { color: 'blue' }]}>{selectedUser.website}</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </View>
        ) : null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {renderuserDetails()}
                {!selectedUser && (
                    <FlatList
                        data={allUsers}
                        renderItem={renderItem}
                        keyExtractor={_ => _.id.toString()}
                        ListEmptyComponent={renderEmpty}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    search: {
        position: 'absolute',
        top: 0,
        width: '95%',
        backgroundColor: 'lightgrey',
        borderRadius: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        zIndex: 999,
    },
    btn: {
        position: 'absolute',
        bottom: 0,
        width: '95%',
        backgroundColor: 'brown',
        height: 50,
        borderRadius: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        zIndex: 999,
    },
    detailWrapper: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    back: { marginVertical: 20, width: '100%', alignItems: 'flex-start' },
    backbtn: { fontSize: 16, fontWeight: 'bold' },
    flexStart: { alignSelf: 'flex-start' },
    align: { alignItems: 'center', width: '100%' },
    bold: { fontWeight: 'bold', fontSize: 18, marginVertical: 15 },
    top: { marginVertical: 10, alignItems: 'center' },
});

export default App;
