
import '../editOrder.css'
import editOrder from '../../../Requisitions/editOrder'

export default function typeEdit({ order, section }) {
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const order_name = formData.get('orderName')
        const type = formData.get('editType')

        await editOrder(order_name, { type })
    }

    return (
        <section className={`editOrder ${section == 'editType' ? 'flex' : 'hidden'} gap-2.5 flex-col items-center justify-center w-full h-screen`}>
            <header>
                <h1>Editar Tipo</h1>
                <p>Selecione o novo tipo</p>
            </header>

            <form onSubmit={handleSubmit}>
                <select name="orderName" required>
                    {order?.map((orderMap, index) => (
                        <option key={index} value={orderMap.Name}>
                            {orderMap.Name}
                        </option>
                    ))}
                </select>

                <input type="text" placeholder="Novo tipo" name="editType" required />
                <button type="submit">Edit</button>
            </form>
        </section>
    )
}
