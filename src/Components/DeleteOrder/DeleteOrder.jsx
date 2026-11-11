import './deleteOrder.css'
import deleteOrderRequisition from '../../Requisitions/deleteOrderRequisition'
export default function DeleteOrder({ order,section }) {
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get('orderName')

        deleteOrderRequisition(name)
    }
    return (
        <>
            <section className={`deleteOrder ${section == 'deleteOrder' ? 'flex' : 'hidden'} gap-2.5 flex-col items-center justify-center w-full h-screen`}>
                <header>

                    <h1>Deletar Pedidos</h1>
                    <p>preenche os inputs e deleta</p>
                </header>
                <form onSubmit={handleSubmit}>

                    <select name="orderName" required>
                        {order?.map((orderMap, index) => (
                            <option key={index} value={orderMap.Name}>
                                {orderMap.Name}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Deletar</button>
                </form>
            </section>
        </>
    )
}