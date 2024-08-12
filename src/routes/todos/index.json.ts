export const get = () => {
    return {
        status: 200,
        body: "hello from the api"
    };
};

// import type { RequestHandler } from '@sveltejs/kit';

// export const GET: RequestHandler = () => {
//     return {
//         status: 200,
//         body: { message: "Hello from the API" }
//     };
// };