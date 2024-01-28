import {
  StartedTestContainer,
  GenericContainer
} from "testcontainers";

export default async () => {
  const env = {
    POSTGRES_USER: 'user',
    POSTGRES_PASSWORD: 'password',
    POSTGRES_DB: 'db',
  };
  const exposedPort = 5432;

  const container: StartedTestContainer = await new GenericContainer("postgis/postgis:14-3.3-alpine")
    .withEnvironment(env)
    .withExposedPorts(exposedPort)
    .start();
  
  return {
    container,
    connectionString: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:${container.getMappedPort(exposedPort)}/${env.POSTGRES_DB}`,
  }
}