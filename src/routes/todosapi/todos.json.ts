export const get = () => {
    console.log("GET request received"); // Log when the API is accessed
    return {
        status: 200,
        body: { message: "hello from the api" }
    };
};