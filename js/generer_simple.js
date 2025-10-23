/*
GourmeTech - Générateur de recettes simple
Auteur : Daran-Olivier
Description : Script adapté pour la nouvelle structure HTML avec traduction française
*/

// =============================================================================
// DICTIONNAIRES DE TRADUCTION
// =============================================================================

// Traduction des catégories
const categoryTranslations = {
    'Beef': 'Bœuf',
    'Breakfast': 'Petit-déjeuner',
    'Chicken': 'Poulet',
    'Dessert': 'Dessert',
    'Goat': 'Chèvre',
    'Lamb': 'Agneau',
    'Miscellaneous': 'Divers',
    'Pasta': 'Pâtes',
    'Pork': 'Porc',
    'Seafood': 'Fruits de mer',
    'Side': 'Accompagnement',
    'Starter': 'Entrée',
    'Vegan': 'Végétalien',
    'Vegetarian': 'Végétarien'
};

// Traduction des pays/régions
const areaTranslations = {
    'American': 'Américaine',
    'British': 'Britannique',
    'Canadian': 'Canadienne',
    'Chinese': 'Chinoise',
    'Croatian': 'Croate',
    'Dutch': 'Hollandaise',
    'Egyptian': 'Égyptienne',
    'French': 'Française',
    'Greek': 'Grecque',
    'Indian': 'Indienne',
    'Irish': 'Irlandaise',
    'Italian': 'Italienne',
    'Jamaican': 'Jamaïcaine',
    'Japanese': 'Japonaise',
    'Kenyan': 'Kényane',
    'Malaysian': 'Malaisienne',
    'Mexican': 'Mexicaine',
    'Moroccan': 'Marocaine',
    'Polish': 'Polonaise',
    'Portuguese': 'Portugaise',
    'Russian': 'Russe',
    'Spanish': 'Espagnole',
    'Thai': 'Thaïlandaise',
    'Tunisian': 'Tunisienne',
    'Turkish': 'Turque',
    'Unknown': 'Inconnue',
    'Vietnamese': 'Vietnamienne'
};

