const appQuery = {
  LIST_SALE: `
        SELECT 
            tbs.id,
            tbs.id_customer,
            tbs.id_product,
            tbs.amount,
            tbs.number_products,
            tbs.id_information_period,
            tbp.name,
            tbp.price,
            tbpn.first_name,
            tbpn.last_name,
            tbs.created_at
        FROM 
          tb_sale tbs
        LEFT JOIN tb_product tbp ON tbs.id_product = tbp.id
        LEFT JOIN tb_person tbpn  ON tbs.id_customer = tbpn.id
        LEFT JOIN tc_units_measurement tcum  ON tbp.id_units_measurement = tcum.id
      `,
};

export default appQuery;
