const categoryObj = {
  phones: ['apple', 'samsung', 'nokia', 'motorola', 'tecno', 'itel', 'infinix', 'other'],
  televisions: ['samsung', 'tcl', 'nasco', 'sony', 'toshiba', 'panasonic', 'lg', 'philips', 'other'],
  laptops: ['hp', 'dell', 'acer', 'alienware', 'toshiba', 'lenovo', 'asus', 'macbook', 'other'],
  desktops: ['hp', 'dell', 'acer', 'alienware', 'toshiba', 'lenovo', 'asus', 'other'],
  accessories: ['apple', 'samsung', 'playstation', 'nintendo', 'xbox', 'other'],
  'game consoles': ['xbox', 'playstation', 'nintendo', 'other'],
  'headphones and speakers': ['jbl', 'beats', 'other'],
};

export const categoryBrandArray = {
  'Computers & Tablets': ['Dell', 'Lenovo', 'Acer', 'Asus', 'Microsoft', 'Toshiba', 'IBM', 'HP', 'LG', 'ViewSonic', 'NEC', 'other'],
  'Video Games & Consoles': ['Sony (PlayStation)', 'Microsoft (Xbox)', 'Nintendo', 'Sega', 'Valve (Steam)', 'Razer', 'Logitech', 'Corsair', 'Alienware', 'HyperX', 'other'],
  'Audio & Headphones': ['Bose', 'Sony', 'Sennheiser', 'Beats by Dre', 'JBL', 'Audio-Technica', 'Skullcandy', 'Bang & Olufsen', 'Shure', 'AKG', 'other'],
  'Office Electronics': ['Dell', 'Lenovo', 'Acer', 'Asus', 'Microsoft', 'Toshiba', 'IBM', 'LG', 'HP', 'ViewSonic', 'NEC', 'other'],
  'Wearable Devices': ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Xiaomi', 'Huawei', 'Fossil', 'Amazfit', 'Suunto', 'Withings', 'other'],
  'Car Electronics': ['Pioneer', 'Sony', 'Kenwood', 'Alpine', 'JVC', 'Clarion', 'Garmin', 'TomTom', 'Harman Kardon', 'Blaupunkt', 'other'],
  'Cameras, Drones & Accessories': ['Nikon', 'Canon', 'Sony', 'Panasonic', 'Fujifilm', 'GoPro', 'DJI', 'Leica', 'Olympus', 'Pentax', 'other'],
  'Home Appliances': ['Whirlpool', 'LG Electronics', 'Samsung', 'General Electric (GE)', 'Maytag', 'KitchenAid', 'Bosch', 'Kenmore', 'Electrolux', 'Frigidaire', 'other'],
  'Cellphones & Accessories': ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Nokia', 'Motorola', 'other'],
  Televisions: ['Samsung', 'LG', 'Sony', 'TCL', 'Panasonic', 'Vizio', 'Philips', 'Sharp', 'Hisense', 'Insignia', 'other'],
};

export const categoriesArray = [
  'Video Games & Consoles',
  'Wearable Devices',
  'Office Electronics',
  'Audio & Headphones',
  'Computers & Tablets',
  'Cameras, Drones & Accessories',
  'Home Appliances',
  'Car Electronics',
  'Cellphones & Accessories',
  'Televisions',
];

export const carsCategoriesArray = [
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Convertible',
  'Hatchback',
  'Van',
  'Wagon',
  'Crossover',
  'Minivan',
  'Sports Car',
  'Electric Car',
  'Hybrid Car',
  'Luxury Car',
  'Midsize Car',
  'Full-size Car',
  'Off-Road Vehicle',
];

export const carBrandsByCategory = {
  Sedan: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Hyundai'],
  SUV: ['Jeep', 'Nissan', 'Subaru', 'Mazda', 'Kia'],
  Truck: ['Ford', 'Chevrolet', 'Ram', 'Toyota', 'Nissan'],
  Coupe: ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Infiniti'],
  Convertible: ['Mazda', 'Mercedes-Benz', 'Chevrolet', 'Audi', 'BMW'],
  Hatchback: ['Volkswagen', 'Ford', 'Honda', 'Mazda', 'Chevrolet'],
  Van: ['Chrysler', 'Honda', 'Toyota', 'Ford', 'Nissan'],
  Wagon: ['Subaru', 'Volvo', 'Audi', 'BMW', 'Mercedes-Benz'],
  Crossover: ['Honda', 'Toyota', 'Mazda', 'Hyundai', 'Nissan'],
  Minivan: ['Toyota', 'Honda', 'Chrysler', 'Kia', 'Dodge'],
  'Sports Car': ['Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin'],
  'Electric Car': ['Tesla', 'Nissan', 'Chevrolet', 'BMW', 'Audi'],
  'Hybrid Car': ['Toyota', 'Honda', 'Ford', 'Lexus', 'Hyundai'],
  'Luxury Car': ['Mercedes-Benz', 'BMW', 'Lexus', 'Audi', 'Jaguar'],
  'Midsize Car': ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'],
  'Full-size Car': ['Chevrolet', 'Ford', 'Dodge', 'Chrysler', 'Buick'],
  'Off-Road Vehicle': ['Jeep', 'Toyota', 'Land Rover', 'Ford', 'Nissan'],
};

export const subCategoriesObj = {
  'Video Games & Consoles': [
    'Video Games', 'Video Game Accessories', 'PC Gaming Accessories', 'Video Game Consoles',
  ],
  'Wearable Devices': [
    'Smart Watches', 'Fitness Tracker', 'Virtual Reality', 'Smart Accessories',
  ],
  'Office Electronics': [
    'Printers, Ink & Toner', 'Scanners, Faxes & Copiers', 'Telephones & Communication',
  ],
  'Audio & Headphones': ['Headphones', 'Speakers'],
  'Computers & Tablets': ['Laptops', 'Desktops & All-In-Ones', 'Tablets', 'Computer Accessories', 'Monitors & Screens', 'Computer Components'],
  'Cameras, Drones & Accessories': ['Digital Camera', 'Camcorders', 'Camera Drones', 'Camera Lenses', 'Camera Tripods', 'Camera Bags & Cases', 'Camera Flashes & Flash Accessories'],
  'Home Appliances': ['Washers & Dryers', 'Refrigerators & Freezers', 'Ranges & Ovens', 'Dishwashers', 'Microwaves', 'Small Kitchen Appliances', 'Vacuums & Floor Care', 'Appliance Part & Accessories'],
  'Car Electronics': ['Car Audio', 'Car Video', 'Car Safety & Security', 'Car Accessories', 'GPS & Accessories', 'Car Phone Accessories'],
  'Cellphones & Accessories': ['Cellphones & Smartphones', 'Cellphones Accessories', 'Cellphone Cases', 'Cellphone Chargers', 'Cellphone Screen Protectors', 'Cellphone Batteries', 'Cellphone Cables', 'Cellphone Holders & Stands', 'Cellphone Parts', 'Cellphone Repair Tools'],
  Televisions: ['Television'],
};

export default categoryObj;
