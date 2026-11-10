export default async function IPVerificationRequisition(setAuthorized){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/authorization`)
        const data = await response.json()
        if(data?.Error){
            console.error(data?.Error)
        }
        setAuthorized(true)
    }catch(error){
        console.error(error)
    }
}