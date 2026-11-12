export default async function editOrder(order_name, edit) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/editOrder`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...edit,
                nameToBeReplaced: order_name
            })
        })
        const data = await response.json()
        if (data?.Error){
            console.error(data?.Error)
        }
        alert('Editado com sucesso')
    }
    catch (error) {
        console.error(error)
    }

}