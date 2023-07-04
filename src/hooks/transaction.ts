import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTransactions } from '../api/transaction';
import { setTransactions } from '../store/slices/transaction';
import { EmptyPaginationState } from '../interfaces/transaction';

export const userTransactions = (query: string, page: number) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const getUserTransactions = async () => {
		setLoading(true);
		const { data } = await getTransactions(query, page);

    dispatch(
      setTransactions(data || EmptyPaginationState)
    );
    setLoading(false);
	};

	const refresh = () => getUserTransactions();

	useEffect(() => {
		getUserTransactions();
	}, [query, page]);

	return { loading, refresh };
};
