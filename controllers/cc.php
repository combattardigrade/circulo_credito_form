<?php

namespace RCCFicoScorePLDSimulacion\Client;

use \RCCFicoScorePLDSimulacion\Client\Configuration;
use \RCCFicoScorePLDSimulacion\Client\ApiException;
use \RCCFicoScorePLDSimulacion\Client\ObjectSerializer;

class CirculoCredito
{
    public function setUp()
    {
        $handler = \GuzzleHttp\HandlerStack::create();
        $config = new \RCCFicoScorePLDSimulacion\Client\Configuration();
        $config->setHost('services.circulodecredito.com.mx/sandbox');

        $client = new \GuzzleHttp\Client(['handler' => $handler, 'verify' => false]);
        $this->apiInstance = new \RCCFicoScorePLDSimulacion\Client\Api\RCCFicoScorePLDSimulacionApi($client, $config);

        $this->x_api_key = "LSQiOWjqGQ6G7PD3xfCUtbNuDdMAx6T9";
        $this->x_full_report = 'false';
    }

    public function testGetReporte()
    {
        $estado = new \RCCFicoScorePLDSimulacion\Client\Model\CatalogoEstados();
        $nacionalidad = new \RCCFicoScorePLDSimulacion\Client\Model\CatalogoEstados();
        $request = new \RCCFicoScorePLDSimulacion\Client\Model\PersonaPeticion();
        $domicilio = new \RCCFicoScorePLDSimulacion\Client\Model\DomicilioPeticion();

        $request->setApellidoPaterno("VILLA");
        $request->setApellidoMaterno("PATRICIO");
        $request->setApellidoAdicional(null);
        $request->setPrimerNombre("GARCIA");
        $request->setSegundoNombre(null);
        $request->setFechaNacimiento("1952-05-13");
        $request->setRfc("SAZR010101");
        $request->setCurp(null);
        $request->setNacionalidad("MX");
        $request->setResidencia(null);
        $request->setEstadoCivil(null);
        $request->setSexo(null);
        $request->setClaveElectorIfe(null);
        $request->setNumeroDependientes(null);
        $request->setFechaDefuncion(null);

        $domicilio->setDireccion("HIDALGO 32");
        $domicilio->setColoniaPoblacion("CENTRO");
        $domicilio->setDelegacionMunicipio("LA BARCA");
        $domicilio->setCiudad("BENITO JUAREZ");
        $domicilio->setEstado($estado::JAL);
        $domicilio->setCp("44190");
        $domicilio->setFechaResidencia(null);
        $domicilio->setNumeroTelefono(null);
        $domicilio->setTipoDomicilio(null);
        $domicilio->setTipoAsentamiento(null);
        $request->setDomicilio($domicilio);

        try {
            $result = $this->apiInstance->getReporte($this->x_api_key, $request, $this->x_full_report);
            print_r($result);
            $this->assertTrue($result->getFolioConsulta() !== null);

            return $result->getFolioConsulta();
        } catch (Exception $e) {
            echo 'Exception when calling RCCFicoScorePLDSimulacionApi->getReporte: ', $e->getMessage(), PHP_EOL;
        }
    }
}



