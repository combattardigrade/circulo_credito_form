<?php

namespace RCCFicoScorePLDSimulacion\Client\Model;

interface ModelInterface
{
    
    public function getModelName();
    
    public static function RCCFicoScorePLDSimulacionTypes();
    
    public static function RCCFicoScorePLDSimulacionFormats();
    
    public static function attributeMap();
    
    public static function setters();
    
    public static function getters();
    
    public function listInvalidProperties();
    
    public function valid();
}
