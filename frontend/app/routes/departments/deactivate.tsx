import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const redirectTo = formData.get("redirectTo") as string;

    
    try {
        
    } catch (error) {
        
    }
}