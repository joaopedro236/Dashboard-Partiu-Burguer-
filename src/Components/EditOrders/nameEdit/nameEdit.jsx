import './nameEdit.css'
import editOrder from '../../../Requisitions/editOrder'
export default function nameEdit( { order,section }) {
    const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const order_name = formData.get('orderName')
    const name = formData.get('editName')

    await editOrder(order_name, { name })

}
    return (
        <>
            <section className={`editOrder ${section == 'editName' ? 'flex' : 'hidden'} gap-2.5 flex-col items-center justify-center w-full h-screen`}>
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
                    <input type="text"placeholder='Trocar de nome' name='editName'/>
                    <button type="submit">Edit</button>
                </form>
            </section>
        </>
    )
}