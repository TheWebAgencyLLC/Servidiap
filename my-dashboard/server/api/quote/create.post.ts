import {QuoteZodSchema} from "~~/server/schemas";


export default defineEventHandler(async (event) => {
    try{
        const result = await readValidatedBody(event, body => QuoteZodSchema.safeParse(body))
        if(!result.success){
            return {
                statusCode: 400,
                body: result.error.issues
            }
        }
        const {patient, study, profit, author, date, finalPrice, totalCost} = result.data

        const targetStudy = await studySchema.findOne({_id: study})
        if(!study){
            return {
                statusCode: 400,
                body: "Study not found"
            }
        }
        const newQuote = await quoteSchema.create({
            patient,
            study,
            profit,
            author,
            date,
            finalPrice,
            totalCost,
        })

        return {
            statusCode: 200,
            body: newQuote
        }



    } catch (e: any) {
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
