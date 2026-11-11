import "./createOrder.css"
import { useState } from "react"
import createOrderRequisition from "../../Requisitions/createOrder"
export default function CreateOrder({section}){
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const resultInputs = new FormData(e.target)
        
        await createOrderRequisition(setLoading,resultInputs)
        form.reset()
    }
    return(
        <>
        <section className={`CreateOrder flex ${section == "createOrder" ? "" : "hidden!"} flex-col gap-1 w-full `}>
            <header className="flex w-full flex-col pt-1">
                <h1>Criação de Pedidos</h1>
                <p>Aqui é aonde cria os pedidos, preenche os inputs e envia.</p>
            </header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome do pedido</label>
            <input type="text" name="name" id="name" placeholder="Nome do pedido" required/>
            <label htmlFor="price">Preço do pedido</label>
            <input type="number" name="price" id="price" step="any"
                min="0" placeholder="Preço do pedido" required/>
            <label htmlFor="file">Imagem do pedido</label>
            <input type="file" name="file" id="file" accept="image/*" placeholder="imagem do pedido" required/>
            <label htmlFor="type">Tipo</label>
            <select name="type" id="type" required>
                <option value="Artersanal">Artersanal</option>
                <option value="Não Artersanal">Não Artersanal</option>
                <option value="Porcão">Porção</option>
                <option value="Bebida">Bebida</option>
                <option value="Combo">Combo</option>
            </select>
            <label htmlFor="description">Descrição do pedido</label>
            <textarea name="description" id="description" placeholder="Sua descrição" required></textarea>
            <button type="submit">{loading ? "Carregando" : "Enviar"}</button>
            </form>
        </section>
        </>
    )
}