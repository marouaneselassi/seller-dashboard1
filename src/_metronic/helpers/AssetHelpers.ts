export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname
export const uploadedFile = (pathname: string) => 'https://lna-cdn.s3-ap-southeast-1.amazonaws.com/' + pathname
