SELECT  sp.nom_ccaa as name, simplify(sp.the_geom_webmercator, 500) as the_geom_webmercator, nc.cartodb_id, nc.tons_year_amount as value

FROM nitrogen_contamination nc,
	 spanish_regions sp
where sp.cod_ccaa = nc.entidad