// Traduction des ingrédients courants (version étendue)
const ingredientTranslations = {
    // Viandes et poissons
    'Beef': 'Bœuf',
    'Chicken': 'Poulet',
    'Chicken Breast': 'Blanc de poulet',
    'Chicken Thighs': 'Cuisses de poulet',
    'Pork': 'Porc',
    'Lamb': 'Agneau',
    'Turkey': 'Dinde',
    'Salmon': 'Saumon',
    'Tuna': 'Thon',
    'Prawns': 'Crevettes',
    'Shrimp': 'Crevettes',
    'Cod': 'Cabillaud',
    'Ham': 'Jambon',
    'Bacon': 'Bacon',
    'Sausage': 'Saucisse',
    'Ground Beef': 'Bœuf haché',
    'Minced Beef': 'Bœuf haché',
    'Fish': 'Poisson',
    'Crab': 'Crabe',
    'Lobster': 'Homard',
    'Mussels': 'Moules',
    
    // Légumes
    'Onion': 'Oignon',
    'Onions': 'Oignons',
    'Red Onion': 'Oignon rouge',
    'Spring Onions': 'Oignons verts',
    'Garlic': 'Ail',
    'Garlic Clove': 'Gousse d\'ail',
    'Tomato': 'Tomate',
    'Tomatoes': 'Tomates',
    'Cherry Tomatoes': 'Tomates cerises',
    'Potato': 'Pomme de terre',
    'Potatoes': 'Pommes de terre',
    'Sweet Potato': 'Patate douce',
    'Carrot': 'Carotte',
    'Carrots': 'Carottes',
    'Mushroom': 'Champignon',
    'Mushrooms': 'Champignons',
    'Bell Pepper': 'Poivron',
    'Red Pepper': 'Poivron rouge',
    'Green Pepper': 'Poivron vert',
    'Yellow Pepper': 'Poivron jaune',
    'Cucumber': 'Concombre',
    'Lettuce': 'Laitue',
    'Spinach': 'Épinards',
    'Broccoli': 'Brocoli',
    'Celery': 'Céleri',
    'Leek': 'Poireau',
    'Cabbage': 'Chou',
    'Red Cabbage': 'Chou rouge',
    'Cauliflower': 'Chou-fleur',
    'Zucchini': 'Courgette',
    'Aubergine': 'Aubergine',
    'Eggplant': 'Aubergine',
    'Asparagus': 'Asperges',
    'Green Beans': 'Haricots verts',
    'Peas': 'Petits pois',
    'Corn': 'Maïs',
    'Avocado': 'Avocat',
    
    // Épices et herbes
    'Salt': 'Sel',
    'Sea Salt': 'Sel de mer',
    'Pepper': 'Poivre',
    'Black Pepper': 'Poivre noir',
    'White Pepper': 'Poivre blanc',
    'Paprika': 'Paprika',
    'Cumin': 'Cumin',
    'Oregano': 'Origan',
    'Thyme': 'Thym',
    'Fresh Thyme': 'Thym frais',
    'Basil': 'Basilic',
    'Fresh Basil': 'Basilic frais',
    'Parsley': 'Persil',
    'Fresh Parsley': 'Persil frais',
    'Coriander': 'Coriandre',
    'Fresh Coriander': 'Coriandre fraîche',
    'Cilantro': 'Coriandre',
    'Ginger': 'Gingembre',
    'Fresh Ginger': 'Gingembre frais',
    'Turmeric': 'Curcuma',
    'Cinnamon': 'Cannelle',
    'Nutmeg': 'Muscade',
    'Bay Leaves': 'Feuilles de laurier',
    'Bay Leaf': 'Feuille de laurier',
    'Rosemary': 'Romarin',
    'Fresh Rosemary': 'Romarin frais',
    'Sage': 'Sauge',
    'Dill': 'Aneth',
    'Mint': 'Menthe',
    'Chili': 'Piment',
    'Chili Powder': 'Poudre de piment',
    'Cayenne Pepper': 'Poivre de Cayenne',
    'Garlic Powder': 'Ail en poudre',
    'Onion Powder': 'Oignon en poudre',
    
    // Produits laitiers
    'Butter': 'Beurre',
    'Unsalted Butter': 'Beurre non salé',
    'Milk': 'Lait',
    'Whole Milk': 'Lait entier',
    'Cream': 'Crème',
    'Heavy Cream': 'Crème épaisse',
    'Double Cream': 'Crème fraîche épaisse',
    'Sour Cream': 'Crème aigre',
    'Yogurt': 'Yaourt',
    'Greek Yogurt': 'Yaourt grec',
    'Cheese': 'Fromage',
    'Cheddar Cheese': 'Fromage cheddar',
    'Parmesan': 'Parmesan',
    'Parmesan Cheese': 'Fromage parmesan',
    'Mozzarella': 'Mozzarella',
    'Feta Cheese': 'Fromage feta',
    'Goat Cheese': 'Fromage de chèvre',
    'Cream Cheese': 'Fromage à la crème',
    
    // Huiles et matières grasses
    'Olive Oil': 'Huile d\'olive',
    'Extra Virgin Olive Oil': 'Huile d\'olive extra vierge',
    'Vegetable Oil': 'Huile végétale',
    'Sunflower Oil': 'Huile de tournesol',
    'Coconut Oil': 'Huile de coco',
    'Sesame Oil': 'Huile de sésame',
    
    // Œufs et produits de base
    'Eggs': 'Œufs',
    'Egg': 'Œuf',
    'Egg Yolk': 'Jaune d\'œuf',
    'Egg White': 'Blanc d\'œuf',
    'Flour': 'Farine',
    'Plain Flour': 'Farine ordinaire',
    'Self-raising Flour': 'Farine auto-levante',
    'Sugar': 'Sucre',
    'Brown Sugar': 'Sucre brun',
    'Caster Sugar': 'Sucre en poudre',
    'Icing Sugar': 'Sucre glace',
    'Honey': 'Miel',
    'Maple Syrup': 'Sirop d\'érable',
    'Vanilla': 'Vanille',
    'Vanilla Extract': 'Extrait de vanille',
    
    // Céréales et légumineuses
    'Rice': 'Riz',
    'Basmati Rice': 'Riz basmati',
    'Brown Rice': 'Riz brun',
    'Pasta': 'Pâtes',
    'Spaghetti': 'Spaghetti',
    'Penne': 'Penne',
    'Fusilli': 'Fusilli',
    'Bread': 'Pain',
    'White Bread': 'Pain blanc',
    'Breadcrumbs': 'Chapelure',
    'Oats': 'Avoine',
    'Quinoa': 'Quinoa',
    'Lentils': 'Lentilles',
    'Chickpeas': 'Pois chiches',
    'Black Beans': 'Haricots noirs',
    'Kidney Beans': 'Haricots rouges',
    
    // Fruits
    'Lemon': 'Citron',
    'Lemon Juice': 'Jus de citron',
    'Lemon Zest': 'Zeste de citron',
    'Lime': 'Citron vert',
    'Lime Juice': 'Jus de citron vert',
    'Orange': 'Orange',
    'Orange Juice': 'Jus d\'orange',
    'Apple': 'Pomme',
    'Apples': 'Pommes',
    'Banana': 'Banane',
    'Bananas': 'Bananes',
    'Strawberry': 'Fraise',
    'Strawberries': 'Fraises',
    'Blueberries': 'Myrtilles',
    'Raspberries': 'Framboises',
    'Grapes': 'Raisins',
    'Pineapple': 'Ananas',
    'Mango': 'Mangue',
    'Coconut': 'Noix de coco',
    'Dates': 'Dattes',
    'Raisins': 'Raisins secs',
    
    // Condiments et sauces
    'Vinegar': 'Vinaigre',
    'Balsamic Vinegar': 'Vinaigre balsamique',
    'Wine Vinegar': 'Vinaigre de vin',
    'Soy Sauce': 'Sauce soja',
    'Worcestershire Sauce': 'Sauce Worcestershire',
    'Tomato Paste': 'Concentré de tomate',
    'Tomato Sauce': 'Sauce tomate',
    'Mustard': 'Moutarde',
    'Dijon Mustard': 'Moutarde de Dijon',
    'Mayonnaise': 'Mayonnaise',
    'Ketchup': 'Ketchup',
    'Hot Sauce': 'Sauce piquante',
    'Tabasco': 'Tabasco',
    
    // Noix et graines
    'Almonds': 'Amandes',
    'Walnuts': 'Noix',
    'Pine Nuts': 'Pignons de pin',
    'Cashews': 'Noix de cajou',
    'Peanuts': 'Cacahuètes',
    'Sesame Seeds': 'Graines de sésame',
    'Sunflower Seeds': 'Graines de tournesol',
    'Pumpkin Seeds': 'Graines de courge',
    
    // Boissons
    'Water': 'Eau',
    'Stock': 'Bouillon',
    'Chicken Stock': 'Bouillon de poulet',
    'Vegetable Stock': 'Bouillon de légumes',
    'Beef Stock': 'Bouillon de bœuf',
    'Wine': 'Vin',
    'White Wine': 'Vin blanc',
    'Red Wine': 'Vin rouge',
    'Beer': 'Bière',
    'Brandy': 'Cognac',
    'Rum': 'Rhum'
};

