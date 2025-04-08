export default defineEventHandler(async (event) => {
    try {
        const _id = getRouterParam(event, '_id')
        return await studySchema.findById(_id)
            .populate('Supplies.supply')
            .populate('operativeCosts')
            .populate('medicalHonoraries')
    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
