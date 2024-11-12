import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ProcessarCsvController } from "./controllers/ProcessarCsvController";

export async function routes(fastify: FastifyInstance) {
    fastify.post("/processar-csv", {
        
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            return new ProcessarCsvController().handle(request, reply);
        }
    });
}
