import {StudyDocument} from "~~/types";


export default defineEventHandler(async(event) => {
    try{
        return await studySchema.find() as StudyDocument[]

    }catch(e:any){
        console.error(e.message)
        return {
            statusCode: 500,
            body: e.message
        }
    }


})
