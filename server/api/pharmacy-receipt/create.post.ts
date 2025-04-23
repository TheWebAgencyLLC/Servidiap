import {PharmacyReceiptZodSchema} from "~~/server/schemas";

export default defineEventHandler(async (event) => {
    try {
        const {_id} = await readBody(event)
        const quote = await quoteSchema.findById(_id).populate('study')

        // Check if this quote already has a pharmacy receipt
        const existingReceipt = await pharmacyReceiptSchema.findOne({quote: _id});

        // If a receipt already exists, return its ID
        if (existingReceipt) {
            return {
                statusCode: 200,
                body: existingReceipt._id,
            }
        }

        // Otherwise, proceed with creating a new receipt
        //@ts-ignore
        const study = await studySchema.findOne({name: quote?.study?.name}).populate('Supplies.supply')
        let total = 0

        if (study?.Supplies) {
            total = study.Supplies.reduce((sum, item) => {
                // @ts-ignore - Accessing totalCost on the populated supply
                const supplyCost = item.supply?.totalCost || 0
                const count = item.count || 0
                //@ts-ignore
                return sum + (supplyCost * count)
            }, 0)
        }

        // Find the last receipt to determine the next receipt number
        const lastReceipt = await pharmacyReceiptSchema.findOne().sort({receiptNumber: -1});

        // Calculate the next receipt number - properly increment by 1
        const nextReceiptNumber = lastReceipt && lastReceipt.receiptNumber
            //@ts-ignore
            ? (parseInt(lastReceipt.receiptNumber) + 1)
            : 1;

        const newReceipt = await pharmacyReceiptSchema.create({
            date: new Date(),
            total: total, // Set the calculated total
            Supplies: study?.Supplies,
            quote: quote?._id,
            receiptNumber: nextReceiptNumber // Add the properly incremented receipt number
        })

        return {
            statusCode: 200,
            body: newReceipt._id,
        }

    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
