
import { useState } from "react"
import './authorization.css'
import sendVerification from "../../Requisitions/sendVerificationEmail.jsx"
import verifyCode from "../../Requisitions/verifyCodeRequisition.jsx"

export default function Authorization() {

    const [code, setCode] = useState("")
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSend() {
        try {
            setLoading(true)
            setMessage("")

            await sendVerification()

            setSent(true)
            setMessage("Código enviado para o email do proprietário!")

        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleVerify() {
        try {
            setLoading(true)
            setMessage("")

            await verifyCode(code)

            setMessage("Verificação concluída!")

            

        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="authorization w-full h-screen z-[999] gap-3 flex flex-col items-center justify-center text-center fixed top-[0] left-[0]">
            <h2>Verificação de segurança</h2>

            {!sent ? (
                <button
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar código"}
                </button>
            ) : (
                <>
                    <p>Digite o código enviado ao email do proprietário.</p>

                    <input
                        type="text"
                        value={code}
                        onChange={(e) =>
                            setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="000000"
                        maxLength={6}
                    />

                    <button
                        onClick={handleVerify}
                        disabled={loading || code.length !== 6}
                    >
                        {loading ? "Verificando..." : "Verificar código"}
                    </button>
                </>
            )}

            <p>{message}</p>
        </section>
    )
}
