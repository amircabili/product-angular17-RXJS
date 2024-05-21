Products Management Application
___________________________________

This is an Angular-based application for managing products. It allows users to view a list of products, add new products, update existing products, and delete products. The application uses local storage to persist product data across sessions.


Features:

View a list of products with their details
Add new products
Update existing products
Delete products
Persist product data using local storage
Load form fields configuration dynamically

Technologies:

Angular
TypeScript
Bootstrap (for styling)
RxJS (for reactive programming)
Local Storage (for data persistence)

Setup:

Clone the repository:
Copy code
git clone https://github.com/your-username/products-management-app.git
cd products-management-app

Install dependencies:
Copy code
npm install
Run the application:


Copy code
ng serve
Open the application:
Open your web browser and navigate to http://localhost:4200.



Usage:

Viewing Products
The home page displays a list of products.
Click on a product to view its details in a form.
Adding a Product
Click the "Add Product" button on the product list page.
Fill in the form with the product details.
Click the "Save" button to add the product.
Updating a Product
Click on a product in the list to load its details into the form.
Update the desired fields.
Click the "Save" button to update the product.
Deleting a Product
Click the "Delete" button next to a product in the list.


Code Structure:

The main structure of the application is as follows:

css
Copy code
src/
├── app/
│   ├── components/
│   │   ├── product-form/
│   │   │   ├── product-form.component.html
│   │   │   ├── product-form.component.scss
│   │   │   └── product-form.component.ts
│   │   ├── product-list/
│   │   │   ├── product-list.component.html
│   │   │   ├── product-list.component.scss
│   │   │   └── product-list.component.ts
│   ├── services/
│   │   ├── product.service.ts
│   │   └── product-signal.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   ├── app.module.ts
│   └── assets/
│       └── product_form.json
└── index.html
