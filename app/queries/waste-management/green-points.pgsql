SELECT the_geom, the_geom_webmercator, direccion as address, cmun as municipality, the_geom_webmercator FROM  green_points WHERE ST_Intersects(the_geom,(SELECT the_geom FROM spain))