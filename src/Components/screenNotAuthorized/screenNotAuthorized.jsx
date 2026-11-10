import './screenNotAuthorized.css'
export default function ScreenNotAuthorized( authorized){
    return(
        <>
        <section className={`screenNotAuthorized ${authorized ? 'flex' : 'hidden'} flex-col items-center justify-center text-center fixed top-[0] left-[0] w-full h-screen z-[999]`}>
            <h1>O Seu IP não esta autorizado para o dashboard.</h1>
            <p>Por favor se retire.</p>
        </section>
        </>
    )
}