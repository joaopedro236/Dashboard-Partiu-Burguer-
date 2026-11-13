import "./orders.css"
import chargeStateOrder from "../../Requisitions/chargeStateOrderRequisition"
import { useState } from "react"
import OrderSort from "./OrderSort"

function getPrice(value) {
    const price = Number.parseFloat(String(value ?? "").replace(",", "."))
    return Number.isNaN(price) ? 0 : price
}

export default function Orders({ section, order, setOrder, getOrder }) {

    const [filterType, setFilterType] = useState("Todos")
    const [sortOrder, setSortOrder] = useState("name-asc")

    const types = [
        "Todos",
        ...new Set(order.map(item => item.Type).filter(Boolean))
    ]
    const filteredOrders = order
        .filter(item => filterType === "Todos" || item.Type === filterType)
        .sort((first, second) => {
            if (sortOrder.startsWith("name")) {
                const result = String(first.Name ?? "").localeCompare(
                    String(second.Name ?? ""),
                    "pt-BR",
                    { sensitivity: "base" }
                )
                return sortOrder === "name-asc" ? result : -result
            }

            const result = getPrice(first.Price) - getPrice(second.Price)
            return sortOrder === "price-asc" ? result : -result
        })

    return (
        <>
            <section className={`OrdersSection flex-col ${section == "Order" ? "flex" : "hidden"}`}>
                <header className="flex flex-col gap-1">
                    <h1>Seu cardapio</h1>
                    <p>Veja seu cardápio e escolha o que os cliente irão ver</p>
                </header>
                <div className="filters">
                    <select
                        aria-label="Filtrar por categoria"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        {types.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <OrderSort value={sortOrder} onChange={setSortOrder} />
                </div>
                <div className="orders">
                    {filteredOrders.map((orderMap, index) => (
                        <div className="order" key={orderMap?.Id ?? index}>
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
