import {defineMongooseModel} from "#nuxt/mongoose";

export const pharmacyReceiptSchema = defineMongooseModel({
    name: 'PharmacyReceipt',
    schema: {
        date: {
            type: Date,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        Supplies: [
            {
                supply: {
                    type: 'ObjectId',
                    ref: 'Supply',
                    required: true,
                },
                count: {
                    type: Number,
                    required: true,
                }
            }
        ],
        //@ts-ignore
        quote: {
            type: 'ObjectId',
            ref: 'Quote',
            required: false,
        },
        receiptNumber: {
            type: String,
            required: true,
        }
    }
})
