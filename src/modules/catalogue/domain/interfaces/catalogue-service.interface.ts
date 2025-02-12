import { ProductResponseDto } from '@src/modules/product/application/dtos/output/product.response';
import { GetCatalogueDto } from '../../application/dtos/input/list-catalogue.dto';

export interface ICatalogueService {
  getCatalogue(query: GetCatalogueDto): Promise<ProductResponseDto>;
}
