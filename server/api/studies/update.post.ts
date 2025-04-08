import { z } from "zod";
import {StudyDocumentZodSchema} from "~~/server/schemas";
import {Study} from "~~/types";
import {studySchema} from "~~/server/models/study.schema";


export default defineEventHandler(async (event) => {
    try {
        // We need a different schema for updates that requires the _id field
        // If you don't have one already, you could extend your existing schema:
        const UpdateStudyZodSchema = StudyDocumentZodSchema.extend({
            _id: z.string().nonempty("Study ID is required for updates")
        });

        // Validate request body with the schema that requires _id
        const result = await readValidatedBody(event, body =>
            UpdateStudyZodSchema.safeParse(body)
        );

        // If validation fails, return a proper H3 error
        if (!result.success) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Validation failed',
                data: result.error.format()
            });
        }

        // Destructure the validated data including _id
        const { _id, name, Supplies, operativeCosts, medicalHonoraries, cost, PVP } = result.data;

        // Find the study and update it
        const updatedStudy = await studySchema.findByIdAndUpdate(
            _id,
            {
                name,
                Supplies,
                operativeCosts,
                medicalHonoraries,
                cost,
                PVP,
            },
            // Return the updated document instead of the original
            { new: true }
        );

        // Check if the study was found
        if (!updatedStudy) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Study not found',
            });
        }

        // Return the updated study
        return {
            statusCode: 200,
            body: updatedStudy
        };
    } catch (error: any) {
        // Handle database or other errors
        console.error('Error updating study:', error);

        // If it's already an H3 error (like our validation error), rethrow it
        if (error.statusCode) {
            throw error;
        }

        // MongoDB specific error handling for invalid ObjectId
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid study ID format',
            });
        }

        // Otherwise, create a new error with appropriate details
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update study',
            data: {
                message: error.message
            }
        });
    }
});
