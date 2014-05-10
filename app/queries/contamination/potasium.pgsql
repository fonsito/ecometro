SELECT  sp.nom_ccaa as name, sp.the_geom, 		
		sp.the_geom_webmercator, pc.tons_year_amount
FROM potasium_contamination pc,
	 spanish_regions sp 
where sp.cod_ccaa = pc.entidad