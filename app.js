const express = require('express');
const cors = require('cors');
const request = require('request').defaults({
	jar: true,
	encoding: 'binary'
});
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;
const clean = str => str.replace(/\s+/g, ' ');
const urlCode = 'http://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/captcha?accion=random';
const urlPost = 'http://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias';

app.use(cors({origin: '*', optionsSuccessStatus: 200}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('RUC v1.0');
});

app.post('/', (req, res) => {
	if(typeof req.body.ruc === 'undefined' || req.body.ruc === null){
		res.status(500).json({
			message: 'No ha enviado el RUC a buscar'
		});
	}else{
		request(urlCode, (err, response, code) => {
			if (!err && response.statusCode == 200) {
				const formData = {
					nroRuc: req.body.ruc,
					accion: 'consPorRuc',
					numRnd: code
				};
				request.post({
					url: urlPost,
					form: formData
				}, (err, response, body) => {
					if (!err && response.statusCode == 200) {
						const $ = cheerio.load(body);
						const $table = $(".form-table").eq(2); // este es el bloque de la versión imprimible del html
						let resp = [];
						$table.find('tr').each((i, el) => {
							$tds = $(el).children('td');
							resp.push({
								name: clean($tds.eq(0).text()),
								value: clean($tds.eq(1).text())
							});
							// si hay filas con 4 tds
							if ($tds.length === 4) {
								resp.push({
									name: clean($tds.eq(2).text()),
									value: clean($tds.eq(3).text())
								});
							}
						});
						
						var entity = {};

						for(var i = 0; i < resp.length; i++){
	                        var item = resp[i];
	                          if(item.name.indexOf('Número de RUC') !== -1){
	                            var split = item.value.split('-');
	                            entity.ciu = split[0].trim();
	                            entity.business_name = split[1].trim();
	                          }else if(item.name.indexOf('Nombre Comercial') !== -1){
	                            entity.trade_name = item.value.trim();
	                          }else if(item.name.indexOf('Dirección del Domicilio Fiscal') !== -1){
	                          	entity.address = item.value.trim().split("-").map(function (splited) {return splited.trim();}).join("-");
	                          }else if(item.name.indexOf('Dirección del Domicilio Fiscal') !== -1){
	                          }
	                     }

	                     if(entity.ciu){
	                     	res.json(entity);
	                     }else{
	                     	res.status(400).json({
								message: 'RUC no encontrado'
							});
	                     }
						
					} else {
						res.status(500).json({
							message: 'Error al buscar el RUC en SUNAT'
						});
					}
				});
			} else {
				res.status(500).json({
					message: 'Error al buscar el RUC en SUNAT'
				});
			}
		});
	}
})


app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
});