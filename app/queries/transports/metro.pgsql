SELECT the_geom, the_geom_webmercator, name FROM  metro WHERE ST_Intersects(the_geom,(SELECT the_geom FROM spain))