// Traduction des unités de mesure
const measureTranslations = {
    'tsp': 'c. à thé',
    'tbsp': 'c. à soupe',
    'cup': 'tasse',
    'cups': 'tasses',
    'oz': 'once',
    'lb': 'livre',
    'g': 'g',
    'kg': 'kg',
    'ml': 'ml',
    'l': 'l',
    'pint': 'pinte',
    'quart': 'quart',
    'gallon': 'gallon',
    'clove': 'gousse',
    'cloves': 'gousses',
    'slice': 'tranche',
    'slices': 'tranches',
    'piece': 'morceau',
    'pieces': 'morceaux'
};

// Traductions des instructions de cuisine courantes
const instructionTranslations = {
    // Verbes de base
    'heat': 'chauffer',
    'cook': 'cuire',
    'bake': 'cuire au four',
    'boil': 'faire bouillir',
    'simmer': 'mijoter',
    'fry': 'faire frire',
    'stir': 'remuer',
    'mix': 'mélanger',
    'combine': 'combiner',
    'blend': 'mélanger',
    'whisk': 'fouetter',
    'beat': 'battre',
    'fold': 'incorporer',
    'chop': 'hacher',
    'dice': 'couper en dés',
    'slice': 'trancher',
    'mince': 'émincer',
    'grate': 'râper',
    'crush': 'écraser',
    'grind': 'moudre',
    'add': 'ajouter',
    'pour': 'verser',
    'drain': 'égoutter',
    'rinse': 'rincer',
    'wash': 'laver',
    'peel': 'éplucher',
    'season': 'assaisonner',
    'taste': 'goûter',
    'serve': 'servir',
    'garnish': 'garnir',
    'sprinkle': 'saupoudrer',
    'cover': 'couvrir',
    'remove': 'retirer',
    'place': 'placer',
    'put': 'mettre',
    'set aside': 'réserver',
    'let stand': 'laisser reposer',
    'rest': 'reposer',
    'cool': 'refroidir',
    'chill': 'réfrigérer',
    'freeze': 'congeler',
    'thaw': 'décongeler',
    'marinate': 'mariner',
    'soak': 'tremper',
    'brown': 'faire dorer',
    'sear': 'saisir',
    'roast': 'rôtir',
    'grill': 'griller',
    'steam': 'cuire à la vapeur',
    'poach': 'pocher',
    'braise': 'braiser',
    'saute': 'faire sauter',
    'toss': 'mélanger',
    'flip': 'retourner',
    'turn': 'tourner',
    'reduce': 'réduire',
    'thicken': 'épaissir',
    'caramelize': 'caraméliser',
    'crisp': 'faire croustiller',
    'tender': 'tendre',
    'golden': 'doré',
    'crispy': 'croustillant',
    'soft': 'mou',
    'firm': 'ferme',
    'smooth': 'lisse',
    'thick': 'épais',
    'thin': 'mince',
    'hot': 'chaud',
    'warm': 'tiède',
    'cold': 'froid',
    'fresh': 'frais',
    'dry': 'sec',
    'wet': 'humide',
    'clean': 'propre',
    'ready': 'prêt',
    'done': 'cuit',
    'cooked': 'cuit',
    'raw': 'cru',
    'frozen': 'congelé',
    'defrosted': 'décongelé',
    
    // Expressions communes
    'meanwhile': 'pendant ce temps',
    'then': 'puis',
    'next': 'ensuite',
    'finally': 'enfin',
    'first': 'd\'abord',
    'second': 'ensuite',
    'third': 'puis',
    'last': 'enfin',
    'until': 'jusqu\'à ce que',
    'while': 'pendant que',
    'when': 'quand',
    'after': 'après',
    'before': 'avant',
    'during': 'pendant',
    'for about': 'pendant environ',
    'approximately': 'environ',
    'about': 'environ',
    'around': 'environ',
    'roughly': 'environ',
    'until tender': 'jusqu\'à ce que ce soit tendre',
    'until golden': 'jusqu\'à ce que ce soit doré',
    'until cooked': 'jusqu\'à cuisson',
    'to taste': 'selon le goût',
    'as needed': 'selon les besoins',
    'if desired': 'si désiré',
    'optional': 'optionnel',
    'alternatively': 'alternativement',
    'or': 'ou',
    'and': 'et',
    'with': 'avec',
    'without': 'sans',
    'over': 'sur',
    'under': 'sous',
    'into': 'dans',
    'onto': 'sur',
    'from': 'de',
    'to': 'à',
    'in': 'dans',
    'on': 'sur',
    'at': 'à',
    'by': 'par',
    'through': 'à travers',
    'around': 'autour',
    'between': 'entre',
    'among': 'parmi',
    'along': 'le long',
    'across': 'à travers',
    'against': 'contre',
    'towards': 'vers',
    'away from': 'loin de',
    'close to': 'près de',
    'next to': 'à côté de',
    'in front of': 'devant',
    'behind': 'derrière',
    'above': 'au-dessus',
    'below': 'en dessous',
    'inside': 'à l\'intérieur',
    'outside': 'à l\'extérieur',
    'upside down': 'à l\'envers',
    'right side up': 'à l\'endroit',
    'side by side': 'côte à côte',
    'one by one': 'un par un',
    'step by step': 'étape par étape',
    'little by little': 'petit à petit',
    'bit by bit': 'petit à petit',
    'gradually': 'graduellement',
    'slowly': 'lentement',
    'quickly': 'rapidement',
    'carefully': 'soigneusement',
    'gently': 'doucement',
    'vigorously': 'vigoureusement',
    'thoroughly': 'complètement',
    'completely': 'complètement',
    'partially': 'partiellement',
    'slightly': 'légèrement',
    'well': 'bien',
    'evenly': 'uniformément',
    'unevenly': 'de manière inégale'
};

