// Core
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { Item, Label, Input } from 'native-base';

const FormInput = (props) => {
    const { label, labelStyle, inputStyle, errors, onChangeText, style, ...rest } = props;
    const [count, setCount] = useState(0);
    const isMultiline = rest.multiline || false;

    const getInputHeight = useCallback(() => {
        return { height: isMultiline ? 110 : (Platform.OS === 'ios' ? 30 : 40) };
    }, [isMultiline]);

    const onChange = useCallback((text) => {
        rest.maxLength && setCount(text.length);
        onChangeText && onChangeText(text);
    }, [onChangeText]);

    return (
        <View style={style}>
            <Item rounded={true} stackedLabel={true} style={styles.item}>
                <Label style={[styles.label, { ...labelStyle }]}>{label}</Label>
                <Input
                    style={[styles.input, getInputHeight(), { ...inputStyle }]}
                    {...rest}
                    onChangeText={onChange}
                />
                {rest.maxLength &&
                    <Text style={styles.limit}>{count} / {rest.maxLength}</Text>}
            </Item>
            <Text style={styles.error}>{errors}</Text>
        </View>
    );
};

FormInput.defaultProps = {
    label: '',
    labelStyle: {},
    inputStyle: {},
};

FormInput.propTypes = {
    label: PropTypes.string,
    errors: PropTypes.any,
    onChangeText: PropTypes.func,
    labelStyle: PropTypes.object,
    inputStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    item: {
        borderRadius: 0,
        borderColor: '#888',
        paddingHorizontal: 15,
        paddingTop: 4,
        paddingBottom: 2,
    },
    label: {
        fontSize: 14,
    },
    input: {
        marginLeft: -7,
        fontSize: 15,
    },
    limit: {
        position: 'absolute',
        right: 7,
        top: 10,
        fontSize: 14,
        color: '#888'
    },
    error: {
        marginTop: 5,
        color: '#ED5D02',
        fontSize: 12
    }
});

export default FormInput;
