export default async function createOrderRequisition(setLoading, resultInputs) {

    try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/createOrder`, {
            method: "POST",
            body: resultInputs,
            
            credentials: 'include'
        })
    const data = await response.json()
    if (data?.Status) { alert("Pedido cadastrado") }
    if (data?.Error) { alert(data?.Error) }
}catch (error) {
    console.error(error)
} finally {
    setLoading(false)
}
}