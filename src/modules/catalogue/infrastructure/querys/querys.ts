const appQuery = {
  VALIDATE_PERSON: `
        SELECT 
            tbc.is_active AS is_active
        FROM 
          tb_person tbp
        LEFT JOIN
          tb_customer tbc ON tbp.id = tbc.id
        WHERE
          tbp.document =$1  AND tbc.is_active = $2
          
      `,
  LIST_PERSON: `
        SELECT 
            tbp.id AS id,
            tbp.first_name AS first_name,
            tbp.last_name AS last_name,
            tbp.email AS email,
            tbp.phone AS phone,
            tbp.document AS document,
            tbp.id_city AS id_city,
            tbp.id_comuna AS id_comuna,
            tbct.value AS value_city,
            tbco.value AS value_comuna
        FROM 
          tb_person tbp
        LEFT JOIN
          tb_customer tbc ON tbp.id = tbc.id
        LEFT JOIN
          tc_city tbct ON tbp.id_city = tbct.id
        LEFT JOIN
          tc_comuna tbco ON tbp.id_comuna = tbco.id 
      `,
};

export default appQuery;
