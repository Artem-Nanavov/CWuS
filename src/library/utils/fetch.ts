import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';
import {setAccessToken} from 'pages/Authorization/actions';
import {RootState} from 'main';
import {login, logout} from 'library/common/actions/user';

interface IFailedQueue {
	resolve: (payload: any) => void;
	reject: (payload: any) => void;
}

const createAxiosShit = (accessToken: string, config?: AxiosRequestConfig) => axios.create({
	baseURL: '/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: accessToken,
	},
	withCredentials: true,
	...config,
});

let isRefreshing = false;
let failedQueue: IFailedQueue[] = [];

const processQueue = (error: Error | null, token: null | string = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

const initializeAxios = (store: RootState, dispatch: (action: any) => void) => {
	const {accessToken, refreshToken} = store.auth;

	const nonAuthFetch = axios.create({
		baseURL: 'http://localhost:8000/',
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});

	const fetch = createAxiosShit(`${accessToken}`);

	fetch.interceptors.response.use(
		(response) => response,
		async (e) => {
			const originalRequest = e.config;

			if (e.response && e.response.status === 401 && !originalRequest._retry) {
				if (isRefreshing) {
					return new Promise<AxiosPromise>((resolve, reject) => {
						failedQueue.push({resolve, reject});
					})
						.then((token) => {
							originalRequest.headers.Authorization = token;

							return axios(originalRequest);
						})
						.catch((err) => Promise.reject(err));
				}

				originalRequest._retry = true;
				isRefreshing = true;

				try {
					const ref = await nonAuthFetch.post('user/refresh-tokens', {
						refresh: refreshToken,
					});

					dispatch(setAccessToken(ref.data.access));
					dispatch(login());

					const resp = axios({
						...e.config,
						headers: {
							...e.config.headers,
							Authorization: `${ref.data.access}`,
						},
					});
					
					processQueue(null, `${ref.data.access}`);

					return Promise.resolve(resp);
				} catch {          
          processQueue(e, null);
          
					if (e.response.status === 401) {
            console.error('Не получилось обновить access_token - Ваш рефреш токен протух', 'error')
						dispatch(logout());
					}
				} finally {
					isRefreshing = false;
				}
			}

			return Promise.reject(Error(e));
		},
	);

	const requestTypes = (sectionUrl: string) => ({
		get: (url: string, config?: any) => fetch.get(`${sectionUrl}${url}`, config),

		post: (url: string, config?: string) => fetch.post(`${sectionUrl}${url}`, config),

		delete: (url: string) => fetch.delete(`${sectionUrl}${url}`),

		patch: (url: string, config?: string) => fetch.patch(`${sectionUrl}${url}`, config),
	});

	const fetchUser = requestTypes('http://localhost:8000/user/');

	return {
		fetchUser,
		nonAuthFetch,
	};
};

export default initializeAxios;
