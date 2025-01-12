import Stripe from 'stripe'

export const stripe = new Stripe(`sk_test_51QcaSfIgFvuRwgFGNx5EqQRczdG4MYFIgYWtcDsQar4z16WKvvkWndwIXjJhO9rHkz7eaCw7jKjI24kBIgc8OH2h00bEh7JqYW`, {
    apiVersion: '2024-12-18.acacia',
    appInfo: {
        name: 'Ignite Shop'
    }
})