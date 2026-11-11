import { useState } from "react"
import "./Menu.css"
export default function Menu({setSection}) {
    const [menuActive, setMenuActive] = useState(false)
    return (
        <>
        <button className="buttonMenu absolute rounded-sm" onClick={() => setMenuActive(prev => !prev)  }>☰</button>
        <section className={`menu ${menuActive ? "flex" :"hidden"} fixed h-screen flex items-center flex-col  justify-center`}>
            <ul className="flex flex-col  items-center justify-center text-center">
                <li onClick={() => {
                    setSection("createOrder")
                    setMenuActive(false)
                }}>Criar Pedido</li>
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