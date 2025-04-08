/**
 * SNEH I'M GOING TO COMMENT AS MUCH AS I CAN OF THIS CODE SO YOU UNDERSTAND THE LOGIC OF H3 ENDPOINTS
 * AND MONGOOSE IT'S NOT THAT HARD AND I WANT YOU TO LEARN.
 */
import { z } from 'zod'
import {OperativeCostDocument} from "~~/types";

//this is Zod's validator schema. the thing is, whenever we compile all the type safety goes away, this ensures proper validation during runtime.
const schema = z.object({
    name: z.string(),
    value: z.number()
})


//defineEventHandler is H3 method to create an endpoint.
export default defineEventHandler(async (event) => {
    //Always try to do try/catch so you can ensure proper error handling.
    try {
        //this is how you get the body from the HTTP request, this only works with POST requests since GET can't contain body
        const result = await readValidatedBody(event, body => schema.safeParse(body))
        if(!result.success){
            console.error(result.error.issues)
            return {
                statusCode: 400,
                body: result.error.issues
            }
        }

        const {name, value} : {name :string, value: number} = result.data

        /**
         * This creates a new document of the specified Schema
         *
         * operativeCostSchema is the model ref we are using, it's specified in the server/api/model -> OperativeCost.schema.ts
         */
        const newOperativeCost: OperativeCostDocument = await operativeCostSchema.create({
            name,
            value
        }) as unknown as OperativeCostDocument
        //If nothing fails, we return.
        return {
            statusCode: 200,
            body: newOperativeCost
        }


    } catch (e: any) {
        //Let's log the error in the server console
        console.error(e.message)
        //And here we return the error in the body so you can read it in the client console.
        return {
            statusCode: 500,
            body: e.message
        }

    }
})
