import {defineMongooseModel} from "#nuxt/mongoose";

export const medicalHonorarySchema = defineMongooseModel({
    name: 'MedicalHonorary',
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

