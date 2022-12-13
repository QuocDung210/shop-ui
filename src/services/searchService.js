import { searchFailed, searchStart, searchSuccess } from '~/redux/searchSlice';
import * as request from '~/untils/request';

export const search = async (q, dispatch, type = 'more') => {
    dispatch(searchStart());
    try {
        const res = await request.get('users/search', {
            params: {
                q,
                type,
            },
        });
        dispatch(searchSuccess(res.data));

        // return res.data;
    } catch (error) {
        dispatch(searchFailed());
    }
};
