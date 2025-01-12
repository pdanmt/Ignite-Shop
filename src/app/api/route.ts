import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
    
    try {
        const { items }: { items: { priceId: string, quantity: number }[] } = await request.json()

        if (!items || !Array.isArray(items)) {
            return new Response(JSON.stringify({ error: 'Formato dos dados inválido' }), { status: 400 })
        }

        const lineItems = items.map(({ priceId, quantity }) => ({
            price: priceId,
            quantity: quantity,
        }))
    
        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/',
            mode: 'payment',
            line_items: lineItems,
        })
    
        return new Response(JSON.stringify({ url: checkoutSession.url })) 
    } catch (error) {
        console.error(`Erro ao criar a checkout session no stripe. Erro: ${error}`)

        return new Response(JSON.stringify({ error: 'Erro interno do servidor. Tente novamente mais tarde' }), { status: 500 })
    }
}