import { MikroORM } from '@mikro-orm/postgresql';
import { StartedTestContainer } from 'testcontainers';
import { DeliveryZone } from './delivery-zone.entity';
import { polygonOne, polygonTwo } from './polygons';
import runPostgresPostgisContainer from './run.postgres-postgis.container';

let orm: MikroORM;
let dbContainer: StartedTestContainer;

beforeAll(async () => {
  const { container, connectionString } = await runPostgresPostgisContainer();
  dbContainer = container;
  orm = await MikroORM.init({
    clientUrl: connectionString,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: ['query', 'query-params'],
    allowGlobalContext: true,
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
  await dbContainer.stop();
});

beforeEach(async () => {
  await orm.schema.clearDatabase();
});

test('update entity', async () => {
  const deliveryZone = orm.em.create(DeliveryZone, { polygon: polygonOne });
  await orm.em.flush();

  deliveryZone.polygon = polygonTwo;
  await orm.em.flush();

  expect(deliveryZone.polygon).toStrictEqual(polygonTwo);
});

test('native update entity', async () => {
  const deliveryZone = orm.em.create(DeliveryZone, { polygon: polygonOne });
  await orm.em.flush();

  await orm.em.nativeUpdate(DeliveryZone, { id: deliveryZone.id }, { polygon: polygonTwo });
  await orm.em.refresh(deliveryZone);

  expect(deliveryZone.polygon).toStrictEqual(polygonTwo);
});
