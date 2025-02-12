import { Inject, Injectable } from '@nestjs/common';
import { ICatalogueService } from '../../domain/interfaces/catalogue-service.interface';
import {
  TB_PERIOD_REPOSITORY,
  TC_CITY_REPOSITORY,
  TC_COMUNA_REPOSITORY,
  TC_UNITS_REPOSITORY,
} from '../../providers.token';
import { CatalogueResponseDto } from '../dtos/output/catalogue.response';
import { RESPONSE_CODE } from '@src/modules/shared/interface/enum';
import { GetCatalogueDto } from '../dtos/input/list-catalogue.dto';
import { ICityRepository } from '../../domain/repository/city.repository';
import { IComunaRepository } from '../../domain/repository/comuna.repository';
import { IUnitsRepository } from '../../domain/repository/units.repository';
import { IPeriodRepository } from '../../domain/repository/period.repository';

@Injectable()
export class CatalogueService implements ICatalogueService {
  constructor() {}
  @Inject(TC_CITY_REPOSITORY)
  private cityRepository: ICityRepository;
  @Inject(TC_COMUNA_REPOSITORY)
  private comunaRepository: IComunaRepository;
  @Inject(TC_UNITS_REPOSITORY)
  private unitsRepository: IUnitsRepository;

  @Inject(TB_PERIOD_REPOSITORY)
  private periodRepository: IPeriodRepository;

  async getCatalogue(body: GetCatalogueDto): Promise<CatalogueResponseDto> {
    const catalogues = {};
    body.cataloguesCode = Array.isArray(body.cataloguesCode)
      ? body.cataloguesCode
      : [body.cataloguesCode];

    const repositoryMap = {
      cityList: this.cityRepository.findData.bind(this.cityRepository),
      comunaList: this.comunaRepository.findData.bind(this.comunaRepository),
      unitsMeasurementList: this.unitsRepository.findData.bind(
        this.unitsRepository,
      ),
      periodList: this.periodRepository.findData.bind(this.periodRepository),
    };
    for (const element of body.cataloguesCode) {
      if (repositoryMap[element]) {
        catalogues[element] = await repositoryMap[element]();
      }
    }
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Lista de catálogos extraídas correctamente',
      data: catalogues,
    };
  }
}
