// Core
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { Item, Label, Picker, Icon } from 'native-base';

const FormSelect = (props) => {
    const {
        label, labelStyle, placeholder,
        placeholderStyle, options, optionLabelKey, optionValueKey,
        selectedItemStyle, style, errors, ...rest
    } = props;

    return (
        <View styles={style}>
            <Item picker rounded={true} stackedLabel={true} style={styles.item}>
                {label !== '' && <Label style={[styles.label, { ...labelStyle }]}>{label}</Label>}
                <Picker
                    mode="dialog"
                    placeholder={placeholder}
                    placeholderStyle={[styles.placeholderStyle, { ...placeholderStyle }]}
                    placeholderIconColor="#007aff"
                    headerStyle={{ backgroundColor: "#8EBF37" }}
                    headerBackButtonTextStyle={{ color: "#fff" }}
                    headerTitleStyle={{ color: "#fff" }}
                    textStyle={styles.pickerTextStyle}
                    {...rest}
                    style={styles.pickerStyle}
                >
                    {options && options.map((option) => {
                        return <Picker.Item
                            key={option.value}
                            label={option[optionLabelKey]}
                            value={option[optionValueKey].toString()} />
                    })}
                </Picker>
            </Item>
            <Icon type="Entypo" name="chevron-thin-down" style={styles.icon} />
            <Text style={styles.error}>{errors}</Text>
        </View>
    );
};

FormSelect.defaultProps = {
    label: '',
    labelStyle: {},
    placeholder: '',
    placeholderStyle: {},
    style: {},
    options: [],
    optionLabelKey: 'label',
    optionValueKey: 'value'
};

FormSelect.FormSelect = {
    label: PropTypes.string,
    labelStyle: PropTypes.object,
    placeholder: PropTypes.string,
    placeholderStyle: PropTypes.object,
    style: PropTypes.object,
    options: PropTypes.any,
    optionLabelKey: PropTypes.string,
    optionValueKey: PropTypes.string,
    errors: PropTypes.any
};

const styles = StyleSheet.create({
    item: {
        borderRadius: 0,
        borderColor: '#888',
        paddingLeft: 15,
        paddingRight: 30,
        paddingTop: 4,
        paddingBottom: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    pickerStyle: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 35,
        paddingLeft: 0,
        paddingRight: 25,
        marginLeft: Platform.OS === 'ios' ? 0 : -8,
    },
    label: {
        fontSize: 14,
    },
    placeholderStyle: {
        color: '#757575',
    },
    pickerTextStyle: {
        fontSize: 15,
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    icon: {
        position: 'absolute',
        top: 24,
        right: 15,
        fontSize: 20,
        color: '#222',
    },
    error: {
        marginTop: 5,
        color: '#ED5D02',
        fontSize: 12
    }
});

export default FormSelect;
