export default defineEventHandler(async (event) => {
    try {
        return quoteSchema.find({}).populate({
            path: 'study',
            populate: [
                {path: 'Supplies.supply', model: 'Supply'},
            ]
        })
    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
