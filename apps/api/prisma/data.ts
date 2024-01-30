import {
  EventStatus,
  EventType,
  MediaType,
  Role,
  TransactionStatus,
} from '@prisma/client';

export const categories = [
  { name: 'Semua' },
  { name: 'Seminar' },
  { name: 'Konser' },
  { name: 'Horor' },
  { name: 'Komedi' },
  { name: 'Olahraga' },
  { name: 'Pameran' },
];

export const events = [
  {
    name: 'SUM 41 TOUR OF THE SETTING SUM FINAL TOUR',
    slug: 'sum-41-tour-of-the-setting-sum-final-tour',
    price: 230000,
    time: new Date(),
    date: new Date(),
    description:
      'SUM 41 akhirnya menggelar Global Farewell Tour 2024 mereka di Indonesia dengan bintang tamu spesial Band Ignite sebagai band pembuka konser mereka. Konser ini akan menjadi konser yang penuh dengan kenangan manis bagi para Skumfuks yang ada di Indonesia karena ini adalah bagian dari Farewell Tour SUM 41 dan pesta terakhir untuk Derryck Whibley dan kawan-kawan sebelum mereka bubar untuk selamanya. Jangan melewatkan kesempatan untuk menyaksikan SUM 41 secara langsung pada tanggal 1 Maret 2024 ini di Uptown Park Summarecon Mall Serpong.Beli tiketnya di tiket.com sekarang!',
    location:
      'Pakulonan Barat, Kelapa Dua, Kabupaten Tangerang, Banten 15810, Curug, Tangerang, Banten, Indonesia',
    type: EventType.FREE,
    seat: 100,
    status: EventStatus.ACTIVE,
    categoryId: 1,
  },
  {
    name: 'IVE THE 1ST WORLD TOUR <SHOW WHAT i HAVE> IN JAKARTA',
    slug: 'ive-in-jakarta-2024',
    price: 1225000,
    time: new Date(),
    date: new Date(),
    description:
      'DIVE Indonesia! Grup K-pop favoritmu, IVE menyapa fans Indonesia lewat tur perdana mereka, IVE THE 1ST WORLD TOUR SHOW WHAT i HAVE IN JAKARTA Grup K-Pop sensational yang beranggotakan Gaeul, Yujin, Rei, Wonyoung, Liz, dan Leeseo akan memberikan penampilan spesial untuk DIVE Indonesia pada 24 Agustus 2024 mendatang. Bernyanyi dan berdansa bersama lagu-lagu hits mereka, seperti Off The Record, Love Dive, After LIKE, Kitsch, dan lainnya! Lihat langsung penampilan para Baddie dan beli tiket konsernya di tiket.com sekarang! Sampai jumpa di bulan Agustus, DIVE!',
    location:
      'Ice Bsd City, Jalan Bsd Grand Boulevard, Pagedangan, Tangerang Regency, Banten, Indonesia, Tangerang, Banten, Indonesia',
    type: EventType.PAID,
    seat: 100,
    status: EventStatus.ACTIVE,
    categoryId: 2,
  },
  {
    name: 'IBL TOKOPEDIA - GAME 3 - PACIFIC CAESAR SURABAYA VS BIMA PERKASA JOGJA',
    slug: 'ibl-2024-pacific-caesar-surabaya-vs-bima-perkasa-jogja',
    price: 50000,
    time: new Date(),
    date: new Date(),
    description:
      'Gor Pacific Caesar, Raya Gading Pantai, Dukuh Sutorejo, Surabaya, East Java, Indonesia, Mulyorejo, Surabaya, Jawa Timur, Indonesia',
    location:
      'Ice Bsd City, Jalan Bsd Grand Boulevard, Pagedangan, Tangerang Regency, Banten, Indonesia, Tangerang, Banten, Indonesia',
    status: EventStatus.ACTIVE,
    seat: 100,
    type: EventType.PAID,
    categoryId: 1,
  },
  {
    name: 'PESTA BERGOYANG (PERGOY)',
    slug: 'pesta-bergoyang-pergoy',
    price: 140000,
    time: new Date(),
    date: new Date(),
    description:
      'Pesta Bergoyang 2024, tampil perdana di Bali, hadir dengan alunan melodi nusantara yang siap bikin kamu goyang terus akan hadir di Lapangan Niti Mandala Renon, Denpasar, di tanggal 25 Februari 2024. Siapa yang gak pengen nonton mamang tampan dari Kangen Band? Ambyar bareng NDX AKA? Ajojing sama DJ Mahesa? Dan masih ada lagi bintang dahsyat lainnya yang siap bikin kamu gamau pulang maunya digoyang~ Langsung pesan tiketnya lewat tiket.com sekarang!',
    location:
      'Lapangan Niti Mandala Renon, Panjer, Denpasar Selatan, Denpasar City, Bali 80234, Denpasar Selatan, Denpasar, Bali, Indonesia',
    status: EventStatus.ACTIVE,
    seat: 100,
    type: EventType.PAID,
    categoryId: 1,
  },
];

export const medias = [
  {
    type: MediaType.EVENT,
    typeId: 1,
    url: 'assets/events/seed/1.jpg',
  },
  {
    type: MediaType.EVENT,
    typeId: 2,
    url: 'assets/events/seed/2.webp',
  },
  {
    type: MediaType.EVENT,
    typeId: 3,
    url: 'assets/events/seed/3.webp',
  },
  {
    type: MediaType.EVENT,
    typeId: 4,
    url: 'assets/events/seed/4.webp',
  },
];

export const users = [
  {
    username: 'user1',
    password: '123user1',
    email: 'user1@gmail.com',
    referralCode: 'abc123',
    role: Role.CUSTOMER,
  },
  {
    username: 'user2',
    password: '123user2',
    email: 'user2@gmail.com',
    referralCode: 'abc456',
    role: Role.ORGANIZER,
  },
];

export const referral = [
  {
    referralCode: 'abc123',
    referrerId: 1,
    refereeId: 2,
  },
  {
    referralCode: 'abc456',
    referrerId: 2,
    refereeId: 1,
  },
];

export const transactions = [
  {
    eventId: 1,
    userId: 1,
    rating: 4.5,
    status: TransactionStatus.SUCCESS,
  },
  {
    eventId: 1,
    userId: 1,
    rating: 5,
    status: TransactionStatus.SUCCESS,
  },
  {
    eventId: 1,
    userId: 2,
    status: TransactionStatus.PENDING,
  },
  {
    eventId: 2,
    userId: 1,
    status: TransactionStatus.ONPROSES,
  },
  {
    eventId: 2,
    userId: 1,
    rating: 5,
    status: TransactionStatus.SUCCESS,
  },
];
