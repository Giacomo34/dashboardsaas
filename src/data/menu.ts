export type Allergen = string;

export interface MenuExtra {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number; // Optional in case some items like Spritz have no price provided
  allergens?: Allergen[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isKids?: boolean;
  isBestSeller?: boolean;
  isSignature?: boolean; // For the 🐢 icon
  extras?: MenuExtra[];
}

export interface MenuCategory {
  id: string;
  name: string;
  note?: string; // For things like "(Hasta las 12)"
  items: MenuItem[];
  categoryExtras?: MenuExtra[]; // If extras apply to the whole category
}

const extrasTostadas: MenuExtra[] = [
  { name: "Guacamole", price: 2.7 },
  { name: "Bacon", price: 2.2 },
  { name: "Huevo duro", price: 1.5 },
  { name: "Huevo frito", price: 1.5 },
];

export const menuData: MenuCategory[] = [
  {
    id: "croissant",
    name: "CROISSANT",
    note: "DESAYUNO LUEGO EXISTO (Hasta las 12)",
    items: [
      {
        id: "c-1",
        name: "Clásico",
        price: 2,
        allergens: ["Gluten", "lactosa"]
      },
      {
        id: "c-2",
        name: "Jamón cocido extra y queso gouda",
        price: 3.5,
        allergens: ["Gluten", "lactosa"]
      }
    ]
  },
  {
    id: "bocadillos-y-sandwiches",
    name: "BOCADILLOS Y SANDWICHES",
    items: [
      {
        id: "b-1",
        name: "Bikini 2.0",
        description: "Jamón cocido extra, queso gouda fundido y mantequilla.",
        price: 6.5,
        allergens: ["Gluten", "lactosa"]
      },
      {
        id: "b-2",
        name: "El clásico catalán",
        description: "Fuet, pan con tomate y aceite del bueno.",
        price: 5.7,
        allergens: ["Gluten"]
      },
      {
        id: "b-3",
        name: "Sandwich de salchichón",
        description: "Salchichón tradicional, jamón cocido extra, queso gouda, pan especial con pepinillos y alioli de trufa.",
        price: 9.5,
        isSignature: true,
        isBestSeller: true,
        allergens: ["Gluten", "lactosa", "huevo"]
      },
      {
        id: "b-4",
        name: "Suka chicken pesto",
        description: "Jugosas tiras pollo en pan tostado, pesto de albahaca y pistacho, tomate seco, rucula, mayonesa y grana padano rallado.",
        price: 10.5,
        isSignature: true,
        allergens: ["Gluten", "Lactosa", "huevo"]
      },
      {
        id: "b-5",
        name: "Bocata bacon queso",
        description: "Pan con tomate, bacon y queso fundido.",
        price: 6.9,
        allergens: ["Gluten", "Lactosa", "huevo"]
      }
    ]
  },
  {
    id: "tostadas-y-mas",
    name: "TOSTADAS Y MAS...",
    categoryExtras: extrasTostadas,
    items: [
      {
        id: "t-1",
        name: "La Nórdica",
        description: "Tostada con ricotta especiada, laminas de aguacate, salmon ahumado, huevo duro, hierbas frescas y aceite de la lola.",
        price: 12.5,
        allergens: ["Gluten", "lactosa", "pescado", "huevo"],
        extras: extrasTostadas
      },
      {
        id: "t-2",
        name: "La Campesina",
        description: "Tostada con huevos revuelto, cherrys confitados, champiñones salteados y hierbas frescas.",
        price: 10.2,
        isVegetarian: true,
        allergens: ["Gluten", "huevo"],
        extras: extrasTostadas
      },
      {
        id: "t-3",
        name: "Edamame Flow",
        description: "Tostada con guacamole, tomate seco, edamame, sésamo y aceite de la lola.",
        price: 9.2,
        isVegan: true,
        allergens: ["Gluten", "Soja", "sesamo"],
        extras: extrasTostadas
      },
      {
        id: "t-4",
        name: "Hum-Baba",
        description: "Tostada con hummus, babaganoush, cherry confitado, rúcula, sesamo y aceite de la lola.",
        price: 9.5,
        isSignature: true,
        isVegan: true,
        allergens: ["Gluten", "sesamo"],
        extras: extrasTostadas
      },
      {
        id: "t-5",
        name: "Shakshuka",
        description: "Una rica salsa de tomate casera con especias aromaticas, huevos escalfados, terminada con ricotta.",
        price: 11.9,
        isSignature: true,
        isVegetarian: true,
        allergens: ["Lactosa", "huevos"],
        extras: extrasTostadas
      }
    ]
  },
  {
    id: "bowls",
    name: "BOWLS",
    items: [
      {
        id: "bo-1",
        name: "Açai na onda!",
        description: "Açai, frutas de temporada y granola.",
        price: 8.5,
        isVegan: true,
        allergens: ["frutos secos"]
      },
      {
        id: "bo-2",
        name: "Bowl del Olimpo",
        description: "Yogur griego, Frutas de temporada y granola.",
        price: 7.5,
        allergens: ["Lactosa", "Frutos secos"]
      },
      {
        id: "bo-3",
        name: "Bowl de frutas",
        description: "Mix de frutas de Temporada.",
        price: 6.5
      }
    ]
  },
  {
    id: "el-momento-spritz",
    name: "EL MOMENTO SPRITZ",
    items: [
      {
        id: "s-1",
        name: "Aperol spritz",
        description: "Aperol, cinzano proseco y soda."
      },
      {
        id: "s-2",
        name: "Crodino spritz",
        description: "Sin alcohol."
      },
      {
        id: "s-3",
        name: "Sarti Spritz",
        description: "Sarti, proseco y soda."
      },
      {
        id: "s-4",
        name: "Campari Spritz",
        description: "Campari, prosecco cinzano y soda."
      }
    ]
  },
  {
    id: "para-picar",
    name: "Para Picar",
    items: [
      {
        id: "p-1",
        name: "Patatas Piqué (Elija el sabor)",
        description: "Chips clasicas, pimienta flor de sal, malahierba y torreznos",
        price: 3
      },
      {
        id: "p-2",
        name: "Aceitunas MALAHIERBA",
        price: 3.9,
        allergens: ["Sulfitos"]
      },
      {
        id: "p-3",
        name: "Gilda de boquerones",
        price: 2.5,
        allergens: ["pescado", "sulfitos"]
      },
      {
        id: "p-4",
        name: "Ensaladilla de Bacalao con Olivada",
        price: 9.5,
        isSignature: true,
        allergens: ["Pescado", "huevo"]
      },
      {
        id: "p-5",
        name: "El Dúo ibérico",
        description: "Torreznos de Soria crujientes servido con pimientos del padrón y escamas de sal",
        price: 9.2
      },
      {
        id: "p-6",
        name: "Edamame Crush",
        description: "edamame crujiente, tartufata y escamas de sal",
        price: 9.8,
        isSignature: true,
        allergens: ["Sulfitos"]
      },
      {
        id: "p-7",
        name: "La babuenas fritas",
        description: "finas patatas fritas con tartufata, grana padano y perejil",
        price: 7.9,
        isVegetarian: true,
        allergens: ["Sulfitos", "Lactosa"]
      },
      {
        id: "p-8",
        name: "El Libanés",
        description: "Hummus, babaganoush, falafel, aceitunas malahierba, crudités de verduras y pan pita",
        price: 12.8,
        isVegan: true,
        allergens: ["Gluten", "sesámo", "lactosa"]
      },
      {
        id: "p-9",
        name: "Casi los NACHOS DEL DJANGO",
        description: "con guacamole, queso fundido, crema agria, chili \"carne\" vegano, pico de gallo, jalapeño, cilantro y un toque de salsa picante",
        price: 15.4,
        isVegetariana: true, // will map to isVegetarian in type? yes, let's just use isVegetarian
        allergens: ["Lactosa", "Soja"]
      }
    ].map(i => ({...i, isVegetarian: (i as any).isVegetariana ? true : i.isVegetarian }))
  },
  {
    id: "las-preliminares",
    name: "LAS PRELIMINARES",
    items: [
      {
        id: "pr-1",
        name: "Mejillones con salsa marinera thai y hojas de cilantro fresco",
        price: 13.2,
        allergens: ["Molusco", "Ápio"]
      },
      {
        id: "pr-2",
        name: "Carpaccio de atún rojo con aliño cítrico de yuzu, cebolla morada, alcaparrones y cebollino",
        price: 22.9,
        allergens: ["Pescado", "Soja"]
      },
      {
        id: "pr-3",
        name: "Sashimi tropical de salmón con aliño de frutos amarillas y hojas de cilantro fresco",
        price: 16.8,
        allergens: ["Molusco", "Ápio"]
      },
      {
        id: "pr-4",
        name: "Ceviche de gambas y pescado con mango, aguacate, cebolla morada, chili, leche de tigre y cilantro",
        price: 15.2,
        allergens: ["Crustáceo", "Ápio"]
      },
      {
        id: "pr-5",
        name: "Bolitas de falafel de remolacha y salsa tzatziki",
        price: 12.5,
        isSignature: true,
        isVegetarian: true,
        allergens: ["Gluten", "Lactosa"]
      },
      {
        id: "pr-6",
        name: "Pollo rebozado al estilo oriental con mayo sriracha",
        price: 10.2,
        isSignature: true,
        allergens: ["Gluten", "Soja", "Huevo"]
      },
      {
        id: "pr-7",
        name: "Fritura de calamares con salsa tartara de tomate seco",
        price: 13.9,
        allergens: ["Gluten", "molusco", "mostaza", "Huevo"]
      },
      {
        id: "pr-8",
        name: "Pescadito frito con lima y escamas de sal",
        price: 13.2,
        allergens: ["Pescado", "Gluten"]
      },
      {
        id: "pr-9",
        name: "Gyoza de setas y edamame con salsa secreta (6UNID)",
        price: 10.5,
        isVegan: true,
        allergens: ["Gluten", "sesámo", "Soja"]
      },
      {
        id: "pr-10",
        name: "Pulpo con verduritas y su punto picante",
        price: 19.5,
        allergens: ["Molusco"]
      },
      {
        id: "pr-11",
        name: "Pan con tomate",
        price: 3.2,
        allergens: ["Gluten"]
      }
    ]
  },
  {
    id: "la-sana-venganza",
    name: "LA SANA VENGANZA",
    items: [
      {
        id: "sv-1",
        name: "La Burra",
        description: "Ensalada de hojas frescas, remolacha, Burrata, dados de sandia, cherry km0 y pesto de albahaca y pistacho",
        price: 15.3,
        isVegetarian: true,
        allergens: ["Lactosa", "frutos secos"]
      },
      {
        id: "sv-2",
        name: "La exquisita Beca",
        description: "Ensalada de hojas frescas, tomate del Parc agrari, laminas de ventresca, cebolla morada, kalamata y alcaparrones",
        price: 14.8,
        allergens: ["Pescado"]
      },
      {
        id: "sv-3",
        name: "Fresh tuna",
        description: "Ensalada de hojas frescas, Atún rojo, remolacha, cebolla morada, sunomono y alga wakame",
        price: 14.8,
        isSignature: true,
        allergens: ["Pescado", "Sesamo"]
      }
    ]
  },
  {
    id: "tortakos",
    name: "TORTAKOS",
    items: [
      {
        id: "tk-1",
        name: "Tacos de Pulpo",
        description: "guacamole, pico de gallo, cebolla encurtida, aceite de limon y hojas de cilantro frescas",
        price: 14.6,
        allergens: ["Molusco"]
      },
      {
        id: "tk-2",
        name: "Tacos de ternera",
        description: "guacamole, pico de gallo, cebolla encurtida y mayo sriracha",
        price: 14.3,
        allergens: ["Huevo"]
      },
      {
        id: "tk-3",
        name: "Tacos de falafel de remolacha",
        description: "guacamole, pico de gallo, cebolla encurtida, aceite de limon y hojas de cilantro frescas",
        price: 14.5,
        isSignature: true,
        isVegan: true
      }
    ]
  },
  {
    id: "pan-con-cosas",
    name: "PAN CON COSAS",
    items: [
      {
        id: "pc-1",
        name: "SUNNY TUNA",
        description: "Milanesa de Atún rojo, mermelada de tomate, cebolla encurtida, mayo sriracha y hojas cilantro fresco",
        price: 15.5,
        isSignature: true,
        allergens: ["Pescado", "Gluten", "Huevo"]
      },
      {
        id: "pc-2",
        name: "TORTUGA BOBA",
        description: "Tiras de ternera, queso gouda, pico de gallo, salsa de hierbas y mayo",
        price: 16.1,
        allergens: ["Gluten", "lactosa", "huevo"]
      },
      {
        id: "pc-3",
        name: "MUNDAKA",
        description: "Burger ternera, queso gouda fundido, crunch bacon, pepinillo encurtido, cebolla morada, lechuga, tomate y mayo de hierbas",
        price: 17.5,
        allergens: ["Gluten", "Lactosa", "Sulfitos"]
      },
      {
        id: "pc-4",
        name: "LA PLANTIBULA",
        description: "Burger vegetal, pan brioche untado con babaganoush y guacamole, lechuga y tomate",
        price: 16.5,
        isVegetarian: true,
        allergens: ["Gluten", "Huevo"]
      }
    ]
  },
  {
    id: "el-desenlace",
    name: "EL DESENLACE",
    items: [
      {
        id: "d-1",
        name: "Carne a la plancha",
        description: "aceite de hierbas, acompañada con su guarnición",
        price: 21
      },
      {
        id: "d-2",
        name: "Calamar a la plancha",
        description: "acompañada con su guarnición",
        price: 21.9,
        allergens: ["Moluscos"]
      },
      {
        id: "d-3",
        name: "Pescado del dia",
        description: "acompañada con su guarnición",
        price: 20.9,
        allergens: ["Pescado"]
      }
    ]
  },
  {
    id: "para-las-tortuguitas",
    name: "PARA L@S TORTUGUIT@S",
    note: "Hasta los 12 años",
    items: [
      {
        id: "kids-1",
        name: "Pasta",
        description: "Pasta con salsa napolitana y queso rallado",
        price: 10.5,
        isVegetarian: true,
        isKids: true
      },
      {
        id: "kids-2",
        name: "Cheese burger",
        description: "Jugosa, burger de ternera con queso",
        price: 10.5,
        isKids: true,
        allergens: ["Gluten", "lactosa"]
      }
    ] // The turtle emoji 🐢 is in the title, we can leave it as is or handle it
  },
  {
    id: "postres",
    name: "POSTRES",
    items: [
      {
        id: "po-1",
        name: "Tiramisú de pistacho",
        price: 7.8,
        allergens: ["Gluten", "Huevo", "Lactosa", "Frutos secos"]
      },
      {
        id: "po-2",
        name: "Chocotorta",
        price: 7.1,
        allergens: ["Gluten", "Lactosa"]
      },
      {
        id: "po-3",
        name: "Tarta de queso con compota de frutos amarillos",
        price: 7.6,
        allergens: ["Lactosa"]
      },
      {
        id: "po-4",
        name: "Fruta del día de temporada",
        price: 6.5
      }
    ]
  }
];
