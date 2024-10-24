
const domain = "https://localhost:8443"
const version = "/v1"



export async function authenticate(email: string, password: string):Promise<{token: string, user_id: string}> {
    const url = `${domain}${version}/login`;
    
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
            token: result.token,
            user_id: result.user_id
        }
    } catch (error:any) {
        throw error;
    }
}

export async function signup(name: string, email: string, password: string):Promise<{token: string, user_id: string}> {
    const url = `${domain}${version}/users`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
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
            token: result.token,
            user_id: result.user_id
        }
    } catch (error:any) {
        throw error;
    }
}