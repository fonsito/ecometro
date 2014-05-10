SELECT  sp.nom_ccaa as name, sp.the_geom, 		
		sp.the_geom_webmercator, nc.ton_year_amount
FROM nitrogen_contamination nc,
	 spanish_regions sp 
where sp.cod_ccaa = nc.entidad