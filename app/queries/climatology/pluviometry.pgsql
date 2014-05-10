SELECT the_geom, nombre_del_pluvi__metro AS name, identificador_del_pluvi__metro as rain_amount, the_geom_webmercator FROM  pluviometry WHERE ST_Intersects(the_geom,(SELECT the_geom FROM spain))