// Traductions des noms de plats courants
const mealNameTranslations = {
    // Plats britanniques/irlandais
    'Bangers and Mash': 'Saucisses à la purée de pommes de terre',
    'Fish and Chips': 'Poisson pané et frites',
    'Shepherd\'s Pie': 'Hachis Parmentier d\'agneau',
    'Beef and Mustard Pie': 'Tourte au bœuf et moutarde',
    'Full English Breakfast': 'Petit-déjeuner anglais complet',
    'Toad in the Hole': 'Saucisses dans la pâte à crêpe',
    'Bubble & Squeak': 'Galettes de légumes sautés',
    'Spotted Dick': 'Pudding aux raisins secs',
    'Apple & Blackberry Crumble': 'Crumble aux pommes et mûres',
    'Bread and Butter Pudding': 'Pudding au pain et beurre',
    'Beef Wellington': 'Bœuf Wellington',
    'Chicken & Mushroom Hotpot': 'Ragoût de poulet aux champignons',
    'Lancashire Hotpot': 'Ragoût du Lancashire',
    'Eccles Cakes': 'Gâteaux d\'Eccles',
    'Chelsea Buns': 'Brioches de Chelsea',
    
    // Plats américains
    'BBQ Pork Sloppy Joes': 'Sandwichs au porc BBQ',
    'Chicken Fajita Mac and Cheese': 'Macaronis au fromage aux fajitas de poulet',
    'New York cheesecake': 'Cheesecake de New York',
    'Pumpkin Pie': 'Tarte à la citrouille',
    'Pancakes': 'Crêpes américaines',
    'Mac and cheese': 'Macaronis au fromage',
    'Clam chowder': 'Soupe de palourdes',
    'Beef brisket': 'Poitrine de bœuf fumée',
    'Buffalo wings': 'Ailes de poulet Buffalo',
    'Cornbread': 'Pain de maïs',
    'Key lime pie': 'Tarte au citron vert',
    'Chocolate chip cookies': 'Cookies aux pépites de chocolat',
    'Apple pie': 'Tarte aux pommes américaine',
    'Meatloaf': 'Pain de viande',
    'Chili con carne': 'Chili con carne',
    
    // Plats méditerranéens
    'Chicken Marengo': 'Poulet à la Marengo',
    'Mediterranean Pasta Salad': 'Salade de pâtes méditerranéenne',
    'Honey Teriyaki Salmon': 'Saumon teriyaki au miel',
    'Mediterranean Lamb': 'Agneau méditerranéen',
    'Greek Lamb': 'Agneau à la grecque',
    'Moussaka': 'Moussaka',
    'Souvlaki': 'Souvlaki',
    'Tzatziki': 'Tzatziki',
    'Greek Salad': 'Salade grecque',
    'Stuffed Peppers': 'Poivrons farcis',
    'Ratatouille': 'Ratatouille',
    'Bouillabaisse': 'Bouillabaisse',
    'Tapenade': 'Tapenade',
    'Pissaladière': 'Pissaladière',
    
    // Plats asiatiques
    'Teriyaki Chicken': 'Poulet teriyaki',
    'Sweet and Sour Pork': 'Porc à l\'aigre-douce',
    'Kung Pao Chicken': 'Poulet Kung Pao',
    'Beef Lo Mein': 'Nouilles Lo Mein au bœuf',
    'Chicken Chow Mein': 'Chow Mein au poulet',
    'Fried Rice': 'Riz frit',
    'Spring Rolls': 'Rouleaux de printemps',
    'Dumplings': 'Raviolis chinois',
    'Hot and Sour Soup': 'Soupe aigre-piquante',
    'General Tso\'s Chicken': 'Poulet du Général Tso',
    'Orange Chicken': 'Poulet à l\'orange',
    'Mongolian Beef': 'Bœuf mongol',
    'Sesame Chicken': 'Poulet au sésame',
    'Pad Thai': 'Pad Thaï',
    'Tom Yum': 'Soupe Tom Yum',
    'Green Curry': 'Curry vert',
    'Red Curry': 'Curry rouge',
    'Massaman Curry': 'Curry Massaman',
    'Pho': 'Soupe Pho',
    'Banh Mi': 'Sandwich Banh Mi',
    'Ramen': 'Ramen',
    'Sushi': 'Sushi',
    'Tempura': 'Tempura',
    'Miso Soup': 'Soupe miso',
    'Yakitori': 'Yakitori',
    
    // Plats mexicains/latinos
    'Chicken Enchilada Casserole': 'Casserole d\'enchiladas au poulet',
    'Beef Tacos': 'Tacos au bœuf',
    'Chicken Quesadilla': 'Quesadilla au poulet',
    'Fish Tacos': 'Tacos au poisson',
    'Beef Burrito': 'Burrito au bœuf',
    'Chicken Burrito': 'Burrito au poulet',
    'Guacamole': 'Guacamole',
    'Salsa': 'Salsa',
    'Nachos': 'Nachos',
    'Fajitas': 'Fajitas',
    'Ceviche': 'Ceviche',
    'Empanadas': 'Empanadas',
    'Tamales': 'Tamales',
    'Carnitas': 'Carnitas',
    'Pozole': 'Pozole',
    
    // Plats indiens
    'Chicken Tikka Masala': 'Poulet Tikka Masala',
    'Butter Chicken': 'Poulet au beurre',
    'Chicken Curry': 'Curry de poulet',
    'Lamb Curry': 'Curry d\'agneau',
    'Beef Curry': 'Curry de bœuf',
    'Dal': 'Dal (lentilles épicées)',
    'Biryani': 'Biryani',
    'Samosa': 'Samosa',
    'Naan': 'Pain naan',
    'Chapati': 'Pain chapati',
    'Tandoori Chicken': 'Poulet tandoori',
    'Vindaloo': 'Vindaloo',
    'Korma': 'Korma',
    'Madras': 'Curry Madras',
    'Jalfrezi': 'Jalfrezi',
    'Rogan Josh': 'Rogan Josh',
    'Palak Paneer': 'Épinards au fromage',
    'Chana Masala': 'Pois chiches épicés',
    
    // Desserts
    'Tiramisu': 'Tiramisu',
    'Baklava': 'Baklava',
    'Crème Brûlée': 'Crème brûlée',
    'Chocolate Brownie': 'Brownie au chocolat',
    'Chocolate Cake': 'Gâteau au chocolat',
    'Carrot Cake': 'Gâteau aux carottes',
    'Red Velvet Cake': 'Gâteau Red Velvet',
    'Cheesecake': 'Cheesecake',
    'Apple Crumble': 'Crumble aux pommes',
    'Lemon Tart': 'Tarte au citron',
    'Chocolate Mousse': 'Mousse au chocolat',
    'Panna Cotta': 'Panna cotta',
    'Profiteroles': 'Profiteroles',
    'Éclair': 'Éclair',
    'Mille-feuille': 'Mille-feuille',
    'Opera Cake': 'Gâteau opéra',
    'Macarons': 'Macarons',
    'Madeleines': 'Madeleines',
    'Croissant': 'Croissant',
    'Pain au Chocolat': 'Pain au chocolat'
};

