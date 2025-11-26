/** Valida nombres de columnas y tablas */
function valIdentificador(name) {
  return typeof name === 'string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

/** Construir columnas y placeholders */
function buildColumnsAndPlaceholders(data, startIndex = 1) {
  const cols = Object.keys(data);
  const vals = Object.values(data);
  const placeholders = vals.map((_, i) => `$${i + startIndex}`);
  return { cols, vals, placeholders };
}

export class Crud {
  constructor(dbPool) {
    this.db = dbPool; // <- aquí guardamos la instancia del DB
  }

  /** CREATE */
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

    cols.forEach((c) => {
      if (!valIdentificador(c))
        throw new Error(`Nombre de columna inválido: ${c}`);
    });

    const sql = `INSERT INTO ${table} (${cols.join(',')})
                 VALUES (${placeholders.join(',')})
                 RETURNING *`;

    const rows = await this.db.executeQuery(sql, vals);
    return rows[0];
  }

  /** FIND ALL */
  async findAll(table, whereClause = '', params = [], options = {}) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');

    const { limit = 100, offset = 0, orderBy = null } = options;

    let sql = `SELECT * FROM ${table}`;
    if (whereClause) sql += ` WHERE ${whereClause}`;

    sql += orderBy ? ` ORDER BY ${orderBy}` : ` ORDER BY 1`;

    const limitIdx = params.length + 1;
    const offsetIdx = params.length + 2;

    sql += ` LIMIT $${limitIdx} OFFSET $${offsetIdx}`;

    const finalParams = [...params, limit, offset];
    return await this.db.executeQuery(sql, finalParams);
  }

  /** FIND BY ID */
  async findById(table, idCol, id) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');
    if (!valIdentificador(idCol))
      throw new Error('Nombre de columna id inválido');

    const sql = `SELECT * FROM ${table} WHERE ${idCol} = $1`;

    const rows = await this.db.executeQuery(sql, [id]);
    return rows[0] || null;
  }

  /** UPDATE */
  async update(table, idCol, id, data, allowedCols = null) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');
    if (!valIdentificador(idCol))
      throw new Error('Nombre de columna id inválido');

    const filtered = allowedCols
      ? Object.fromEntries(
          Object.entries(data).filter(([k]) => allowedCols.includes(k))
        )
      : data;

    const { cols, vals } = buildColumnsAndPlaceholders(filtered, 1);
    if (!cols.length) throw new Error('No hay columnas para actualizar');

    cols.forEach((c) => {
      if (!valIdentificador(c))
        throw new Error(`Nombre de columna inválido: ${c}`);
    });

    const setClause = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');
    const sql = `UPDATE ${table} SET ${setClause}
                 WHERE ${idCol} = $${cols.length + 1}
                 RETURNING *`;

    const rows = await this.db.executeQuery(sql, [...vals, id]);
    return rows[0] || null;
  }

  /** DELETE */
  async delete(table, idCol, id) {
    if (!valIdentificador(table)) throw new Error('Nombre de tabla inválido');
    if (!valIdentificador(idCol))
      throw new Error('Nombre de columna id inválido');

    const sql = `DELETE FROM ${table}
                 WHERE ${idCol} = $1
                 RETURNING *`;

    const rows = await this.db.executeQuery(sql, [id]);
    return rows[0] || null;
  }
}

export default Crud;
