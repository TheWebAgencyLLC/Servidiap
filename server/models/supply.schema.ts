//@ts-ignore
import {defineMongooseModel} from "#nuxt/mongoose";



export const supplySchema = defineMongooseModel({
    name: 'Supply',
    schema: {
        description: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        costPerUnit: {
            type: Number,
            required: true,
        },
        totalCost: {
            type: Number,
            required: true,
        },
        code: {
            type: Number,
            required: true,
        }
    }
})
