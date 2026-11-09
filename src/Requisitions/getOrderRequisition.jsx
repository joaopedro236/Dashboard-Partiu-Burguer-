export default async function getOrder(setOrder){
    try{
        const response = await fetch (`${import.meta.env.VITE_API_URL}/getOrder`)
        const data = await response.json()
        if (data?.Error) {
            console.error(data?.Error)
        }
        setOrder(Array.isArray(data) ? data : [])
    }catch(error) {
        console.error(error)
    }
    
}