import { Type } from '@mikro-orm/core';

export interface GeoJSONPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}

export class GeoJSONPolygonType extends Type<GeoJSONPolygon | undefined, string | undefined> {
  convertToDatabaseValue(polygon: GeoJSONPolygon | undefined): string | undefined {
    if (!polygon) {
      return undefined;
    }
    return JSON.stringify(polygon);
  }

  convertToJSValue(value: string | undefined): GeoJSONPolygon | undefined {
    if (!value) {
      return undefined;
    }

    const polygon = JSON.parse(value) as GeoJSONPolygon;
    return polygon;
  }

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
