import {
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { GeoJSONPolygon, GeoJSONPolygonType } from './polygon-type';

@Entity()
export class DeliveryZone {
  @PrimaryKey()
  id!: number;

	@Property({ type: GeoJSONPolygonType })
	polygon!: GeoJSONPolygon;
}