// Traduit le nom d'un plat s'il existe une traduction
function translateMealName(mealName) {
    return mealNameTranslations[mealName] || mealName;
}

// Traduit les instructions de cuisine
function translateInstructions(instructions) {
    if (!instructions) return '';
    
    let translated = instructions;
    
    // Remplace les mots et expressions par leur traduction
    for (const [english, french] of Object.entries(instructionTranslations)) {
        const regex = new RegExp('\\b' + english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
        translated = translated.replace(regex, french);
    }
    
    // Traductions spécifiques pour des phrases communes
    translated = translated.replace(/Preheat oven to (\d+)°?([CF]?)/gi, 'Préchauffer le four à $1°$2');
    translated = translated.replace(/Heat oil in (a|the) (pan|skillet)/gi, 'Chauffer l\'huile dans une poêle');
    translated = translated.replace(/Season with salt and pepper/gi, 'Assaisonner avec du sel et du poivre');
    translated = translated.replace(/Bring to (a )?boil/gi, 'Porter à ébullition');
    translated = translated.replace(/Reduce heat/gi, 'Réduire le feu');
    translated = translated.replace(/Cook for (\d+) minutes?/gi, 'Cuire pendant $1 minute(s)');
    translated = translated.replace(/Bake for (\d+) minutes?/gi, 'Cuire au four pendant $1 minute(s)');
    translated = translated.replace(/Let (it )?cool/gi, 'Laisser refroidir');
    translated = translated.replace(/Serve hot/gi, 'Servir chaud');
    translated = translated.replace(/Serve immediately/gi, 'Servir immédiatement');
    translated = translated.replace(/Makes (\d+) servings?/gi, 'Pour $1 portion(s)');
    translated = translated.replace(/Serves (\d+)/gi, 'Pour $1 personne(s)');
    
    return translated;
}

// =============================================================================
// FONCTIONS DE TRADUCTION
// =============================================================================

// Traduit une catégorie
function translateCategory(category) {
    return categoryTranslations[category] || category;
}

// Traduit une région/pays
function translateArea(area) {
    return areaTranslations[area] || area;
}

// Traduit un ingrédient
function translateIngredient(ingredient) {
    if (!ingredient) return ingredient;
    
    // Recherche exacte d'abord
    if (ingredientTranslations[ingredient]) {
        return ingredientTranslations[ingredient];
    }
    
    // Recherche partielle pour les ingrédients composés
    for (const [english, french] of Object.entries(ingredientTranslations)) {
        if (ingredient.toLowerCase().includes(english.toLowerCase())) {
            return ingredient.replace(new RegExp(english, 'gi'), french);
        }
    }
    
    return ingredient;
}

// Traduit une mesure
function translateMeasure(measure) {
    if (!measure) return measure;
    
    let translatedMeasure = measure;
    for (const [english, french] of Object.entries(measureTranslations)) {
        translatedMeasure = translatedMeasure.replace(new RegExp(`\\b${english}\\b`, 'gi'), french);
    }
    
    return translatedMeasure;
}

// Traduit les instructions de base (mots courants)
function translateInstructions(instructions) {
    if (!instructions) return instructions;
    
    const instructionTranslations = {
        // Verbes d'action
        'Heat': 'Chauffez',
        'Add': 'Ajoutez',
        'Mix': 'Mélangez',
        'Stir': 'Remuez',
        'Cook': 'Cuisez',
        'Bake': 'Faites cuire au four',
        'Fry': 'Faites frire',
        'Boil': 'Faites bouillir',
        'Season': 'Assaisonnez',
        'Serve': 'Servez',
        'Slice': 'Tranchez',
        'Chop': 'Hachez',
        'Dice': 'Coupez en dés',
        'Peel': 'Épluchez',
        'Wash': 'Lavez',
        'Drain': 'Égouttez',
        'Blend': 'Mixez',
        'Whisk': 'Fouettez',
        'Grill': 'Faites griller',
        'Roast': 'Faites rôtir',
        'Steam': 'Faites cuire à la vapeur',
        'Simmer': 'Laissez mijoter',
        'Sauté': 'Faites sauter',
        'Marinate': 'Faites mariner',
        'Garnish': 'Décorez',
        'Combine': 'Combinez',
        'Pour': 'Versez',
        'Sprinkle': 'Saupoudrez',
        'Spread': 'Étalez',
        'Roll': 'Roulez',
        
        // Temps et unités
        'minutes': 'minutes',
        'minute': 'minute',
        'hour': 'heure',
        'hours': 'heures',
        'seconds': 'secondes',
        'degrees': 'degrés',
        
        // Mots utiles
        'until': 'jusqu\'à ce que',
        'golden': 'doré',
        'brown': 'brun',
        'tender': 'tendre',
        'crispy': 'croustillant',
        'soft': 'mou',
        'thick': 'épais',
        'thin': 'fin',
        'hot': 'chaud',
        'cold': 'froid',
        'fresh': 'frais',
        'large': 'grand',
        'small': 'petit',
        'medium': 'moyen',
        'bowl': 'bol',
        'pan': 'poêle',
        'pot': 'casserole',
        'oven': 'four',
        'plate': 'assiette'
    };
    
    let translatedInstructions = instructions;
    for (const [english, french] of Object.entries(instructionTranslations)) {
        // Utiliser des regex plus précises pour éviter les remplacements partiels
        translatedInstructions = translatedInstructions.replace(
            new RegExp(`\\b${english}\\b`, 'gi'), 
            french
        );
    }
    
    return translatedInstructions;
}

// Traduit complètement une recette
function translateRecipe(meal) {
    const translatedMeal = { ...meal };
    
    // Traduire le nom du plat si possible
    if (translatedMeal.strMeal) {
        const translatedName = translateMealName(translatedMeal.strMeal);
        if (translatedName !== translatedMeal.strMeal) {
            // Si une traduction existe, on l'ajoute en tant que description
            translatedMeal.strMealFrench = translatedName;
        }
    }
    
    // Traduire la catégorie
    if (translatedMeal.strCategory) {
        translatedMeal.strCategory = translateCategory(translatedMeal.strCategory);
    }
    
    // Traduire la région
    if (translatedMeal.strArea) {
        translatedMeal.strArea = translateArea(translatedMeal.strArea);
    }
    
    // Traduire les instructions
    if (translatedMeal.strInstructions) {
        translatedMeal.strInstructions = translateInstructions(translatedMeal.strInstructions);
    }
    
    return translatedMeal;
}

// =============================================================================
// VARIABLES GLOBALES
// =============================================================================

let currentRecipe = null;
let savedRecipes = JSON.parse(localStorage.getItem('gourmeTech_discoveredRecipes')) || [];
let historyData = JSON.parse(localStorage.getItem('gourmeTech_history')) || [];
let currentCategory = '';

// =============================================================================
// FONCTIONS PRINCIPALES
// =============================================================================

// Génère une recette aléatoire
async function generateRandomRecipe() {
    console.log('Génération d\'une recette aléatoire...');
    setLoading(true);
    
    try {
        let apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
        
        // Si une catégorie est sélectionnée
        if (currentCategory) {
            apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentCategory}`;
        }
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.meals) {
            let meal;
            if (currentCategory) {
                // Si filtré par catégorie, prendre un repas au hasard et récupérer ses détails
                const randomIndex = Math.floor(Math.random() * data.meals.length);
                const mealId = data.meals[randomIndex].idMeal;
                
                const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const detailData = await detailResponse.json();
                meal = detailData.meals[0];
            } else {
                meal = data.meals[0];
            }
            
            // Traduire la recette en français
            meal = translateRecipe(meal);
            
            displayRecipe(meal);
            addToHistory(meal);
            updateQuickStats();
            showNotification('🎉 Nouvelle recette découverte et traduite en français !');
        } else {
            throw new Error('Aucune recette trouvée');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('❌ Erreur lors du chargement de la recette', 'error');
        showErrorMessage('Impossible de charger la recette. Vérifiez votre connexion internet.');
    } finally {
        setLoading(false);
    }
}

// Mode Chef Surprise
function chefSurprise() {
    console.log('Mode Chef Surprise activé...');
    currentCategory = '';
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.value = '';
    }
    generateRandomRecipe();
}

// Met à jour le filtre de catégorie
function updateCategoryFilter() {
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        currentCategory = categorySelect.value;
        console.log('Catégorie sélectionnée:', currentCategory);
    }
}

// =============================================================================
// FONCTIONS D'AFFICHAGE
// =============================================================================

// Affiche une recette
function displayRecipe(meal) {
    currentRecipe = meal;
    const ingredients = extractIngredients(meal);
    
    const recipeHTML = `
        <div class="recipe-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
            <div class="recipe-content">
                <h2 class="recipe-title">
                    ${meal.strMeal}
                    ${meal.strMealFrench ? `<span class="recipe-title-french">(${meal.strMealFrench})</span>` : ''}
                </h2>
                <div class="recipe-meta">
                    <span>📍 ${meal.strArea || 'Origine inconnue'}</span>
                    <span>🏷️ ${meal.strCategory || 'Catégorie inconnue'}</span>
                    ${meal.strTags ? `<span>🏷️ ${meal.strTags}</span>` : ''}
                </div>
                
                <div class="recipe-ingredients">
                    <h3>🥘 Ingrédients</h3>
                    <ul class="ingredients-list">
                        ${ingredients.map(ing => 
                            `<li>${ing.measure} ${ing.name}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="recipe-instructions">
                    <h3>👨‍🍳 Instructions de préparation</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                
                ${meal.strYoutube ? `
                    <div class="recipe-video">
                        <h3>🎥 Vidéo de préparation</h3>
                        <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                            📺 Voir la vidéo de préparation
                        </a>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    const recipeDisplay = document.getElementById('recipeDisplay');
    if (recipeDisplay) {
        recipeDisplay.innerHTML = recipeHTML;
    }
    
    // Afficher les actions
    const recipeActions = document.getElementById('recipeActions');
    if (recipeActions) {
        recipeActions.style.display = 'flex';
    }
}

// Affiche un message d'erreur
function showErrorMessage(message) {
    const recipeDisplay = document.getElementById('recipeDisplay');
    if (recipeDisplay) {
        recipeDisplay.innerHTML = `
            <div class="recipe-placeholder">
                <div class="placeholder-icon">😔</div>
                <h3>Oups ! Une erreur est survenue</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="generateRandomRecipe()">
                    🔄 Réessayer
                </button>
            </div>
        `;
    }
}

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

// Gère l'état de chargement
function setLoading(isLoading) {
    const loadingState = document.getElementById('loadingState');
    const generateBtn = document.getElementById('generateRandomBtn');
    const chefBtn = document.getElementById('chefSurpriseBtn');
    
    if (loadingState) {
        loadingState.style.display = isLoading ? 'block' : 'none';
    }
    
    if (generateBtn) {
        generateBtn.disabled = isLoading;
        generateBtn.innerHTML = isLoading ? '⏳ Recherche...' : '🎲 Recette Surprise';
    }
    
    if (chefBtn) {
        chefBtn.disabled = isLoading;
    }
}

// Extrait les ingrédients avec traduction
function extractIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                name: translateIngredient(ingredient.trim()),
                measure: translateMeasure(measure ? measure.trim() : '')
            });
        }
    }
    return ingredients;
}

