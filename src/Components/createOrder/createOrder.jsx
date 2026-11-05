import "./createOrder.css"
export default function CreateOrder(){
    return(
        <>
        <section className="createOrder flex flex-col gap-1 w-100 p-4">
            <header className="flex w-100 flex-col pt-1">
                <h1>Criação de Pedidos</h1>
                <p>Aqui é aonde cria os pedidos, preenche os inputs e envia.</p>
            </header>
            <form>
                <label htmlFor="name">Nome do pedido</label>
            <input type="text" name="name" id="name" placeholder="Nome do pedido"/>
            <label htmlFor="price">Preço do pedido</label>
            <input type="number" name="price" id="price" placeholder="Preço do pedido"/>
            <label htmlFor="file">Imagem do pedido</label>
            <input type="file" name="image" id="image" placeholder="imagem do pedido"/>
            <label htmlFor="description">Descrição do pedido</label>
            <textarea name="description" id="description" placeholder="Sua descrição"></textarea>
            <button type="submit">Enviar</button>
            </form>
        </section>
        </>
    )
}