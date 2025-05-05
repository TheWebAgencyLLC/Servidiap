export default defineEventHandler(async (event) => {
    try {
        //TODO: make a zod schema for this
        const {name, specialties} = await readBody(event)
        const newDoctor = await doctorSchema.create(
            {
                name,
                specialties
            }
        )
        if (!newDoctor) throw new Error("Doctor not created")
        return newDoctor


    } catch (e: any) {
        return {
            statusCode: 500,
            body: e.message
        }
    }
})
