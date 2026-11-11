
export default async function verifyCode(code) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/verify-code`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    code: code
                })
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.detail || "Código inválido.")
        }

        return data
    }
    catch (error) {
        console.error(error)
    }
}
