SELECT the_geom, the_geom_webmercator, name, the_geom_webmercator FROM airports WHERE ST_Intersects(the_geom,(SELECT the_geom FROM spain)) 