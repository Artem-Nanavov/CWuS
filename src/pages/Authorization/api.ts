import axios from 'axios';
import {fetches} from 'main/index';

interface IAuthData {
	login: string;
	password: string;
}

interface IDataReg {
	email: string;
	password: string;
	username: string;
}

const authFetch = (data: IAuthData | IDataReg) => axios.create({
	baseURL: 'http://localhost:8000/auth',
	headers: {
		'Content-Type': 'application/json',
		Authorization: JSON.stringify(data),
	},
});

export const requestLogin = (data: IAuthData) => authFetch(data).post('/login');

export const requestReg = (data: IDataReg) => authFetch(data).post('/reg');

export const getAccessToken = (refreshToken: string) =>	fetches()
	.nonAuthFetch.post('http://localhost:8000/auth/refresh-tokens', {
		refresh: refreshToken,
	});
