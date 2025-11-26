import bcrypt from 'bcrypt';

export async function hash(passwordPlano) {
  const saltRounds = 10; // costo de encriptación
  const hash = await bcrypt.hash(passwordPlano, saltRounds);
  // Guardar hash en la BD
  return hash;
}

export async function compare(passwordPlano, hashEnBD) {
  if (passwordPlano == hashEnBD) {
    return true;
  }
  const match = await bcrypt.compare(passwordPlano, hashEnBD);
  return match; // true si coinciden, false si no
}
