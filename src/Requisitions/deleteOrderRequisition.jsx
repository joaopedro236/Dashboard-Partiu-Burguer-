export default async function deleteOrderRequisition(name) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteOrder`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderName: name,
            })
        })
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
        if (data?.Status){ alert('Pedido Deletado')}
    } catch (error) {
        console.error(error)
    }
}