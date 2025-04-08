import {z} from "zod";
import {StudyZodSchema} from "~~/server/schemas";



export default defineEventHandler(async (event) => {
    try {
        const result = await readValidatedBody(event, body => StudyZodSchema.safeParse(body))
        if (!result.success) {
            return {
                status: 400,
                body: result.error.issues
            }
        }

        const {name, Supplies, operativeCosts, medicalHonoraries, cost, PVP, specialty} = result.data

        const newStudy = await studySchema.create({
            name,
            Supplies,
            operativeCosts,
            medicalHonoraries,
            cost,
            PVP,
            specialty
        })

        return {
            statusCode: 200,
            body: newStudy
        }


    } catch (e: any) {
        console.error('Error creating study:', e);
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
