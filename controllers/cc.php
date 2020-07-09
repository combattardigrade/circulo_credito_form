<?php
require_once('vendor/autoload.php');

class CirculoCredito
{
    public function setUp()
    {
        $config = new \RcSimulacionClientPhp\Client\Configuration();
        $config->setHost('the_url');
        $client = new \GuzzleHttp\Client(['verify' => false]);
        $this->apiInstance = new \RcSimulacionClientPhp\Client\Api\ReporteDeCrditoApi($client, $config);
        $this->x_api_key = "your_api_key";
    }

    public function testGetFullReporte()
    {
        $x_full_report = true;
        $request = new \RcSimulacionClientPhp\Client\Model\PersonaPeticion();

        $request->setPrimerNombre("xxxxx");
        $request->setApellidoPaterno("xxxxx");
        $request->setApellidoMaterno("xxxxx");
        $request->setRfc("xxxxx");
        $request->setFechaNacimiento("yyyy-MM-dd");
        $request->setNacionalidad("MX");

        $domicilio = new \RcSimulacionClientPhp\Client\Model\DomicilioPeticion();
        $domicilio->setDireccion("xxxxx");
        $domicilio->setColoniaPoblacion("xxxxx");
        $domicilio->setCiudad("xxxxx");
        $domicilio->setCp("xxxxx");
        $domicilio->setDelegacionMunicipio("xxxxx");
        $domicilio->setEstado("DF");
        $request->setDomicilio($domicilio);

        try {
            $result = $this->apiInstance->getReporte($this->x_api_key, $request, $x_full_report);
            $this->assertNotNull($result);
            echo "testGetFullReporte finished\n";
        } catch (Exception $e) {
            echo 'Exception when calling ReporteDeCrditoConsolidadoApi->getReporte: ', $e->getMessage(), PHP_EOL;
        }
    }
}


$circulo = new CirculoCredito();
$circulo->setUp();
$circulo->testGetFullReporte();