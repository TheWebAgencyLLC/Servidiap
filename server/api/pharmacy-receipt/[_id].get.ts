export default defineEventHandler(async (event) => {
    try {
        const _id = getRouterParam(event, '_id')
        console.log(_id)
        return await pharmacyReceiptSchema.findById(_id)
            .populate('Supplies.supply')
            .populate({
                path: 'quote',
                populate: [
                    { path: 'patient' },
                    {
                        path: 'study',
                        populate: {
                            path: 'Supplies.supply'
                        }
                    }
                ]
            })
    } catch (e: any) {
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
