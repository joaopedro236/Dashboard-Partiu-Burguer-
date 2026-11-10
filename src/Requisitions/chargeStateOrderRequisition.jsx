export default async function chargeStateOrder(idOrder) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chargeStateOrder`, {
            method: 'PUT',
            body: JSON.stringify({
                id: idOrder
            })
        })
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
    } catch (error) {
        console.error(error)
    }
}