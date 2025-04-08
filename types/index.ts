export interface Supply {
  description: string,
  stock: number,
  costPerUnit: number,
  totalCost: number,
  code: string,
}

export interface SupplyDocument extends Supply {
  _id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface SupplyWithCount {
  supply: Supply,
  count: number,
}

export interface Study {
  name: string,
  Supplies: SupplyWithCount[],
  operativeCosts: OperativeCost[],
  medicalHonoraries: MedicalHonoraries[],
  cost: number,
  PVP: number,
  specialty: string,
}

export interface StudyDocument extends Study {
  _id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface OperativeCost {
  name: string,
  value: number,
}

export interface OperativeCostDocument extends OperativeCost {
  _id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface MedicalHonoraries {
  name: string,
  value: number,
}

export interface MedicalHonoraryDocument extends MedicalHonoraries {
  _id?: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface Patient {
  name: string,
  id: string,
}

export interface Quote {
  patient: Patient,
  study: string,
  date: Date,
  profit: number,
  author: string,
  finalPrice: number,
  totalCost: number,
}
