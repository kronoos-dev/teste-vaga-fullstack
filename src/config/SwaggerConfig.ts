import { FastifyInstance } from "fastify";

export function setupSwagger(app: FastifyInstance) {
    app.register(require('@fastify/swagger'), {
      openapi: {
        "openapi": "3.0.0",
        "info": {
          "title": "Upload arquivo CSV",
          "description": "Upload arquivo CSV para processamento",
          "version": "1.0.0"
        },
        "paths": {
          "/processar-csv": {
            "post": {
              "summary": "Upload do arquivo CSV para processamento",
              "requestBody": {
                "required": true,
                "content": {
                  "multipart/form-data": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "csv_file": {
                          "type": "string",
                          "format": "binary",
                          "description": "Upload do arquivo CSV"
                        }
                      },
                      "required": [
                        "csv_file"
                      ]
                    },
                    "encoding": {
                      "csv_file": {
                        "contentType": "text/csv",
                      }
                    }
                  }
                }
              },
              "responses": {
                "200": {
                  "description": "Successfully uploaded CSV file",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                          "message": {
                            "type": "string",
                            "description": "A success message"
                          },
                          "data": {
                            "type": "object",
                            "description": "Uploaded file metadata",
                            "properties": {
                              "filename": {
                                "type": "string",
                                "description": "The name of the uploaded file"
                              },
                              "mimetype": {
                                "type": "string",
                                "description": "The MIME type of the uploaded file"
                              },
                              "size": {
                                "type": "integer",
                                "description": "The size of the uploaded file in bytes"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  
    app.register(require('@fastify/swagger-ui'), {
      routePrefix: '/documentacao',
      exposeRoute: true
    });

    
  }
  