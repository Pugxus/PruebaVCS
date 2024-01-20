export interface Marca {
    codigo: string,
    nome: string
}

export interface Modelo {
    modelos: Marca[]
}

export interface Anio {
    codigo: string,
    nome: string
}

export interface Valor {
    TipoVeiculo: number,
    Valor: string,
    Marca: string,
    Modelo: string,
    AnoModelo: number,
    Combustivel: string,
    CodigoFipe: string,
    MesReferencia: string,
    SiglaCombustivel: string
}