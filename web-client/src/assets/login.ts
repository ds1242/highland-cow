

export async function authenticate(email: string, password: string):Promise<{ user_id: string, name: string, email: string, token: string}> {
    const url = "http://localhost:8080/v1/login"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            // credentials: "include",
        });
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json()
        return {
            user_id: result.user_id,
            name: result.name,
            email: result.email,
            token: result.token
        }
    } catch (error:any) {
        console.error(error.message)
        throw error;
    }
}