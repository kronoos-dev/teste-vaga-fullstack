import { FastifyRequest, FastifyReply } from "fastify"
import { ProcessarCsvService } from "../service/ProcessarCsvService"

class ProcessarCsvController {

    async handle (request : FastifyRequest, reply: FastifyReply) {
        try {
            console.log("Inicio do processamento de arquivo.")
            const processarCsvService = new ProcessarCsvService();

            const processarCsv = await processarCsvService.execute(await request.file());

            return reply.send(processarCsv);
        } catch (error) {
            throw Error("Não foi possivel processar o arquivo")
        }
        
    }
    

}

export {ProcessarCsvController}