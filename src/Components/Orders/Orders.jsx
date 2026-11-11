import "./orders.css"
import chargeStateOrder from "../../Requisitions/chargeStateOrderRequisition"
import { useState, useEffect } from "react"
import getOrder from "../../Requisitions/getOrderRequisition"
export default function Orders({ section, order, setOrder, getOrder }) {

    const [filterType, setFilterType] = useState("Todos")

    const types = [
        "Todos",
        ...new Set(order.map(item => item.Type).filter(Boolean))
    ]
    const filteredOrders = order.filter(item =>
        filterType === "Todos" || item.Type === filterType
    )
    return (
        <>
            <section className={`OrdersSection  flex-col ${section == "Order" ? "flex" : "hidden"} flex-col`}>
                <header className="flex flex-col gap-1">
                    <h1>Seu cardapio</h1>
                    <p>Veja seu cardápio e escolha o que os cliente irão ver</p>
                </header>
                <div className="orders ">
                    <div className="filters">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            {types.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    {filteredOrders.map((orderMap, index) => (
                        <div className="order" key={index}  >
                            <img src={orderMap?.Imagem_url} alt="photo order" />
                            <h1>{orderMap?.Name}</h1>
                            <p>{orderMap?.Description}</p>
                            <p>R${orderMap?.Price}</p>

                            <button onClick={async () => {
                                await chargeStateOrder(orderMap?.Id)
                                await getOrder(setOrder)
                            }} className={`${orderMap?.Active ? '' : 'Deactivate'}`}>{orderMap?.Active ? 'Ativo' : 'Desativo'}</button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}