//@ts-ignore
import {defineMongooseModel} from "#nuxt/mongoose";


export const operativeCostSchema = defineMongooseModel({
    name: 'OperativeCost',
    schema: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }
})
