const momentsData = [
    {
        id: 15,
        date: '2026-03-25',
        title: 'PVJ Date & Pepper Lunch',
        description: 'Jalan-jalan ke PVJ habis LDR seminggu makan di Pepper Lunch dan beli body lotion and cat rambut. 🛋️🍽️🧴💇🏻‍♀️',
        photos: 'https://photos.app.goo.gl/AeDsHPuvaJ9Wr9mC6',
        type: 'past',
        isLatest: true
    },
    {
        id: 7,
        date: '2026-03-17',
        title: 'Kiara Artha Park & Quick Dentist Trip',
        description: 'Makan masakkan doi (Udang saus padang dan ayam suwir daun jeruk) di mobil di Kiara Artha Park. Lalu tiba-tiba ke dokter gigi karena gigi Silvia sakit, di sana periksa lanjut pulangnya ke Richeese makan lagi. 🍤🍗🦷🍗',
        photos: 'https://photos.app.goo.gl/HhVnL5kCNFJpkT2M8',
        type: 'past'
    },
    {
        id: 8,
        date: '2026-03-15',
        title: 'Movie Night & McDonald\'s',
        description: 'Ke PVJ buat nonton Hoppers. Beres nonton mau makan tapi PVJ rame banget gak kebagian tempat, akhirnya kita langsung cabut dan makan di McDonald\'s aja. 🎬🍔🍟',
        photos: 'https://photos.app.goo.gl/ARhp8kRoRGvySWhq9',
        type: 'past'
    },
    {
        id: 9,
        date: '2026-03-13',
        title: 'Haircut & Late Night McD',
        description: 'Senangnya ditemenin Silvia potong rambut di TRICH! Beres potong kita mampir ke McDonald\'s Summarecon, tapi karena udah kemalaman akhirnya kita mutusin buat takeaway aja. 💈🍔🏠',
        photos: 'https://photos.app.goo.gl/hwmBvtNCSCMVYcu26',
        type: 'past'
    },
    {
        id: 10,
        date: '2026-03-11',
        title: '23 Paskal & Saparua Snacks',
        description: 'Makan di People\'s Cafe 23 Paskal. Tadinya mau potong rambut juga tapi nunggunya lama banget jadi gak jadi deh. Akhirnya kita lanjut jajan-jajan santai di Saparua. 🍜☕🥨',
        photos: 'https://photos.app.goo.gl/w3scKN19QRPvg8YK8',
        type: 'past'
    },
    {
        id: 11,
        date: '2026-03-10',
        title: 'Hampers Visit & Cheering You Up',
        description: 'Mampir ke rumah buat ngasih hampers Lebaran. Sekalian misi penting: bujuk Silvia yang lagi ngambek sejak siang! Akhirnya baikan lagi deh. 🎁❤️😊',
        photos: 'https://photos.app.goo.gl/XfQ2HayHyiX4v2cw6',
        type: 'past'
    },
    {
        id: 12,
        date: '2026-03-08',
        title: 'Fashion Show & Shopping Spree',
        description: 'Nemenin Silvia lomba fashion show di Istana Plaza. Beres lomba kita makan Richeese di 23 Paskal, terus lanjut nemenin aku belanja parfum dan DJI. Capek tapi happy! 💃🍗🛸🧴',
        photos: 'https://photos.app.goo.gl/YdVRxUstLEwivoX97',
        type: 'past'
    },
    {
        id: 13,
        date: '2026-03-05',
        title: 'Sushi Date & Special Gift',
        description: 'Baru pulang dari Jakarta langsung gas ke Saparua buat makan sushi. Silvia padahal sempat gak mau karena takut aku capek, tapi akhirnya kita berangkat. Di mobil kita juga unboxing gift manis dari Silvia! 🍣🎁❤️',
        photos: 'https://photos.app.goo.gl/igpiLK2v6mgi2h5R8',
        type: 'past'
    },
    {
        id: 14,
        date: '2026-03-01',
        title: 'Cooking Date & AEON Shopping',
        description: 'Belanja bahan masak bareng di AEON PVJ. Seru banget akhirnya kita masak sendiri di apart sambil nunggu waktu buka puasa. Dinner hasil masakan sendiri emang beda rasanya! 🛒🥘🌙',
        photos: 'https://photos.app.goo.gl/nfQmXkk7KCkm8hDT9',
        type: 'past'
    },
    {
        id: 16,
        date: '2026-02-25',
        title: 'PVJ & Kue Balok',
        description: 'Buka bersama di PVJ lalu beli kue balok. 🍢🧁🌙',
        photos: 'https://photos.app.goo.gl/TcZTdxFV5GEmgjjB7',
        type: 'past'
    },
    {
        id: 17,
        date: '2026-02-23',
        title: 'Dentist Visit & Saparua Snacks',
        description: 'Silvia nemenin ke Dokter Gigi lalu udahnya jajan di Saparua. 🦷🥨🥤',
        photos: 'https://photos.app.goo.gl/z79svMu93t14vcAC7',
        type: 'past'
    },
    {
        id: 18,
        date: '2026-02-22',
        title: 'Bukber with Silvia\'s Sister & Seblak',
        description: 'Buka bersama bareng kakaknya Silvia, lalu dilanjut makan seblak bareng. 🍲🔥🌙',
        photos: 'https://photos.app.goo.gl/f2h5JFzMG7J7Kcpn9',
        type: 'past'
    },
    {
        id: 19,
        date: '2026-02-16',
        title: 'Rumah Guguk & Braga Photobooth',
        description: 'Main ke Rumah Guguk buat liat anjing-anjing lucu, lalu lanjut ke Braga buat photobooth berdua. 🐶📸✨',
        photos: 'https://photos.app.goo.gl/fMmJHb8xs1izvrxPA',
        type: 'past'
    },
    {
        id: 20,
        date: '2026-02-14',
        title: 'Valentine Date Dinner',
        description: 'Makan malam romantis untuk ngerayain Valentine di Mercure Bandung. 💖🥂🍷',
        photos: 'https://photos.app.goo.gl/81UiqDZwX9QjbzJv8',
        type: 'past'
    },
    {
        id: 21,
        date: '2026-02-12',
        title: 'Pancake Date & Ciwalk Stroll',
        description: 'Makan pancake yang manis, lalu lanjut jalan-jalan santai di Ciwalk. 🥞🚶🏻‍♂️🚶🏻‍♀️',
        photos: 'https://photos.app.goo.gl/eCUPJHHiYUounarn6',
        type: 'past'
    },
    {
        id: 22,
        date: '2026-02-10',
        title: 'Summarecon Steak Dinner',
        description: 'Makan steak enak di Summarecon habis nemenin Silvia ke tukang jahit. 🥩🧵🍽️',
        photos: 'https://photos.app.goo.gl/vDv42RecMBBxt2X59',
        type: 'past'
    },
    {
        id: 23,
        date: '2026-02-08',
        title: 'Lembang Zoo Date & Home-cooked Meal',
        description: 'Serunya nge-date di Lembang Park and Zoo, apalagi sambil makan bekel masakan spesial dari Silvia. 🦁🍱❤️',
        photos: 'https://photos.app.goo.gl/DKDrDThWbukcZzUk7',
        type: 'past'
    },
    {
        id: 24,
        date: '2026-02-06',
        title: 'Gasibu Sate Asin Date',
        description: 'Jajan sate asin di Gasibu, ditemenin Silvia yang baru beres dari tukang jahit. 🍢🏙️🌙',
        photos: 'https://photos.app.goo.gl/M2XLPLjpqYDyBh4z8',
        type: 'past'
    },
    {
        id: 25,
        date: '2026-02-03',
        title: 'Cat Cafe & Sushi Date',
        description: 'Main sama kucing-kucing lucu di Cat Cafe PVJ, lalu tutup hari dengan makan sushi habis nemenin Silvia belanja. 🐱🍣🛒',
        photos: 'https://photos.app.goo.gl/eEQHdeCie1Kje689A',
        type: 'past'
    },
    {
        id: 26,
        date: '2026-02-01',
        title: 'Garut Trip!',
        description: 'Perjalanan seru nemenin Silvia ke Garut, dan pastinya wisata kuliner makan enak di sana. ⛰️🍲🚗',
        photos: 'https://photos.app.goo.gl/FKu2x6iJrkYZJ6MZA',
        type: 'past'
    },
    {
        id: 6,
        date: '2026-01-08',
        title: 'Travel Drop-off at BTC',
        description: 'Escorting you to Lintas Travel in BTC before your Singapore trip tomorrow. Pick up at 23:00. Safe travels! ✈️🇸🇬',
        photos: '', // No photos yet
        type: 'past'
    },
    {
        id: 5,
        date: '2026-01-06',
        title: '105 Coffee + McDonald\'s',
        description: 'Enjoyed a nice coffee break at 105 Coffee and grabbed some McDonald\'s together. Simple moments are the best! (☕🍔)',
        photos: 'https://photos.app.goo.gl/VkU38TQMJN8pUbjF7',
        type: 'past'
    },
    {
        id: 4,
        date: '2026-01-04',
        title: 'Salon + Sate Date',
        description: 'We\'re heading to Salon Anata followed by a delicious satay dinner at Sate Khas Senayan in TSM. ( ˘▽˘)っ♨',
        photos: 'https://photos.app.goo.gl/2pthpbVPQP77GH6k8',
        type: 'past',
        modalId: 'plan-modal-salon'
    },
    {
        id: 3,
        date: '2026-01-03',
        title: 'High Tea & Painting Date',
        description: 'Starting with a cozy coffee time at Bagi Kopi, then heading to Swiss-Belresort for High Tea, painting, and tumblr decorating with a view! ☕🎨✨',
        photos: 'https://photos.app.goo.gl/1HkCC7VM7bE31uBQ7',
        type: 'past',
        modalId: 'plan-modal'
    },
    {
        id: 2,
        date: '2025-12-26',
        title: 'Zootopia Movie Date & Sushi Night',
        description: 'Spent a wonderful time watching Zootopia 2 and enjoyed a delicious dinner at Sushi Tei. (˶ᵔ ᵕ ᵔ˶) ♡',
        photos: 'https://photos.app.goo.gl/SfdLXaZCNG2JgVr89',
        type: 'past'
    },
    {
        id: 1,
        date: '2025-12-24',
        title: 'Avatar Movie Date & McDonald\'s',
        description: 'Watched Avatar and ended the night with some classic McDonald\'s late-night meal. Our very first special memory. ( ੭ ˙ᗜ˙ )੭',
        photos: 'https://photos.app.goo.gl/kEvmETayE7RJsdz37',
        type: 'past'
    }
];
