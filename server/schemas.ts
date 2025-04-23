import {z} from 'zod'

export const SupplyZodSchema = z.object({
    description: z.string(),
    stock: z.number(),
    costPerUnit: z.number(),
    totalCost: z.number(),
    code: z.string(),
});


// OperativeCost schema
export const OperativeCostZodSchema = z.object({
    name: z.string(),
    value: z.number(),
});

// MedicalHonoraries schema
export const MedicalHonorariesZodSchema = z.object({
    name: z.string(),
    value: z.number(),
});

// Document extension schema (for MongoDB documents)
export const DocumentExtensionZodSchema = z.object({
    _id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});


// Document versions of each schema
export const SupplyDocumentZodSchema = SupplyZodSchema.merge(DocumentExtensionZodSchema);
export const OperativeCostDocumentZodSchema = OperativeCostZodSchema.merge(DocumentExtensionZodSchema);
export const MedicalHonorariesDocumentZodSchema = MedicalHonorariesZodSchema.merge(DocumentExtensionZodSchema);


// Study schema
export const StudyZodSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    Supplies: z.array(
        z.object({
            supply: z.string(), // ObjectId as string
            count: z.number().optional(),
        })
    ),
    operativeCosts: z.array(
        z.string() // ObjectId as string
    ),
    medicalHonoraries: z.array(
        z.string() // ObjectId as string
    ),
    cost: z.number().min(0),
    specialty: z.string().min(1, {message: "Specialty is required"}),
    PVP: z.number().optional(), // Kept from original Zod schema but marked as optional
});

// Study document schema
export const StudyDocumentZodSchema = StudyZodSchema.merge(DocumentExtensionZodSchema);


// Quote schema
export const QuoteZodSchema = z.object({
    patient: z.object({
        name: z.string().min(1, {message: "Patient name is required"}),
        id: z.string().min(1, {message: "Patient ID is required"}),
    }),
    study: z.string().min(1, {message: "Study reference is required"}), // ObjectId as string
    date: z.string(),
    profit: z.number(),
    author: z.string().min(1, {message: "Author is required"}),
    totalCost: z.number(),
    finalPrice: z.number(),
});

// Quote document schema
export const QuoteDocumentZodSchema = QuoteZodSchema.merge(DocumentExtensionZodSchema);

//pharmacy receipt schema

export const PharmacyReceiptZodSchema = z.object({
    date: z.date(),
    total: z.number(),
    quote: z.string().optional(),
    Supplies: z.array(
        z.object({
            supply: z.string(), // ObjectId as string
            count: z.number(),
            priceAtPurchase: z.number().optional() // if you want to record the price at purchase time
        })
    ),
    receiptNumber: z.string().min(1, {message: "Receipt number is required"}),
});

export const PharmacyReceiptDocumentZodSchema = PharmacyReceiptZodSchema.merge(DocumentExtensionZodSchema);
