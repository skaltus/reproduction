import { JsonType } from '@mikro-orm/core';

export class GeoJSONPolygon {
  type = 'Polygon';
  coordinates: number[][][];
  
  constructor(coordinates: number[][][]) {
    this.coordinates = coordinates;
  }
}

export class GeoJSONPolygonType extends JsonType {
  convertToJSValueSQL(key: string) {
    return `ST_AsGeoJSON(${key},15)`;
  }

  convertToDatabaseValueSQL(key: string) {
    return `ST_GeomFromGeoJSON(${key})`;
  }

  getColumnType(): string {
    return 'GEOGRAPHY(POLYGON,4326)';
  }
}
