SELECT the_geom, the_geom_webmercator, direccion as name, cmun as municipality FROM green_points WHERE ST_Intersects(the_geom,(SELECT the_geom FROM spain))
