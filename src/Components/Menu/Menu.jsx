import { useState } from "react"
export default function Menu({setSection}) {
    const [menuActive, setMenuActive] = useState(false)
    return (
        <>
        <button className="buttonMenu absolute rounded-sm" onClick={() => setMenuActive(prev => !prev)  }>☰</button>
        <section className={`menu ${menuActive ? "flex" :"none"} fixed h-screen flex items-center flex-col  justify-center`}>
            <ul className=" flex-col items-center justify-center text-center">
                <li onClick={() => {
                    setSection("createOrder")
                    setMenuActive(false)
                }}>Criar Pedido</li>
                <li onClick={() => { 
                    setSection("editOrder")
                    setMenuActive(false)
                }}>Editar Pedido</li>
                <li onClick={() => {
                    setSection("Order")
                    setMenuActive(false)
                }}>Cardápio</li>
                <li onClick={() => {
                    setSection("deleteOrder")
                    setMenuActive(false)
                }}>Deletar Pedido</li>
            </ul>
        </section>
        </>
    )
}