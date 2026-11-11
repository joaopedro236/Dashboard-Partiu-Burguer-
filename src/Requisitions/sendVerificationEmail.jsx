
export default async function sendVerification() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/send-verification`,
            {
                method: "POST",
                credentials: 'include'
            }
        )

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.detail || "Erro ao enviar código.")
        }

        return data
    }
    catch (error) {
        console.error(error)
    }
}
