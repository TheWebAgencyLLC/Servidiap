import {OperativeCostDocument} from "~~/types";

export default defineEventHandler(async (event) => {
    try {
        const document: OperativeCostDocument[] = await operativeCostSchema.find();
        return {
            statusCode: 200,
            body: document
        }

    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
