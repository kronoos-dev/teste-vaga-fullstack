import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes"
import { setupSwagger } from "./config/SwaggerConfig";

const app = Fastify({ logger: true})

app.register(require('@fastify/multipart'))

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})


const start = async () => {
    await app.register(cors);
    await app.register(routes);
    setupSwagger(app);

    try {
        await app.listen({port: 3333})
    } catch (error) {
        process.exit();
    }
}

start();