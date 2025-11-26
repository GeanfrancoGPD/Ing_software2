import { query } from './db';

/**
 * Valida que un identificador SQL (tabla o columna) tenga un formato seguro:
 * solo letras, números y guiones bajos y que no empiece por número.
 */
function valIdentificador(name) {
  return typeof name === 'string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

/**
 * Construye arrays para columnas, valores y placeholders
 * data: objeto { col: value, ... }
 * startIndex: número inicial para los $ placeholders
 * Devuelve { cols, vals, placeholders }
 */
function buildColumnsAndPlaceholders(data, startIndex = 1) {
  const cols = Object.keys(data);
  const vals = Object.values(data);
  const placeholders = vals.map((_, i) => `$${i + startIndex}`);
  return { cols, vals, placeholders };
}

/**
 * CRUD helpers simples para tablas SQL.
 *
 * Todas las funciones validan `table` y `idCol` con valIdentificador.
 * Además muchas funciones aceptan `allowedCols` para filtrar data entrante.
 */
export const crud = {
  /**
   * create(table, data, allowedCols = null)
   * Inserta una fila en `table` usando columnas/valores de `data`.
   * Si `allowedCols` es array, sólo se permitirán esas columnas.
   *
   * Ejemplo:
   * await crud.create('users', { name: 'Ana', age: 30 }, ['name','age']);
   * -> INSERT INTO users (name,age) VALUES ($1,$2) RETURNING *
   */
  async create(table, data, allowedCols = null) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');

    const filtered = allowedCols
      ? Object.fromEntries(
          Object.entries(data).filter(([k]) => allowedCols.includes(k))
        )
      : data;

    const { cols, vals, placeholders } = buildColumnsAndPlaceholders(
      filtered,
      1
    );

    if (!cols.length) throw new Error('No hay columnas para insertar');

    // Validar columnas (identificadores seguros)
    cols.forEach((c) => {
      if (!valIdentificador(c))
        throw new Error(`Nombre de columna inválido: ${c}`);
    });

    const sql = `INSERT INTO ${table} (${cols.join(
      ','
    )}) VALUES (${placeholders.join(',')}) RETURNING *`;

    const { rows } = await query(sql, vals);
    return rows[0];
  },

  /**
   * findAll(table, whereClause = '', params = [], options = {})
   * Devuelve filas de `table`. `whereClause` debe usar placeholders $1..$n
   * `params` son los valores para esos placeholders.
   * options: { limit = 100, offset = 0, orderBy = null }
   *
   * Ejemplo:
   * await crud.findAll('users', 'age > $1 AND active = $2', [18, true], { limit: 10, offset: 0, orderBy: 'id DESC' })
   *
   * Nota: orderBy se pega directamente — si lo expones a input del usuario, valida/filtra.
   */
  async findAll(
    table,
    whereClause = '',
    params = [],
    { limit = 100, offset = 0, orderBy = null } = {}
  ) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');

    let sql = `SELECT * FROM ${table}`;
    if (whereClause) sql += ` WHERE ${whereClause}`;

    // Si hay orderBy explícito, lo añadimos tal cual (asegúrate de sanitizar si viene del cliente)
    if (orderBy) sql += ` ORDER BY ${orderBy}`;
    else sql += ` ORDER BY 1`;

    // Añadimos placeholders para limit/offset
    const limitPlaceholderIndex = params.length + 1;
    const offsetPlaceholderIndex = params.length + 2;
    sql += ` LIMIT $${limitPlaceholderIndex} OFFSET $${offsetPlaceholderIndex}`;

    const finalParams = [...params, limit, offset];
    const { rows } = await query(sql, finalParams);
    return rows;
  },

  /**
   * findById(table, idCol, id)
   * Devuelve la fila cuyo idCol = id o null si no existe.
   *
   * Ejemplo:
   * await crud.findById('users', 'id', 12)
   */
  async findById(table, idCol, id) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');
    if (!valIdentificador(idCol))
      throw new Error('Nombre de columna id inválido');

    const { rows } = await query(`SELECT * FROM ${table} WHERE ${idCol} = $1`, [
      id,
    ]);
    return rows[0] || null;
  },

  /**
   * update(table, idCol, id, data, allowedCols = null)
   * Actualiza columnas dadas en `data` para la fila identificada por idCol = id.
   * Devuelve la fila actualizada o null si no existe.
   *
   * Ejemplo:
   * await crud.update('users', 'id', 5, { name: 'Paco', age: 40 }, ['name','age'])
   * -> UPDATE users SET name=$1, age=$2 WHERE id=$3 RETURNING *
   */
  async update(table, idCol, id, data, allowedCols = null) {
    if (!isSafeIdentifier(table)) throw new Error('Nombre de tabla inválido');
    if (!isSafeIdentifier(idCol))
      throw new Error('Nombre de columna id inválido');

    const filtered = allowedCols
      ? Object.fromEntries(
          Object.entries(data).filter(([k]) => allowedCols.includes(k))
        )
      : data;

    const { cols, vals } = buildColumnsAndPlaceholders(filtered, 1);
    if (!cols.length) throw new Error('No hay columnas para actualizar');

    // Validar columnas
    cols.forEach((c) => {
      if (!isSafeIdentifier(c))
        throw new Error(`Nombre de columna inválido: ${c}`);
    });

    const setClause = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');
    const idPlaceholderIndex = cols.length + 1;
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${idCol} = $${idPlaceholderIndex} RETURNING *`;

    const { rows } = await query(sql, [...vals, id]);
    return rows[0] || null;
  },

  /**
   * delete(table, idCol, id)
   * Borra la fila con idCol = id y devuelve la fila borrada (RETURNING *) o null.
   *
   * Ejemplo:
   * await crud.delete('posts', 'id', 77)
   */
  async delete(table, idCol, id) {
    if (!isSafeIdentifier(table)) throw new Error('Nombre de tabla inválido');
    if (!isSafeIdentifier(idCol))
      throw new Error('Nombre de columna id inválido');

    const { rows } = await query(
      `DELETE FROM ${table} WHERE ${idCol} = $1 RETURNING *`,
      [id]
    );
    return rows[0] || null;
  },
};

export default crud;
