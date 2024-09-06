//------------------------------------------------------------------------------------
//---------------To Allow User To Pay Based on Provided Payment Intent----------------
//------------------------------------------------------------------------------------

import { Stripe } from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: Request) {
    const body = await request.json()
    const { payment_method_id, payment_intent_id, customer_id } = body;
    try {
        if (!payment_method_id || !payment_intent_id || !customer_id) {
            return new Response(JSON.stringify({
                error: 'Missing required payment information',
                status: 400
            }))
        }

        const paymentMethod = await stripe.paymentMethods.attach(payment_method_id, {
            customer: customer_id
        })

        const result = await stripe.paymentIntents.confirm(payment_intent_id, {
            payment_method: paymentMethod.id
        })

        return new Response(JSON.stringify({
            success: true,
            message: 'Payment confirmed successfully',
            result: result
        }))
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: error,
            success: false,
            status: 500
        }))
    }
}