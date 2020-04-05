// Core
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

// Components
import SetLocation from '../SetLocation';

const FormLocationInput = ({ value, errors, onChange }) => {
    return (
        <React.Fragment>
            <SetLocation value={value}
                onChangeLocation={(v) => onChange(v)}
                style={styles.setLocationBtn}
            />
            <Text style={styles.error}>{errors}</Text>
        </React.Fragment>
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
    setLocationBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#bcbcbc',
        height: 60,
        paddingLeft: 15,
        paddingRight: 30,
    },
    error: {
        marginTop: 5,
        color: '#ED5D02',
        fontSize: 12
    }
});

export default FormLocationInput;
