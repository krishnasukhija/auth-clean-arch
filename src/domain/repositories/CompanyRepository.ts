import { Company } from "../entities/Company";

export interface CompanyRepository {
    findById(id: string): Promise<Company | null>;

}