import {MedicalHonoraryDocument} from "~~/types";

export default defineEventHandler(async (event) => {
    try {
        const document: MedicalHonoraryDocument[] = await medicalHonorarySchema.find();
        return document

    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