// Ajoute à l'historique
function addToHistory(meal) {
    historyData.push({
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        timestamp: new Date().toISOString(),
        meal: meal
    });
    localStorage.setItem('gourmeTech_history', JSON.stringify(historyData));
}

// Met à jour les statistiques rapides
function updateQuickStats() {
    const generatedCount = document.getElementById('generatedCount');
    const savedCount = document.getElementById('savedCount');
    
    if (generatedCount) {
        generatedCount.textContent = historyData.length;
    }
    if (savedCount) {
        savedCount.textContent = savedRecipes.length;
    }
}

// Affiche une notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `generer-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =============================================================================
// FONCTIONS D'ACTION
// =============================================================================

// Sauvegarde la recette actuelle
function saveCurrentRecipe() {
    if (!currentRecipe) {
        showNotification('❌ Aucune recette à sauvegarder', 'error');
        return;
    }
    
    const isAlreadySaved = savedRecipes.some(r => r.idMeal === currentRecipe.idMeal);
    if (isAlreadySaved) {
        showNotification('ℹ️ Cette recette est déjà sauvegardée');
        return;
    }
    
    const recipeToSave = {
        ...currentRecipe,
        savedAt: new Date().toISOString()
    };
    
    savedRecipes.push(recipeToSave);
    localStorage.setItem('gourmeTech_discoveredRecipes', JSON.stringify(savedRecipes));
    
    updateQuickStats();
    updateFavoritesCount();
    showNotification('💾 Recette sauvegardée !');
}

