SELECT the_geom, name, identificador_de_tipo_de_estudio_de_zona_inundable as type_id, identificador_de_tipo_de_caudal_de_zona_inundable as caudal_type FROM zonas_inundables WHERE ST_Intersects(the_geom,(SELECT the_geom FROM spain))