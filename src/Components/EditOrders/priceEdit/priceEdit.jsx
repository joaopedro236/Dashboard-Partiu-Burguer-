
import './priceEdit.css'
import editOrder from '../../../Requisitions/editOrder'

export default function priceEdit({ order, section }) {
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const order_name = formData.get('orderName')
        const price = Number(formData.get('editPrice'))

        await editOrder(order_name, { price })
    }

    return (
        <section className={`editOrder ${section == 'editPrice' ? 'flex' : 'hidden'} gap-2.5 flex-col items-center justify-center w-full h-screen`}>
            <header>
                <h1>Editar Preço</h1>
                <p>Insira o novo preço</p>
            </header>

            <form onSubmit={handleSubmit}>
                <select name="orderName" required>
                    {order?.map((orderMap, index) => (
                        <option key={index} value={orderMap.Name}>
                            {orderMap.Name}
                        </option>
                    ))}
                </select>

                <input type="number" step="0.01" placeholder="Novo preço" name="editPrice" required />
                <button type="submit">Edit</button>
            </form>
        </section>
    )
}
