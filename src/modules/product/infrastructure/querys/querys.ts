const appQuery = {
  LIST_PRODUCTS: `
        SELECT 
            tbp.id AS id,
            tbp.name AS name,
            tbp.price AS price,
            tbp.stock AS stock,
            tbp.created_at as created_at,
            tcum.value AS value_units_measurement,
            tcum.id AS id_units_measurement
        FROM 
          tb_product tbp
        LEFT JOIN
          tc_units_measurement tcum
        ON
          tbp.id_units_measurement = tcum.id
      `,
};

export default appQuery;
