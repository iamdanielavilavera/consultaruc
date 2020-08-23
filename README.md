# consultaruc

Consultar RUC en SUNAT.

# instalar paquetes

```
npm install
```


# correr servidor

```
npm start
```

```
node app.js
```

# Petición

```
http://localhost:3000/
```

request POST:
```json
{
    "ruc" : "20254138577"
}
```

response:
```json
[
    {
        "name": "Número de RUC: ",
        "value": "20254138577 - MICROSOFT PERU S.R.L."
    },
    {
        "name": "Tipo Contribuyente: ",
        "value": "SOC.COM.RESPONS. LTDA"
    },
    {
        "name": "Nombre Comercial: ",
        "value": "MICROSOFT PERU"
    },
    {
        "name": "Fecha de Inscripción: ",
        "value": "22/07/1994"
    },
    {
        "name": "Fecha Inicio de Actividades:",
        "value": " 22/07/1994"
    },
    {
        "name": "Estado del Contribuyente: ",
        "value": "ACTIVO"
    },
    {
        "name": "Condición del Contribuyente:",
        "value": " HABIDO "
    },
    {
        "name": "Dirección del Domicilio Fiscal:",
        "value": "AV. VICTOR ANDRES BELAUNDE NRO. 147 DPTO. 9 (EDIFICIO REAL 2.CENTRO EMPRESARIAL) LIMA - LIMA - SAN ISIDRO"
    },
    {
        "name": "Sistema de Emisión de Comprobante:",
        "value": "COMPUTARIZADO"
    },
    {
        "name": "Actividad de Comercio Exterior:",
        "value": "SIN ACTIVIDAD"
    },
    {
        "name": "Sistema de Contabilidad:",
        "value": "COMPUTARIZADO"
    },
    {
        "name": "Actividad(es) Económica(s):",
        "value": " Principal - 6202 - CONSULTORÍA DE INFORMÁTICA Y GESTIÓN DE INSTALACIONES INFORMÁTICAS "
    },
    {
        "name": "Comprobantes de Pago c/aut. de impresión (F. 806 u 816): ",
        "value": " FACTURA RECIBO POR HONORARIOS BOLETA DE VENTA NOTA DE CREDITO NOTA DE DEBITO GUIA DE REMISION - REMITENTE COMPROBANTE DE RETENCION "
    },
    {
        "name": "Sistema de Emisión Electrónica: ",
        "value": " DESDE LOS SISTEMAS DEL CONTRIBUYENTE. AUTORIZ DESDE 22/09/2015 "
    },
    {
        "name": "Afiliado al PLE desde: ",
        "value": "08/01/2013 "
    },
    {
        "name": "Padrones :",
        "value": " Excluido del Régimen de Agentes de Retención de IGV a partir del 01/09/2016 "
    }
]
```
