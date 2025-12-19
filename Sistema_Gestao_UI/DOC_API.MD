{
  "openapi": "3.0.1",
  "info": {
    "title": "Sistema_Gestao_Residencial",
    "version": "1.0"
  },
  "paths": {
    "/api/Categoria": {
      "get": {
        "tags": [
          "Categoria"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListCategoriaDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListCategoriaDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListCategoriaDto"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Categoria"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCategoriaDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCategoriaDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateCategoriaDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Categoria/{id}": {
      "put": {
        "tags": [
          "Categoria"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCategoriaDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCategoriaDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCategoriaDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "delete": {
        "tags": [
          "Categoria"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Transacao": {
      "get": {
        "tags": [
          "Transacao"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListTransacaoDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListTransacaoDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListTransacaoDto"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Transacao"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTransacaoDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTransacaoDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTransacaoDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Transacao/{id}": {
      "put": {
        "tags": [
          "Transacao"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTransacaoDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTransacaoDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTransacaoDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "delete": {
        "tags": [
          "Transacao"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Usuario": {
      "get": {
        "tags": [
          "Usuario"
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListUsuarioDto"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListUsuarioDto"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ListUsuarioDto"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Usuario"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUsuarioDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUsuarioDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUsuarioDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Usuario/{id}": {
      "put": {
        "tags": [
          "Usuario"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUsuarioDto"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUsuarioDto"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUsuarioDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "delete": {
        "tags": [
          "Usuario"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "CreateCategoriaDto": {
        "required": [
          "descricao",
          "finalidade",
          "usuarioId"
        ],
        "type": "object",
        "properties": {
          "descricao": {
            "maxLength": 255,
            "minLength": 3,
            "type": "string"
          },
          "finalidade": {
            "$ref": "#/components/schemas/FinalidadeEnum"
          },
          "usuarioId": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "CreateTransacaoDto": {
        "required": [
          "categoriaId",
          "descricao",
          "pessoaId",
          "valor"
        ],
        "type": "object",
        "properties": {
          "descricao": {
            "maxLength": 255,
            "minLength": 3,
            "type": "string"
          },
          "valor": {
            "minimum": 0.01,
            "type": "number",
            "format": "double"
          },
          "categoriaId": {
            "type": "integer",
            "format": "int32"
          },
          "pessoaId": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "CreateUsuarioDto": {
        "required": [
          "idade",
          "nome"
        ],
        "type": "object",
        "properties": {
          "nome": {
            "maxLength": 255,
            "minLength": 3,
            "type": "string"
          },
          "idade": {
            "maximum": 150,
            "minimum": 1,
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "FinalidadeEnum": {
        "enum": [
          1,
          2,
          3
        ],
        "type": "integer",
        "format": "int32"
      },
      "ListCategoriaDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "descricao": {
            "type": "string",
            "nullable": true
          },
          "finalidade": {
            "$ref": "#/components/schemas/FinalidadeEnum"
          },
          "finalidadeDescricao": {
            "type": "string",
            "nullable": true,
            "readOnly": true
          },
          "usuarioId": {
            "type": "integer",
            "format": "int32"
          },
          "nomeUsuario": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ListTransacaoDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "descricao": {
            "type": "string",
            "nullable": true
          },
          "valor": {
            "type": "number",
            "format": "double"
          },
          "categoriaId": {
            "type": "integer",
            "format": "int32"
          },
          "nomeCategoria": {
            "type": "string",
            "nullable": true
          },
          "pessoaId": {
            "type": "integer",
            "format": "int32"
          },
          "nomePessoa": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ListUsuarioDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "nome": {
            "type": "string",
            "nullable": true
          },
          "idade": {
            "type": "integer",
            "format": "int32"
          },
          "isMenorDeIdade": {
            "type": "boolean",
            "readOnly": true
          },
          "totalReceitas": {
            "type": "number",
            "format": "double"
          },
          "totalDespesas": {
            "type": "number",
            "format": "double"
          },
          "saldo": {
            "type": "number",
            "format": "double",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "UpdateCategoriaDto": {
        "required": [
          "descricao",
          "finalidade",
          "id",
          "usuarioId"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "descricao": {
            "maxLength": 255,
            "minLength": 3,
            "type": "string"
          },
          "finalidade": {
            "$ref": "#/components/schemas/FinalidadeEnum"
          },
          "usuarioId": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "UpdateTransacaoDto": {
        "required": [
          "categoriaId",
          "descricao",
          "id",
          "pessoaId",
          "valor"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "descricao": {
            "maxLength": 255,
            "minLength": 3,
            "type": "string"
          },
          "valor": {
            "minimum": 0.01,
            "type": "number",
            "format": "double"
          },
          "categoriaId": {
            "type": "integer",
            "format": "int32"
          },
          "pessoaId": {
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      },
      "UpdateUsuarioDto": {
        "required": [
          "id",
          "idade",
          "nome"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "nome": {
            "maxLength": 255,
            "minLength": 3,
            "type": "string"
          },
          "idade": {
            "maximum": 150,
            "minimum": 1,
            "type": "integer",
            "format": "int32"
          }
        },
        "additionalProperties": false
      }
    }
  }
}