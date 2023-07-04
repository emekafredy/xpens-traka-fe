import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../api/category';
import { setCategories } from '../store/slices/category';
import { ICategoryProps } from '../interfaces/category';

export const userCategories = (section: string) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const getUserCategories = async () => {
		setLoading(true);
		const { data } = await getCategories(section);

    dispatch(
      setCategories(data as unknown as ICategoryProps[])
    );
    setLoading(false);
	};

	const refresh = () => getUserCategories();

	useEffect(() => {
		getUserCategories();
	}, []);

	return { loading, refresh };
};
