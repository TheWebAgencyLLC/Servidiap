import {defineMongooseModel} from "#nuxt/mongoose";

export const doctorSchema = defineMongooseModel({
    name: 'Doctor',
    schema: {
        name: {
            type: String,
            required: true,
        },
        specialties: [{
            type: String,
            required: true,
        }]
    }
})
