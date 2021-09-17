import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationRequest } from 'src/pagination/pagination-request';
import { PaginationResult } from 'src/pagination/pagination-result';
import { parseIntRequest } from 'src/parsers/parse-int-request';
import { requestArray } from 'src/parsers/request-array';
import { QueryParamArray } from 'src/query-param-array';
import { TradeDto } from './trade-dto';
import { TradesService } from './trades.service';


@Controller('Trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  parseCollectionId(collectionId: QueryParamArray): number[] {
    return requestArray(collectionId)
    .map(v => parseIntRequest(v, () => { throw new BadRequestException({}, `Failed to parse integer value from ${v}`)}))
    .filter(v => v != null) as number[];
  }

  @ApiQuery({
    name: 'collectionId',
    required: false,
    isArray: true,
    schema: {
      items: {
        type: 'number',
        default: ''
      },
      type: 'array'
    }
  })
  @Get()
  get(@Query() pagination: PaginationRequest, @Query('collectionId') collectionId?: QueryParamArray): Promise<PaginationResult<TradeDto>> {
    return this.tradesService.get(this.parseCollectionId(collectionId), undefined, pagination);
  }

  @ApiQuery({
    name: 'collectionId',
    required: false,
    isArray: true,
    schema: {
      items: {
        type: 'number',
        default: ''
      },
      type: 'array'
    }
  })
  @Get(':seller')
  getBySeller(@Param('seller') seller: string, @Query() pagination: PaginationRequest, @Query('collectionId') collectionId?: QueryParamArray): Promise<PaginationResult<TradeDto>> {
    return this.tradesService.get(this.parseCollectionId(collectionId), seller, pagination);
  }
}
