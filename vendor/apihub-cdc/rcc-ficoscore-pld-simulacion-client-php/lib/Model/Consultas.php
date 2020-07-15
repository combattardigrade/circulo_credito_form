<?php

namespace RCCFicoScorePLDSimulacion\Client\Model;

use \ArrayAccess;
use \RCCFicoScorePLDSimulacion\Client\ObjectSerializer;

class Consultas implements ModelInterface, ArrayAccess
{
    const DISCRIMINATOR = null;
    
    protected static $RCCFicoScorePLDSimulacionModelName = 'Consultas';
    
    protected static $RCCFicoScorePLDSimulacionTypes = [
        'consultas' => '\RCCFicoScorePLDSimulacion\Client\Model\Consulta[]'
    ];
    
    protected static $RCCFicoScorePLDSimulacionFormats = [
        'consultas' => null
    ];
    
    public static function RCCFicoScorePLDSimulacionTypes()
    {
        return self::$RCCFicoScorePLDSimulacionTypes;
    }
    
    public static function RCCFicoScorePLDSimulacionFormats()
    {
        return self::$RCCFicoScorePLDSimulacionFormats;
    }
    
    protected static $attributeMap = [
        'consultas' => 'consultas'
    ];
    
    protected static $setters = [
        'consultas' => 'setConsultas'
    ];
    
    protected static $getters = [
        'consultas' => 'getConsultas'
    ];
    
    public static function attributeMap()
    {
        return self::$attributeMap;
    }
    
    public static function setters()
    {
        return self::$setters;
    }
    
    public static function getters()
    {
        return self::$getters;
    }
    
    public function getModelName()
    {
        return self::$RCCFicoScorePLDSimulacionModelName;
    }
    
    
    
    protected $container = [];
    
    public function __construct(array $data = null)
    {
        $this->container['consultas'] = isset($data['consultas']) ? $data['consultas'] : null;
    }
    
    public function listInvalidProperties()
    {
        $invalidProperties = [];
        return $invalidProperties;
    }
    
    public function valid()
    {
        return count($this->listInvalidProperties()) === 0;
    }
    
    public function getConsultas()
    {
        return $this->container['consultas'];
    }
    
    public function setConsultas($consultas)
    {
        $this->container['consultas'] = $consultas;
        return $this;
    }
    
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }
    
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
    
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }
    
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }
    
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) {
            return json_encode(
                ObjectSerializer::sanitizeForSerialization($this),
                JSON_PRETTY_PRINT
            );
        }
        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}
