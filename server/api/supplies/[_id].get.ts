import {SupplyDocument} from "~~/types";

export default defineEventHandler(async (event) => {
    try {
        const _id = getRouterParam(event, '_id')
        const document : SupplyDocument = await supplySchema.findOne({_id}) as unknown as SupplyDocument;
        if (!document) {
            return {
                statusCode: 404,
                body: 'Not found'
            }
        }
        return {
            statusCode: 200,
            body: document
        }

    } catch (e: any) {

    }
})
