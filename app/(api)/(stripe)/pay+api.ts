import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, amount } = body;

        if (!name || !email || !amount) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
            });
        }

        // Check if customer exists
        const doesCustomerExist = await stripe.customers.list({
            email,
        });

        let customer;
        if (doesCustomerExist.data.length > 0) {
            customer = doesCustomerExist.data[0];
        } else {
            customer = await stripe.customers.create({
                name,
                email,
            });
        }

        // Create an ephemeral key for the customer
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2024-06-20" }
        );

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount) * 100, // Convert amount to cents
            currency: "usd",
            customer: customer.id,
            automatic_payment_methods: { enabled: true },
        });

        return new Response(
            JSON.stringify({
                paymentIntent,
                ephemeralKey,
                customer: customer.id,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("Error creating payment:", error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}