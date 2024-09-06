//--------------------------------------------------------
//----------------Create Pament Intent--------------------
//--------------------------------------------------------

import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {

    console.log('Stripe Key ================>', stripe)
    const body = await request.json()
    const { name, email, amount } = body;
    if (!name || !email || !amount) {
        return new Response(JSON.stringify({
            error: 'Please enter a valid email address',
            status: 400
        }))
    }

    let customer;
    const existCustomer = await stripe.customers.list({ email })

    if (existCustomer.data.length > 0) {
        customer = existCustomer.data[0]
    } else {
        const newCustomer = await stripe.customers.create({
            name,
            email,
        })

        customer = newCustomer
    }


    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2024-06-20' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) ** 100,
        currency: 'usd',
        customer: customer.id,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter
        // is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never'
        },
    });

    return new Response(JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
    }));
}