import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAccount } from '../api/user';
import { setUser } from '../store/slices/user';
import { UserObject } from '../interfaces/user';

export const authUser = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const getUser = async () => {
		setLoading(true);
		const response = await getUserAccount();

		if (response.success) {
			const { data: user } = response;

			dispatch(
				setUser({
					user: user?.data as UserObject,
					isAuthenticated: true,
				})
			);
			setLoading(false);
		} else {
			dispatch(
				setUser({
					isAuthenticated: false,
				})
			);
			setLoading(false);
		}
	};

	const refresh = () => getUser();

	useEffect(() => {
		getUser();
	}, []);

	return { loading, refresh };
};
