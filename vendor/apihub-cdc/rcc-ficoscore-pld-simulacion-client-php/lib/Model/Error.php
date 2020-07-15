<?php

namespace RCCFicoScorePLDSimulacion\Client\Model;

use \ArrayAccess;
use \RCCFicoScorePLDSimulacion\Client\ObjectSerializer;

class Error implements ModelInterface, ArrayAccess
{
    const DISCRIMINATOR = null;
    
    protected static $RCCFicoScorePLDSimulacionModelName = 'Error';
    
    protected static $RCCFicoScorePLDSimulacionTypes = [
        'codigo' => 'string',
        'mensaje' => 'string'
    ];
    
    protected static $RCCFicoScorePLDSimulacionFormats = [
        'codigo' => null,
        'mensaje' => null
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
        'codigo' => 'codigo',
        'mensaje' => 'mensaje'
    ];
    
    protected static $setters = [
        'codigo' => 'setCodigo',
        'mensaje' => 'setMensaje'
    ];
    
    protected static $getters = [
        'codigo' => 'getCodigo',
        'mensaje' => 'getMensaje'
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
        $this->container['codigo'] = isset($data['codigo']) ? $data['codigo'] : null;
        $this->container['mensaje'] = isset($data['mensaje']) ? $data['mensaje'] : null;
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
    
    public function getCodigo()
    {
        return $this->container['codigo'];
    }
    
    public function setCodigo($codigo)
    {
        $this->container['codigo'] = $codigo;
        return $this;
    }
    
    public function getMensaje()
    {
        return $this->container['mensaje'];
    }
    
    public function setMensaje($mensaje)
    {
        $this->container['mensaje'] = $mensaje;
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
