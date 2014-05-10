SELECT  sp.nom_ccaa as name, simplify(sp.the_geom_webmercator,1000) as the_geom_webmercator, pc.tons_year_amount, pc.cartodb_id
FROM phosphorus_contamination pc,
	 spanish_regions sp 
where sp.cod_ccaa = pc.entidad