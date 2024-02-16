import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';

const fastify = Fastify({
  logger: true,
});

// Verwenden Sie path.resolve, um den absoluten Pfad zu erhalten
fastify.register(fastifyStatic, {
  root: path.resolve(__dirname, '../../client/'),
  prefix: '/',
});


try {
  fastify.listen({ port: 3000 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
} 
