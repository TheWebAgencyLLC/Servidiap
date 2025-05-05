//@ts-ignore
import {defineMongooseModel} from "#nuxt/mongoose";


export const quoteSchema = defineMongooseModel({
    name: 'Quote',
    schema: {
        patient: {
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            }
        },
        //@ts-ignore
        study: {
            type: 'ObjectId',
            ref: 'Study',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        profit: {
            type: Number,
            required: true,
        },
        totalCost: {
            type: Number,
            required: true,
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        //@ts-ignore
        doctor: {
            type: 'ObjectId',
            ref: 'Doctor',
            required: true,
        }

    }
})
