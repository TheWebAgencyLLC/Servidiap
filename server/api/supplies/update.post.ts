import {z} from "zod";
import {SupplyDocument} from "~~/types";


const schema = z.object({
    description: z.string().optional(),
    stock: z.number().optional(),
    costPerUnit: z.number().optional(),
    totalCost: z.number().optional(),
    code: z.number().optional(),
    _id: z.string()
})


export default defineEventHandler(async (event) => {
    try{
        const result = await readValidatedBody(event, body => schema.safeParse(body))
        if (!result.success) {
            return {
                statusCode: 400,
                body: result.error.issues
            }
        }
        const {description, stock, costPerUnit, totalCost, code, _id}: {
            description?: string | undefined,
            stock?: number | undefined,
            costPerUnit?: number | undefined,
            totalCost?: number | undefined,
            code?: number | undefined,
            _id: string
        } = result.data

        const updatedDocument  = await supplySchema.findByIdAndUpdate(_id, {
            description,
            stock,
            costPerUnit,
            totalCost,
            code
        }, {new: true}) as unknown as SupplyDocument

        return {
            statusCode: 200,
            body: updatedDocument
        }

    }catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
