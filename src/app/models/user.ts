export interface User {
    email: String
    password: String
    name: String
    birthdate: Date
    balance: Number
    transaccions: {
        game: String,
        description: String,
        date: Date,
        amount: Number
    }[]
    payments: {
        card: String,
        amount: Number,
        date: Date
    }[]
}
