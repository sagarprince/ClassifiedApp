// Core
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'native-base';

// Context
import {ClassifiedContext} from '../../context';

// Components
import SearchInput from '../../components/SearchInput';

const HomeSearchBox = () => {
  const {search, dispatch} = useContext(ClassifiedContext);

  const onChange = text => {
    dispatch({payload: {search: text}});
  };

  return (
    <Card style={styles.container}>
      <SearchInput
        placeholder={'What are you looking for today?'}
        value={search}
        onChange={onChange}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 55,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default HomeSearchBox;