// Partage la recette actuelle
async function shareCurrentRecipe() {
    if (!currentRecipe) {
        showNotification('❌ Aucune recette à partager', 'error');
        return;
    }
    
    const shareText = `🍽️ Découvrez cette délicieuse recette : ${currentRecipe.strMeal}\n\n` +
        `📍 Origine : ${currentRecipe.strArea}\n` +
        `🏷️ Catégorie : ${currentRecipe.strCategory}\n\n` +
        `Découvert sur GourmeTech !`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: `Recette : ${currentRecipe.strMeal}`,
                text: shareText
            });
            showNotification('📤 Recette partagée !');
        } catch (error) {
            copyToClipboard(shareText);
        }
    } else {
        copyToClipboard(shareText);
    }
}

// Imprime la recette actuelle
function printCurrentRecipe() {
    if (!currentRecipe) {
        showNotification('❌ Aucune recette à imprimer', 'error');
        return;
    }
    
    const ingredients = extractIngredients(currentRecipe);
    const printContent = `
        <html>
        <head>
            <title>Recette : ${currentRecipe.strMeal}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #e74c3c; text-align: center; }
                .meta { text-align: center; margin: 20px 0; color: #666; }
                .ingredients { margin: 30px 0; }
                .ingredients ul { list-style-type: disc; margin-left: 20px; }
                .instructions { margin: 30px 0; line-height: 1.6; }
                img { max-width: 300px; display: block; margin: 20px auto; }
            </style>
        </head>
        <body>
            <h1>${currentRecipe.strMeal}</h1>
            <img src="${currentRecipe.strMealThumb}" alt="${currentRecipe.strMeal}">
            <div class="meta">
                <p><strong>Origine :</strong> ${currentRecipe.strArea}</p>
                <p><strong>Catégorie :</strong> ${currentRecipe.strCategory}</p>
            </div>
            <div class="ingredients">
                <h2>Ingrédients :</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing.measure} ${ing.name}</li>`).join('')}
                </ul>
            </div>
            <div class="instructions">
                <h2>Instructions de préparation :</h2>
                <p>${currentRecipe.strInstructions}</p>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    
    showNotification('🖨️ Recette envoyée à l\'impression !');
}

