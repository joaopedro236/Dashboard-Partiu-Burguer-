export default async function editOrder(order_name, edit) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/editOrder`, {
            method: 'PATCH',
           
            credentials: 'include',
            body: (() => {
                const formData = new FormData()
                formData.append('nameToBeReplaced', order_name)

                Object.entries(edit).forEach(([key, value]) => {
                    formData.append(key, value)
                })

                return formData
            })()
        })
        const data = await response.json()
        if (!response.ok || !data?.Status) {
            throw new Error(data?.Error || data?.detail || 'Não foi possível editar o pedido.')
        }
        alert('Pedido editado com sucesso')
    }
    catch (error) {
        console.error(error)
        alert(error instanceof Error ? error.message : 'Não foi possível editar o pedido.')
    }

}