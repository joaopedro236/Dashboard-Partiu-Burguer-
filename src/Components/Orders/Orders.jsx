import "./orders.css"
import { useState, useEffect } from "react"
import getOrder from "../../Requisitions/getOrderRequisition"
export default function Orders({section}){
    const [order, setOrder] = useState([])
    useEffect(() => {
            getOrder(setOrder)
            }, [])
    
    return(
        <>
        <section className={`OrdersSection ${section == "Order" ? "flex" : "none"} flex-col`}>
            <header className="flex flex-col gap-1">
                <h1>Seu cardapio</h1>
                <p>Veja seu cardápio e escolha o que os cliente irão ver</p>
            </header>
            <div className="orders flex flex-wrap">
                {order.map((orderMap, index) =>(
                    <div className="order" key={index}>
                        <img src={orderMap?.Imagem_url}alt="photo order" />
                        <h1>{orderMap?.Name}</h1>
                        <p>{orderMap?.Description}</p>
                        <p>{orderMap?.Price}</p>
                        <button>Ativo</button>
                    </div>
                ))}
            </div>
        </section>
        </>
    )
}