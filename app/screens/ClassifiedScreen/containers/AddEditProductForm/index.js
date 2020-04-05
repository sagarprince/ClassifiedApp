// Core
import React, { useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Toast } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Context
import { ClassifiedContext } from '../../context';

// Components
import { FormInput, FormSelect, FormImagesInput, FormLocationInput } from '../../components/FormFields';

const AddEditProductForm = ({ categoryId, type, mode }) => {
    const navigation = useNavigation();
    const { productCRUD, saveProduct, setPlaces } = useContext(ClassifiedContext);

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Please enter a product title.'),
        description: Yup.string()
            .required('Please enter a product description.'),
        price: Yup.mixed()
            .required('Please enter a product price.')
            .test(
                'isNumber',
                'Please enter a valid product price.',
                value => {
                    const pattern = /^\d+$/;
                    const isValid = pattern.test(value);
                    return isValid ? parseInt(value, 10) > 0 : isValid;
                },
            ),
        frequency: Yup.string()
            .required('This is a required field.'),
        photos: Yup.array().required('Please upload product images.'),
        location: Yup.mixed()
            .test(
                'required',
                'Please select a location.',
                value => value.name,
            ),
    });

    const frequencyOptions = [
        { label: 'Per Month', value: 'monthly' },
        { label: 'Per Week', value: 'weekly' },
        { label: 'Per Year', value: 'yearly' },
    ];

    const formState = {
        categoryId: categoryId,
        title: '',
        description: '',
        price: '',
        frequency: 'monthly',
        photos: [],
        location: {
            name: '',
            lat: '',
            lng: ''
        },
        user: {
            id: 1,
            name: 'Sagar Pansare'
        },
        type: type
    };

    const showToast = (text, type) => {
        Toast.show({ text: text, textStyle: { fontSize: 15 }, type: type });
    }

    const onSave = useCallback((product) => {
        saveProduct(product).then((_) => {
            let text = 'Product updated successfully.';
            if (mode === 'add') {
                navigation.goBack();
                text = 'Product created successfully.'
            }
            showToast(text, 'success');
        }).catch((err) => {
            showToast(err.toString(), 'danger');
        });
    }, [saveProduct]);

    useEffect(() => {
        return () => setPlaces({ entities: [] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Formik
            initialValues={formState}
            validationSchema={validationSchema}
            onSubmit={product => onSave(product)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, setFieldError }) => (
                <View>
                    <View>
                        <FormInput label="Title"
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title} errors={errors.title} maxLength={100} />
                    </View>
                    <View style={styles.marginTop}>
                        <FormInput label="Description of the product"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            errors={errors.description}
                            maxLength={500} multiline={true} numberOfLines={5} />
                    </View>
                    <View style={styles.marginTop}>
                        <FormInput label={type === 'sell' ? 'Selling Price' : 'Renting Price'}
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            keyboardType="numeric"
                            value={values.price} errors={errors.price}
                        />
                    </View>
                    {type === 'rent' && <View style={styles.marginTop}>
                        <FormSelect
                            placeholder='Please select a rent frequency.'
                            options={frequencyOptions}
                            optionLabelKey="label"
                            optionValueKey="value"
                            selectedValue={values.frequency}
                            onValueChange={handleChange('frequency')}
                            errors={errors.frequency}
                        />
                    </View>}
                    <View style={[styles.marginTop, styles.productImagesWrap]}>
                        <Text style={styles.productImagesHeading}>Product Images (Max 3)</Text>
                        <FormImagesInput value={values.photos}
                            onChange={(photos) => setFieldValue('photos', photos, true)}
                            errors={errors.photos} />
                    </View>
                    <View>
                        <FormLocationInput value={values.location.name}
                            onChange={(location) => setFieldValue('location', location, true)}
                            errors={errors.location}
                        />
                    </View>
                    <View style={styles.actions}>
                        <Button style={styles.btn} onPress={handleSubmit} disabled={productCRUD.isLoading}>
                            {productCRUD.isLoading && <ActivityIndicator size="small" color="#fff" style={styles.btnLoader} />}
                            <Text style={styles.btnText}>{mode === 'add' ? 'CREATE' : 'UPDATE'}</Text>
                        </Button>
                    </View>
                </View>
            )}
        </Formik>
    );
};

AddEditProductForm.propTypes = {
    categoryId: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
    container: {},
    marginTop: {
        marginTop: 15
    },
    productImagesWrap: {
        marginBottom: 10
    },
    productImagesHeading: {
        color: '#39405B',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10
    },
    actions: {
        marginTop: 30,
        marginBottom: 25
    },
    btn: {
        width: '100%',
        borderRadius: 0,
        justifyContent: 'center'
    },
    btnText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
    },
    btnLoader: {
        marginRight: 10
    }
});

export default AddEditProductForm;
