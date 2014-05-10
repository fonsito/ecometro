Historic constraints 

Get product list
```sql
SELECT distinct(product) FROM historic_constraints where cohort='Consumer' order by product asc
```

Only averages

```sql
SELECT _constraint as constraint,  avg(constraint_value) as average 
FROM historic_constraints where cohort='Consumer' group by _constraint

```


Historic constraints by product and cohort
```sql
SELECT Distinct(_constraint) as constraint, product, avg(constraint_value) as value 
FROM historic_constraints where product='World Governance Indicators' and cohort='Consumer' 
group by _constraint, product
order by _constraint asc

```

Historic constraints by product and cohort with average

```sql
WITH pro AS ( 
  SELECT Distinct(_constraint) as constraint, product, avg(constraint_value) as value 
  FROM historic_constraints where product='World Governance Indicators' and cohort='Consumer' group by _constraint, product
)
SELECT pro.constraint, pro.product, avg(constraint_value) as average, pro.value 
FROM historic_constraints JOIN pro on pro.constraint=historic_constraints._constraint where cohort='Consumer' 
group by pro.constraint, pro.product, pro.value
order by pro.constraint asc

```

Future constraints 

```sql
  SELECT Distinct(_constraint) as constraint, avg(constraint_value) as value 
  FROM historic_constraints where cohort='Consumer' group by _constraint


```

##USAGE Map

### map by product / year

```sql
 SELECT  countries.cartodb_id,countries.the_geom, countries.the_geom_webmercator,usage_production.country_code, countries.name,product,year, production_count, usage_count,country_coverage_challenges.count::float as challenges 
FROM usage_production 
left join countries on usage_production.country_code=countries.adm0_a3 
left join country_coverage_challenges on country_coverage_challenges.country_code=countries.adm0_a3
where year='2008' and product='Public Accountability Mechanisms' 
```
### Map by product, all years

```sql
WITH sub as (SELECT country_code, product, sum(production_count::float) as production_count, sum(usage_count::float) as usage_count FROM usage_production 
where  product='Public Accountability Mechanisms' group by product, country_code ) 
SELECT  countries.cartodb_id,countries.the_geom, countries.the_geom_webmercator,sub.country_code, countries.name,product, production_count, usage_count,country_coverage_challenges.count::float as challenges 
FROM sub 
left join countries on sub.country_code=countries.adm0_a3 
left join country_coverage_challenges on country_coverage_challenges.country_code=countries.adm0_a3
```
### Map by year, all products

```sql
WITH sub as (SELECT country_code, year, sum(production_count::float) as production_count, sum(usage_count::float) as usage_count 
FROM usage_production where  year='2008' group by year, country_code) 
SELECT  countries.cartodb_id,countries.the_geom, countries.the_geom_webmercator,sub.country_code, countries.name,year, production_count, usage_count,country_coverage_challenges.count::float as challenges FROM sub left join countries on sub.country_code=countries.adm0_a3 
left join country_coverage_challenges on country_coverage_challenges.country_code=countries.adm0_a3
```


### Map all years, all products including challenges
```sql
WITH sub as (SELECT country_code, sum(production_count::float) as production_count, sum(usage_count::float) as usage_count 
FROM usage_production  group by  country_code ) 
SELECT countries.cartodb_id,countries.the_geom, countries.the_geom_webmercator,sub.country_code, countries.name, production_count, usage_count,country_coverage_challenges.count::float as challenges  
FROM sub left join countries on sub.country_code=countries.adm0_a3 
left join country_coverage_challenges on country_coverage_challenges.country_code=countries.adm0_a3
```


### Percentiles for production_count

```sql
WITH sub as (SELECT country_code, sum(production_count::float) as production_count, sum(usage_count::float) as usage_count 
FROM usage_production 
WHERE production_count is not null 
and  product='Public Accountability Mechanisms' 
and year='2012'
group by  country_code )
, percentiles AS ( SELECT NTILE(7) OVER (ORDER BY production_count) AS percentile, * FROM sub ) 

SELECT max(production_count)::float , percentile::float FROM percentiles  GROUP by percentile ORDER by percentile desc
```


## Misc

### Misc Future Production Costs
Product list

http://globalintegrity.cartodb.com/api/v2/sql?q=SELECT Distinct (product) from future_production_costs

Values by product + average

WITH t as(SELECT year as age,product, ARRAY[ avg(amount::float) OVER (PARTITION BY year), amount::float ] as data FROM future_production_costs) select age, data from t where product= 'Environmental Democracy index'

only average

SELECT year as age,  avg(amount::float) as data FROM future_production_costs group by year


### Misc Production Enabler

Query:


    

Return:
    
    {
    	rows: [{
    		category: 'Average Costs',
    		unit: 'measurement',
    		data: [100, 0]
    	}, {
    		category: 'Enabler Spent',
    		unit: 'measurement',
    		data: [100, 0]
    	}]
    }
    
    
    
### Misc Production Enabler RANKING

Query for average_cost:

```sql
SELECT product as name, average_cost::float as y , 'USD' as units
FROM misc_production_enabler 
where average_cost is not null 
order by average_cost desc
```

query including average

```sql
SELECT product as name, average_cost::float as y, 'USD' as units FROM misc_production_enabler 
where average_cost is not null 
UNION ALL
SELECT 'Average' as name, avg(average_cost::float) as y, 'USD' as units FROM misc_production_enabler
order by y desc
```

Query including all metrics

```sql
SELECT product as name, average_cost::float, enabler_spent::float ,staff_count::float, time_months::float FROM misc_production_enabler 
UNION ALL
SELECT 'Average' as name, avg( average_cost::float), avg( enabler_spent::float) ,avg( staff_count::float), avg( time_months::float) FROM misc_production_enabler
```
