export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const specialty = query.specialty;


        if (!specialty) {
            return doctorSchema.find({});
        }

        return doctorSchema.find({
            specialties: { $in: [specialty] }
        });
    } catch (e: any) {
        return {
            statusCode: 500,
            body: e.message
        };
    }
});
