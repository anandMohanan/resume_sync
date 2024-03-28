
export const GET = async () => {
    //return json hello world with key as message and document type

    return new Response(JSON.stringify({ message: "Hello, World!" }), {
        headers: { "content-type": "application/json" },
    });

};
