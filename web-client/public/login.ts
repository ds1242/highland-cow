

export async function authenticate(email: string, password: string) {
    const url = "http://localhost:8080/v1/login"
    try {
        const response = await fetch(url, {
            // method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json()
        console.log(result)
        return result
    } catch (error:any) {
        console.error(error.message)
    }
}