# Simulación del Reporte de Crédito Consolidado con FICO® Score y Prevención de Lavado de Dinero

Simula el reporte del historial crediticio; el cumplimiento de pago de los compromisos que la persona ha adquirido con entidades financieras, no financieras e instituciones comerciales que dan crédito o participan en actividades afines al crédito; y filtra contra listas de cumplimiento para Prevención de Lavado de Dinero.

## Requisitos

PHP 7.1 ó superior

### Dependencias adicionales
- Se debe contar con las siguientes dependencias de PHP:
    - ext-curl
    - ext-mbstring
- En caso de no ser así, para linux use los siguientes comandos

```sh
#ejemplo con php en versión 7.3 para otra versión colocar php{version}-curl
apt-get install php7.3-curl
apt-get install php7.3-mbstring
```
- Composer [vea como instalar][1]

## Instalación

Ejecutar: `composer install`

## Guía de inicio

### Paso 1. Agregar el producto a la aplicación

Al iniciar sesión seguir os siguientes pasos:

 1. Dar clic en la sección "**Mis aplicaciones**".
 2. Seleccionar la aplicación.
 3. Ir a la pestaña de "**Editar '@tuApp**' ".
    <p align="center">
      <img src="https://github.com/APIHub-CdC/imagenes-cdc/blob/master/edit_applications.jpg" width="900">
    </p>
 4. Al abrirse la ventana emergente, seleccionar el producto.
 5. Dar clic en el botón "**Guardar App**":
    <p align="center">
      <img src="https://github.com/APIHub-CdC/imagenes-cdc/blob/master/selected_product.jpg" width="400">
    </p>

### Paso 2. Capturar los datos de la petición

Los siguientes datos a modificar se encuentran en ***test/Api/ApiTest.php***

Es importante contar con el setUp() que se encargará de inicializar la url. Modificar la URL ***('the_url')*** de la petición del objeto ***$config***, como se muestra en el siguiente fragmento de código:

```php
public function setUp()
{
    $handler = \GuzzleHttp\HandlerStack::create();
    $config = new \RCCFicoScorePLDSimulacion\Client\Configuration();
    $config->setHost('the_url');

    $client = new \GuzzleHttp\Client(['handler' => $handler, 'verify' => false]);
    $this->apiInstance = new \RCCFicoScorePLDSimulacion\Client\Api\RCCFicoScorePLDSimulacionApi($client, $config);

    $this->x_api_key = "your_api_key";
    $this->x_full_report = 'false';   
}      

/**
* Este es el método que se será ejecutado en la prueba ubicado en path/to/repository/test/Api/ApiTest.php 

*/
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
        $this->assertTrue($result->getFolioConsulta()!==null);

        return $result->getFolioConsulta();
    } catch (Exception $e) {
        echo 'Exception when calling RCCFicoScorePLDSimulacionApi->getReporte: ', $e->getMessage(), PHP_EOL;
    }
}  
?>
```
## Pruebas unitarias

Para ejecutar las pruebas unitarias:

```sh
./vendor/bin/phpunit
```

[1]: https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos
