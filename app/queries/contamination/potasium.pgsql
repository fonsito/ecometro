SELECT  sp.nom_ccaa as name,
		simplify(sp.the_geom_webmercator, 2000) as the_geom_webmercator, pc.cartodb_id, pc.tons_year_amount as value
FROM potasium_contamination pc,
	 spanish_regions sp
where sp.cod_ccaa = pc.entidad
