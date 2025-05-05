//@ts-ignore
import {defineMongooseModel} from "#nuxt/mongoose";


export const studySchema = defineMongooseModel({
    name: 'Study',
    schema: {
        name: {
            type: String,
            required: true,
        },
        Supplies: [{
            supply: {
                type: 'ObjectId',
                ref: 'Supply'
            },
            count: Number,
        }],
        operativeCosts: [{
            type: 'ObjectId',
            ref: 'OperativeCost',
        }],
        medicalHonoraries: [{
            type: 'ObjectId',
            ref: 'MedicalHonorary'
        }
        ],
        cost: {
            type: Number,
            required: true,
        },
        specialty: {
            type: String,
            required: true,
        },
    }
})
