import {z} from "zod";
import {SupplyDocument} from "~~/types";

const schema = z.object({
    description: z.string(),
    stock: z.number(),
    costPerUnit: z.number(),
    totalCost: z.number(),
    code: z.string()
})

export default defineEventHandler(async (event) => {
    try {
        const result = await readValidatedBody(event, body => schema.safeParse(body))
        if (!result.success) {
            return {
                statusCode: 400,
                body: result.error.issues
            }
        }
        const {description, stock, costPerUnit, totalCost, code}: {
            description: string,
            stock: number,
            costPerUnit: number,
            totalCost: number,
            code: string
        } = result.data

        const newSupply: SupplyDocument = await supplySchema.create({
            description,
            stock,
            costPerUnit,
            totalCost,
            code
        }) as unknown as SupplyDocument
        return {
            statusCode: 200,
            body: newSupply
        }

    } catch (e: any) {

    }
})