// Copie dans le presse-papier
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('📋 Copié dans le presse-papier !');
    } catch (error) {
        showNotification('❌ Impossible de copier', 'error');
    }
}

// Met à jour le compteur de favoris
function updateFavoritesCount() {
    const favoritesCount = document.getElementById('favoritesCount');
    if (favoritesCount) {
        favoritesCount.textContent = savedRecipes.length;
    }
}

// =============================================================================
// CHARGEMENT DES CATÉGORIES
// =============================================================================

// Charge les catégories depuis l'API
async function loadCategories() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        
        const categorySelect = document.getElementById('categorySelect');
        if (data.categories && categorySelect) {
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.strCategory;
                option.textContent = translateCategory(category.strCategory);
                categorySelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
    }
}

// =============================================================================
// INITIALISATION
// =============================================================================

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎲 Générateur de recettes initialisé');
    
    // Charger les catégories
    loadCategories();
    
    // Mettre à jour les statistiques
    updateQuickStats();
    updateFavoritesCount();
    
    // Message de bienvenue
    showNotification('🚀 Générateur prêt ! Les recettes sont automatiquement traduites en français. Cliquez sur "Recette Surprise" pour commencer.');
});

// =============================================================================
// FONCTIONS GLOBALES
// =============================================================================

// Rendre les fonctions accessibles globalement pour les onclick
window.generateRandomRecipe = generateRandomRecipe;
window.chefSurprise = chefSurprise;
window.updateCategoryFilter = updateCategoryFilter;
window.saveCurrentRecipe = saveCurrentRecipe;
window.shareCurrentRecipe = shareCurrentRecipe;
window.printCurrentRecipe = printCurrentRecipe;
window.updateQuickStats = updateQuickStats;