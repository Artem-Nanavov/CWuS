export const setRefreshTokenToLS = (token: string) => localStorage.setItem('refresh_token', token);

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token');

export const removeTokens = (name?: string) => {
	switch (true) {
    case (name === 'access_token'): {
      localStorage.removeItem('access_token');
      break;
    };
    
    case (name === 'refresh_token'): {
      localStorage.removeItem('refresh_token');
      break;
    };

    default: {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    };
	};
};
