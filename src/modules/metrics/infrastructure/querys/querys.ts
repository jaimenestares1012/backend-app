const appQuery = {
  LIST_GET_TREND: `
       SELECT 
          tbip.month AS month,
          tbip.meta AS meta,
          SUM(tbs.amount) AS suma
      FROM 
          tb_information_period tbip
      LEFT JOIN
          tb_sale tbs
      ON
          tbip.id = tbs.id_information_period
      WHERE 
          tbip.month BETWEEN $1 AND $2
          AND tbs.is_active = true
      GROUP BY 
          tbip.month, tbip.meta;
      `,

  LIST_PRODUCTS_SALES: `
        SELECT 
            tbs.id_product,
            tbp.name as name_product,
            SUM(tbs.amount) AS suma
        FROM 
            tb_sale tbs
        LEFT JOIN tb_information_period tbip  ON tbip.id = tbs.id_information_period
        LEFT JOIN tb_product tbp ON tbp.id = tbs.id_product
        WHERE 
            tbip.month = $1 
            AND tbs.is_active = true
        GROUP BY
            tbs.id_product,
            tbp.name;   

    `,
  GET_PRODUCT_TREND: `
      SELECT 
          tbip.month AS month,
          SUM(tbs.amount) AS suma
      FROM 
          tb_information_period tbip
      LEFT JOIN
          tb_sale tbs
      ON
          tbip.id = tbs.id_information_period
      WHERE 
          tbs.id_product = $1 AND
          tbip.month BETWEEN $2 AND $3
           AND tbs.is_active = true
      GROUP BY 
          tbip.month

    `,

  GET_SALES_CUSTOMER: `
        SELECT 
            tbs.id_customer,
            --CONCAT(tbp.first_name, ' ', tbp.last_name) AS name_customer,
            tbp.last_name AS name_customer,
            SUM(tbs.amount) AS suma
        FROM 
            tb_sale tbs
        LEFT JOIN tb_information_period tbip  ON tbip.id = tbs.id_information_period
        LEFT JOIN tb_person tbp ON tbp.id = tbs.id_customer
        WHERE 
            tbip.month =  $1
             AND tbs.is_active = true
        GROUP BY
            tbs.id_customer,
            tbp.last_name,
            tbp.first_name;  
    `,

  GET_CUSTOMER_TREND: `
      SELECT 
          tbip.month AS month,
          SUM(tbs.amount) AS suma
      FROM 
          tb_information_period tbip
      LEFT JOIN
          tb_sale tbs
      ON
          tbip.id = tbs.id_information_period
      WHERE 
          tbs.id_customer = $1 AND
          tbip.month BETWEEN $2 AND $3
           AND tbs.is_active = true
      GROUP BY 
          tbip.month

    `,
  GET_ALL_SALES_PRODUCTS: `
        SELECT 
            tbs.id_product,
            tbp.name AS name_product,
            SUM(tbs.amount) AS suma
        FROM 
            tb_sale tbs
        LEFT JOIN
            tb_product tbp
        ON
            tbp.id = tbs.id_product
        WHERE
            tbs.is_active = true
        GROUP BY
            tbs.id_product, tbp.name
    `,
  GET_BEST_SELLIG_PRODUCT: `
        SELECT 
            SUM(tbs.number_products) AS number_products,
	        SUM(tbs.amount) AS amount_all,
	        tbs.id_product,
            tbp.name AS name_product
        FROM 
            tb_information_period tbip
        LEFT JOIN
            tb_sale tbs ON tbip.id = tbs.id_information_period
        LEFT JOIN
	        tb_product tbp ON tbp.id = tbs.id_product
        WHERE 
            tbip.month = $1 AND
            tbs.is_active = true
         GROUP BY
            tbs.id_product,
            tbp.name
        ORDER BY 
            number_products DESC  
        LIMIT 1;        

    `,
  GET_AMOUNT_SALE_PERIOD: `
        SELECT 
            SUM(tbs.amount) AS amount_all
        FROM 
            tb_information_period tbip
        LEFT JOIN
            tb_sale tbs ON tbip.id = tbs.id_information_period
        WHERE 
            tbip.month = $1
            AND tbs.is_active = true
    `,
  GET_INFO_PERIOD: `
        SELECT 
            tbip.month AS month,
            tbip.meta AS meta
        FROM 
            tb_information_period tbip
        WHERE 
            tbip.month = $1
    `,
};

export default appQuery;
