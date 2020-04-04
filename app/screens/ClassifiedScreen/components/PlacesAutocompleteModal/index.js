// Core
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import {
    Container, Header, Body, Left, Right,
    Title, Button, Text, Icon, Item, Input
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';

// Context
import { ClassifiedContext } from '../../context';

// Hooks
import { useFormInput, useDebounce } from '../../hooks';

const PlacesAutocompleteModal = ({ visible, onChangeLocation, onClose }) => {
    const { value, onChange } = useFormInput('');
    const debouncedSearchTerm = useDebounce(value, 500);
    const { places, setPlaces, fetchPlaces } = useContext(ClassifiedContext);

    useEffect(() => {
        console.log('SEARCH TERM ', debouncedSearchTerm);
        fetchPlaces(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const _onChangeLocation = () => {
        const selected = places.entities.find((p) => p.selected);
        if (selected) {
            onChangeLocation && onChangeLocation(selected);
        }
        onClose && onClose();
    };

    const onPlaceSelection = (item) => {
        const entities = places.entities.map((p) => {
            if (p.id === item.id && !p.selected) {
                p.selected = true;
            } else {
                p.selected = false;
            }
            return p;
        });
        setPlaces({ entities });
    };

    const setPlaceItemHightlight = (item) => {
        return { backgroundColor: item.selected ? '#eee' : 'transparent' }
    };

    const isPlaceSelected = () => {
        return places.entities.find((p) => p.selected) ? true : false;
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                Alert.alert('Success', initialPosition);
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 3000, maximumAge: 1000 },
        );
    }

    return (
        <Modal isVisible={visible}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            onBackButtonPress={() => onClose && onClose()}
            style={styles.modal}>
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => onClose && onClose()} style={styles.backBtn}>
                            <Icon type="Entypo" name="chevron-thin-left" style={styles.backIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerTitle}>Set Location</Title>
                    </Body>
                    <Right>
                        {isPlaceSelected() && <Button transparent
                            onPress={_onChangeLocation}
                            style={styles.backBtn}>
                            <Icon type="MaterialIcons" name="check" style={styles.doneIcon} />
                        </Button>}
                    </Right>
                </Header>
                <View>
                    <Item style={styles.searchBox}>
                        <Input placeholder="Search..." value={value} onChangeText={onChange} style={styles.searchBoxInput} />
                        {places.isLoading ? <ActivityIndicator size="small" /> : (
                            value !== '' ? <TouchableOpacity onPress={() => onChange('')}>
                                <Icon type="MaterialIcons" name="close" style={styles.clearBtnIcon} />
                            </TouchableOpacity> : <Icon name="search" />
                        )}
                    </Item>
                    <View style={styles.listing}>
                        <FlatList
                            data={places.entities}
                            ListHeaderComponent={() => {
                                return (
                                    <View style={styles.currentLocation}>
                                        <TouchableOpacity style={styles.currentLocationBtn} onPress={getCurrentLocation}>
                                            <Icon type="Feather" name="crosshair" style={styles.currentLocationIcon} />
                                            <Text style={styles.currentLocationBtnText}>Current Location</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.placeItem, setPlaceItemHightlight(item)]}
                                        onPress={() => onPlaceSelection(item)}>
                                        <Text style={styles.placeItemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            ItemSeparatorComponent={() => (
                                <View style={styles.placeSeparator} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </Container>
        </Modal>
    );
}

PlacesAutocompleteModal.defaultProps = {
    visible: false
};

PlacesAutocompleteModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

const styles = StyleSheet.create({
    modal: {
        margin: 0
    },
    header: {
        backgroundColor: '#8EBF37'
    },
    backBtn: {
        marginLeft: 5
    },
    backIcon: {
        color: 'white',
        fontSize: 24
    },
    doneIcon: {
        color: 'white',
        fontSize: 26
    },
    headerTitle: {
        color: 'white'
    },
    container: {
        backgroundColor: 'white'
    },
    searchBox: {
        paddingHorizontal: 10,
    },
    searchBoxInput: {
        fontSize: 16,
    },
    clearBtnIcon: {
        color: '#ED5D02',
        fontSize: 22
    },
    listing: {
        height: '90%'
    },
    currentLocation: {
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7'
    },
    currentLocationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    currentLocationBtnText: {
        color: '#39405B',
        fontSize: 16,
        fontWeight: '400'
    },
    currentLocationIcon: {
        fontSize: 22,
        marginRight: 10
    },
    placeItem: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 15,
    },
    placeSeparator: {
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7'
    },
    placeItemText: {
        color: '#39405B',
        fontSize: 15,
        fontWeight: '400'
    },
    selectedItemIcon: {
        position: 'absolute',
        right: 5
    }
});

export default PlacesAutocompleteModal;