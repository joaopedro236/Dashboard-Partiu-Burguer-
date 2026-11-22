export default async function createOrderRequisition(setLoading, resultInputs) {
    try {
        setLoading(true)

        const response = await fetch(`${import.meta.env.VITE_API_URL}/createOrder`, {
            method: "POST",
            body: resultInputs,
            credentials: 'include'
        })

        let data
        try {
            data = await response.json()
        } catch {
            data = null
        }

        if (!response.ok || data?.Status === false) {
            const message = data?.Error || data?.detail || `Erro ao cadastrar pedido (HTTP ${response.status})`
            alert(message)
            return false
        }

        if (data?.Status) {
            alert("Pedido cadastrado")
            return true
        }

        alert("A API não confirmou o cadastro do pedido")
        return false
    } catch (error) {
        console.error(error)
        alert(error instanceof Error ? error.message : "Erro ao cadastrar pedido")
        return false
    } finally {
        setLoading(false)
    }
}
