import {useState, useEffect, useContext} from 'react';
import {ClassifiedContext} from '../context';

export function useCategory(id) {
  const [category, setCategory] = useState();
  const {categories} = useContext(ClassifiedContext);

  useEffect(() => {
    const _category = categories.find(c => c.id === id);
    setCategory(_category);
  }, [categories, id]);

  return category;
}
