import { prisma } from './lib/prisma'

import { KategoriDivisi } from './generated/prisma';

interface DivisiInput{
  nama_divisi:string,
  kode:string,
  kategori:KategoriDivisi;
}

async function main() {
  const divisions : DivisiInput[] = [
    { nama_divisi: 'Top Management', kode: 'TOP', kategori: 'bph' },
    { nama_divisi: 'Software Engineering', kode: 'SFT', kategori: 'peminatan' },
    { nama_divisi: 'Hardware Engineering', kode: 'HRD', kategori: 'peminatan' },
    { nama_divisi: 'Game Development', kode: 'GAM', kategori: 'peminatan' },
    { nama_divisi: 'Humaniora Internal', kode: 'HIN', kategori: 'pendukung' },
    { nama_divisi: 'Humaniora Eksternal', kode: 'HEX', kategori: 'pendukung' },
    { nama_divisi: 'Kominfo', kode: 'KOM', kategori: 'pendukung' },
    { nama_divisi: 'Kewirausahaan', kode: 'KWU', kategori: 'pendukung' },
  ] 

  console.log('Sedang mengisi data divisi...')

  const result = await prisma.divisi.createMany({
    data: divisions,
    skipDuplicates: true, 
  })

  console.log(`${result.count} data divisi berhasil dimasukkan.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })