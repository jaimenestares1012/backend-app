import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatalogueResponseDto } from '../../application/dtos/output/catalogue.response';
import { ICatalogueService } from '../../domain/interfaces/catalogue-service.interface';
import { GetCatalogueDto } from '../../application/dtos/input/list-catalogue.dto';
import { CATALOGUE_SERVICE } from '../../providers.token';

@ApiTags('Catalogue')
@Controller({ path: 'catalogue', version: '1' })
export class CatalogueController {
  constructor(
    @Inject(CATALOGUE_SERVICE)
    private readonly catalogueService: ICatalogueService,
  ) {}

  @Get('')
  @ApiOperation({
    summary: 'API para listas los catalogues',
  })
  @ApiOkResponse({
    description: 'Response de listar catalogues',
    type: CatalogueResponseDto,
  })
  async getCatalogue(
    @Query() query: GetCatalogueDto,
  ): Promise<CatalogueResponseDto> {
    return this.catalogueService.getCatalogue(query);
  }
}
