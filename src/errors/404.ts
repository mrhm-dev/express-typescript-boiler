class Custom404Error extends Error {
	constructor(public statusCode: number, ...params) {
		super(...params);
		this.name = 'Custom 404 Error';
	}
}

export default Custom404Error;
