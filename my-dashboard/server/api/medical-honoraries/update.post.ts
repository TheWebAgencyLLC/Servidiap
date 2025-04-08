import {z} from "zod";


const updateSchema = z.object({
    name: z.string().optional(),
    value: z.number().optional(),
    _id: z.string()
})

export default defineEventHandler(async (event) => {
    try {

        const result = await readValidatedBody(event, body => updateSchema.safeParse(body))
        if (!result.success) {
            return {
                statusCode: 400,
                body: result.error.issues
            }
        }
        const {name, value, _id}: { name?: string | undefined, value?: number | undefined, _id: string } = result.data

        // Only include fields that are provided in the update
        const updateFields: {
            name?: string,
            value?: number
        } = {
            name: undefined,
            value: undefined
        }
        if (name !== undefined) updateFields.name = name
        if (value !== undefined) updateFields.value = value

        const updatedDocument = await medicalHonorarySchema.findByIdAndUpdate(_id, updateFields, {new: true})

        // Check if document was found
        if (!updatedDocument) {
            return {
                statusCode: 404,
                body: {
                    message: `Operative cost with id ${_id} not found`
                }
            }
        }

        // Return the updated document
        return {
            statusCode: 200,
            body: updatedDocument
        }


    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
