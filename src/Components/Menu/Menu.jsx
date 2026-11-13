import { useState } from "react"
import "./Menu.css"
export default function Menu({ setSection }) {
    const [menuActive, setMenuActive] = useState(false)
    const [editActiveOrder, setEditActiveOrder] = useState(false)

    function navigateTo(section) {
        setSection(section)
        setMenuActive(false)
    }

    return (
        <>
            <button className="buttonMenu absolute rounded-sm" onClick={() => setMenuActive(prev => !prev)}>☰</button>
            <section className={`menu ${menuActive ? "flex" : "hidden"} fixed h-screen flex items-center flex-col justify-center`}>
                <ul className="flex flex-col items-center justify-center text-center">
                    <li onClick={() => navigateTo("createOrder")}>Criar Pedido</li>
                    <li onClick={() => navigateTo("Order")}>Cardápio</li>
                    <li onClick={() => navigateTo("sortOrders")}>Ordenar Pedidos</li>
                    <li onClick={() => setEditActiveOrder(prev => !prev)}>Editar Pedido</li>
                    <li className={`menuEditOption ${editActiveOrder ? '' : 'hidden'}`} onClick={() => navigateTo("editName")}>• Editar Nome</li>
                    <li className={`menuEditOption ${editActiveOrder ? '' : 'hidden'}`} onClick={() => navigateTo("editDescription")}>• Editar Descrição</li>
                    <li className={`menuEditOption ${editActiveOrder ? '' : 'hidden'}`} onClick={() => navigateTo("editPrice")}>• Editar Preço</li>
                    <li className={`menuEditOption ${editActiveOrder ? '' : 'hidden'}`} onClick={() => navigateTo("editImage")}>• Editar Imagem</li>
                    <li className={`menuEditOption ${editActiveOrder ? '' : 'hidden'}`} onClick={() => navigateTo("editType")}>• Editar Tipo</li>
                    <li onClick={() => navigateTo("deleteOrder")}>Deletar Pedido</li>
                </ul>
            </section>
        </>
    )
}
