export interface IInformationPeriodRepository {
  findById(id: string): Promise<any>;
  createPeriod(data: any): Promise<any>;
}
