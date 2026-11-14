
import '../editOrder.css'
import editOrder from '../../../Requisitions/editOrder'

export default function ImageEdit({ order, section }) {
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const order_name = formData.get('orderName')
        const image = formData.get('editImage')

        await editOrder(order_name, { image })
    }

    return (
        <section className={`editOrder ${section == 'editImage' ? 'flex' : 'hidden'} gap-2.5 flex-col items-center justify-center w-full h-screen`}>
            <header>
                <h1>Editar Imagem</h1>
                <p>Selecione a nova imagem</p>
            </header>

            <form onSubmit={handleSubmit}>
                <select name="orderName" required>
                    {order?.map((orderMap, index) => (
                        <option key={index} value={orderMap.Name}>
                            {orderMap.Name}
                        </option>
                    ))}
                </select>

                <input
                    type="file"
                    accept="image/*"
                    name="editImage"
                    required
                />

                <button type="submit">Edit</button>
            </form>
        </section>
    )
}
