export default defineEventHandler(async(event) => {
    try {
        const _id = getRouterParam(event, '_id')
        return await quoteSchema.findById(_id).populate({
            path: 'study',
            populate: [
                { path: 'Supplies.supply', model: 'Supply' },
                { path: 'operativeCosts', model: 'OperativeCost' },
                { path: 'medicalHonoraries', model: 'MedicalHonorary' }
            ]
        }).populate('doctor')
    } catch (e:any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
