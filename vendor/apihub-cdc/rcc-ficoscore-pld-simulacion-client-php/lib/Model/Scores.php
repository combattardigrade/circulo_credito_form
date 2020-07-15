<?php

namespace RCCFicoScorePLDSimulacion\Client\Model;

use \ArrayAccess;
use \RCCFicoScorePLDSimulacion\Client\ObjectSerializer;

class Scores implements ModelInterface, ArrayAccess
{
    const DISCRIMINATOR = null;
    
    protected static $RCCFicoScorePLDSimulacionModelName = 'Scores';
    
    protected static $RCCFicoScorePLDSimulacionTypes = [
        'scores' => '\RCCFicoScorePLDSimulacion\Client\Model\Score[]'
    ];
    
    protected static $RCCFicoScorePLDSimulacionFormats = [
        'scores' => null
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
        'scores' => 'scores'
    ];
    
    protected static $setters = [
        'scores' => 'setScores'
    ];
    
    protected static $getters = [
        'scores' => 'getScores'
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
        $this->container['scores'] = isset($data['scores']) ? $data['scores'] : null;
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
    
    public function getScores()
    {
        return $this->container['scores'];
    }
    
    public function setScores($scores)
    {
        $this->container['scores'] = $scores;
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
