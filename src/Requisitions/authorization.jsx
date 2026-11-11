export default async function authorizationRequisition(authorization) {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/authorization`, {
            credentials: "include"
        })
        
        const data = await response.json()
        if (!data?.Status){
            authorization(false)
        }
    }catch(error){
        console.error(error)
    }
}