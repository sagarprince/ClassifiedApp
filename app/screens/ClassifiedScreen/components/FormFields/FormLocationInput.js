// Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

// Components
import PlacesAutocompleteModal from '../PlacesAutocompleteModal';

const FormLocationInput = (props) => {
    const { value, errors, onChange } = props;
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
                <Icon type="Entypo" name="location-pin" style={styles.icon} />
                {!value && <Text style={styles.placeholder} numberOfLines={1}>Set Location</Text>}
                <Text style={styles.location} numberOfLines={1}>{value}</Text>
            </TouchableOpacity>
            <Text style={styles.error}>{errors}</Text>
            <PlacesAutocompleteModal visible={isModalVisible}
                onChangeLocation={(value) => onChange(value.name)}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

FormLocationInput.defaultProps = {
    value: ''
}

FormLocationInput.propTypes = {
    value: PropTypes.any,
    errors: PropTypes.any,
    onChangeText: PropTypes.func
};

const styles = StyleSheet.create({
    btn: {
        borderWidth: 1,
        borderColor: '#bcbcbc',
        height: 62,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 24,
        color: '#8FBF38'
    },
    placeholder: {
        marginLeft: 5,
        fontSize: 16,
        color: '#bcbcbc'
    },
    location: {
        marginLeft: 5,
        paddingRight: 15,
        fontSize: 16,
        color: '#444',
    },
    error: {
        marginTop: 5,
        color: '#ED5D02',
        fontSize: 12
    }
});

export default FormLocationInput;
