export default defineEventHandler(async (event) => {
    try {
        return doctorSchema.find({})
    } catch (e: any) {
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
