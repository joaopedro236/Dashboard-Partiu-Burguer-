    import './descriptionEdit.css'
    import editOrder from '../../../Requisitions/editOrder'
    export default function descriptionEdit( { order,section }) {
        const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const order_name = formData.get('orderName')
        const description = formData.get('editDescription')

        await editOrder(order_name, { description })

    }
        return (
            <>
                <section className={`editOrder ${section == 'editDescription' ? 'flex' : 'hidden'} gap-2.5 flex-col items-center justify-center w-full h-screen`}>
                    <header>

                        <h1>Editar Descrição</h1>
                        <p>preenche os inputs e edita</p>
                    </header>
                    <form onSubmit={handleSubmit}>

                        <select name="orderName" required>
                            {order?.map((orderMap, index) => (
                                <option key={index} value={orderMap.Name}>
                                    {orderMap.Name}
                                </option>
                            ))}
                        </select>
                        <input type="text"placeholder='Trocar de descrição' name='editDescription'/>
                        <button type="submit">Edit</button>
                    </form>
                </section>
            </>
        )
    }